using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Red;
using LiteDB;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Peachpie.AspNetCore.Web;
using PeachPied.WordPress.AspNetCore;
using Red.CookieSessions;

namespace OsteklokkenServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var server = new RedHttpServer(5000, "public");
            var db = new LiteDatabase("osteklokken.litedb");
            var users = db.GetCollection<User>("users");
            var shoppingItems = db.GetCollection<ShoppingItem>("shoppingItems");
            var cookingSchedule = db.GetCollection<Cooking>("cooking");
            
            server.Use(new CookieSessions<OsteSession>(
                new CookieSessionSettings(TimeSpan.FromDays(14))
                {
                    Secure = false
                }));

            server.ConfigureApplication = a =>
            {
                a.UseForwardedHeaders(new ForwardedHeadersOptions()
                {
                    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
                });
            };
            /*server.ConfigureServices = s =>
            {
                s.Configure<ForwardedHeadersOptions>(o =>
                {
                    o.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
                });
            };*/
            
            async Task Auth(Request req, Response res)
            {
                if (req.GetSession<OsteSession>() == null)
                    await res.SendStatus(HttpStatusCode.Unauthorized);
            }
            
            server.Post("/api/login", async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                
                if (!form.ContainsKey("username") || !form.ContainsKey("password"))
                {
                    await res.SendString("Username or password missing", status: HttpStatusCode.BadRequest);
                    return;
                }
                
                string username = form["username"];
                string password = form["password"];
                
                var user = users.FindOne(u => u.Username == username);
                if (user == null)
                {
                    await res.SendString("Invalid username or password", status: HttpStatusCode.Unauthorized);
                    return;
                }
                
                if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                {
                    req.OpenSession(new OsteSession
                    {
                        Username = user.Username,
                        Name = user.Name
                    });
                    await res.SendJson(new {
                        name = user.Name,
                        avatar = $"/assets/avatars/{user.Name.Split()[0].ToLower()}.png"
                    });
                }
                else
                {
                    await res.SendString("Invalid username or password", status: HttpStatusCode.Unauthorized);
                }
            });
            
            server.Post("/api/logout", Auth, async (req, res) =>
            {
                try
                {
                    var session = req.GetSession<OsteSession>();
                    session?.Close(req);
                    await res.SendStatus(HttpStatusCode.OK);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    await res.SendString("Logout not yet supported", status: HttpStatusCode.InternalServerError);
                }
            });
            
            server.Post("/api/register", async (req, res) =>
            {
                var form = await req.GetFormDataAsync();

                if (!User.IsValidForm(form))
                {
                    await res.SendString("Username, password or registrant name is missing", status: HttpStatusCode.BadRequest);
                    return;
                }
                
                string username = form["username"];
                string password = form["password"];
                string registrant = form["registrant"];

                var allowedRegistrants = await File.ReadAllLinesAsync("./AllowedUsers.txt");

                if (!allowedRegistrants.Contains(registrant))
                {
                    await res.SendString("Sorry, you are not allowed to register here. Talk to Tobias if this is wrong", status: HttpStatusCode.BadRequest);
                    return;
                }

                var userWithSameUsername = users.FindOne(u => u.Username == username);
                if (userWithSameUsername != null)
                {
                    await res.SendString("Username is already taken", status: HttpStatusCode.BadRequest);
                    return;
                }

                var user = new User()
                {
                    Id = User.NewId(),
                    Username = username,
                    Password = BCrypt.Net.BCrypt.HashPassword(password),
                    Name = registrant
                };

                try
                {
                    users.Insert(user.Id, user);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
                
                req.OpenSession(new OsteSession
                {
                    Username = username,
                    Name = registrant
                });

                await res.SendStatus(HttpStatusCode.OK);
            });
            
            server.Post("/api/resetpassword", async (req, res) =>
            {
                var form = await req.GetFormDataAsync();

                string username = form["username"];
                string registrant = form["registrant"];
                string newPassword1 = form["password1"];
                string newPassword2 = form["password2"];

                if (newPassword1 != newPassword2)
                {
                    await res.SendString("The two passwords provided does not match. Please repeat the new password properly", status: HttpStatusCode.BadRequest);
                    return;
                }
                
                var user = users.FindOne(u => u.Username == username && u.Name == registrant);
                if (user != null)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword1);
                    users.Update(user);
                    await res.SendString("Your password has been changed!");
                }
                else
                {
                    await res.SendString("Sorry, the username or registrant name (or the combination of the two) are invalid", status: HttpStatusCode.BadRequest);
                }
                
            });
            
            server.Get("/api/shopping", Auth, async (req, res) =>
            {
                var items = shoppingItems.FindAll();
                await res.SendJson(items);
            });
            
            server.Post("/api/shopping", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("name") || !form.ContainsKey("category"))
                {
                    await res.SendString("'name' or 'category' is missing.", status: HttpStatusCode.BadRequest);
                    return;
                }

                var items = shoppingItems.Find(item => item.Name == form["name"]);
                if (items.Any())
                {
                    await res.SendString("Duplicate item cannot be added", status: HttpStatusCode.BadRequest);
                    return;
                }

                var i = new ShoppingItem()
                {
                    Id = Guid.NewGuid().ToString("N"),
                    Name = form["name"],
                    Category = form["category"],
                    Active = true
                };
                shoppingItems.Insert(i);
                await res.SendJson(i);
            });
            
            server.Put("/api/shopping", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("name") || !form.ContainsKey("category") || !form.ContainsKey("id"))
                {
                    await res.SendString("'name', 'category' or 'id' is missing.", status: HttpStatusCode.BadRequest);
                    return;
                }

                var items = shoppingItems.FindOne(i => i.Id == form["id"].ToString());
                if (items == null)
                {
                    await res.SendString("Invalid item Id", status: HttpStatusCode.BadRequest);
                    return;
                }

                items.Name = form["name"];
                items.Category = form["category"];
                items.Active = form.ContainsKey("active") ? form["active"] == "true" : items.Active;
                shoppingItems.Update(items);
                await res.SendJson(items);
            });
            
            server.Delete("/api/shopping", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    await res.SendString("'id' is missing", status: HttpStatusCode.BadRequest);
                    return;
                }

                shoppingItems.Delete(form["id"].ToString());
                await res.SendStatus(HttpStatusCode.OK);
            });
            
            server.Get("/api/cooking", Auth, async (req, res) =>
            {
                var c = cookingSchedule.FindAll();
                await res.SendJson(c);
            });
            server.Post("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("chef") || !form.ContainsKey("meal") || !form.ContainsKey("week"))
                {
                    await res.SendString("'name' or 'category' is missing.", status: HttpStatusCode.BadRequest);
                    return;
                }
                if (!int.TryParse(form["week"], out var week))
                {
                    await res.SendString("'week' must be an int");
                    return;
                }

                var items = cookingSchedule.Find(item => item.Week == week);
                if (items.Any())
                {
                    await res.SendString("Der findes allerede et måltid for den uge", status: HttpStatusCode.BadRequest);
                    return;
                }

                var i = new Cooking()
                {
                    Week = week,
                    Chef = form["chef"],
                    Meal = form["meal"]
                };
                cookingSchedule.Insert(i);
                await res.SendJson(i);
            });
            server.Put("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("chef") || !form.ContainsKey("meal") || !form.ContainsKey("week"))
                {
                    await res.SendString("'name' or 'category' is missing.", status: HttpStatusCode.BadRequest);
                    return;
                }
                if (!int.TryParse(form["week"], out var week))
                {
                    await res.SendString("'week' must be an int");
                    return;
                }

                var items = cookingSchedule.FindOne(i => i.Week == week);
                if (items == null)
                {
                    await res.SendString("Der findes ikke noget måltid for den uge", status: HttpStatusCode.BadRequest);
                    return;
                }

                items.Week = week;
                items.Meal = form["meal"];
                items.Chef = form["chef"];
                cookingSchedule.Update(items);
                await res.SendJson(items);
            });
            
            server.Delete("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("week"))
                {
                    await res.SendString("'week' is missing", status: HttpStatusCode.BadRequest);
                    return;
                }
                if (!int.TryParse(form["week"], out var week))
                {
                    await res.SendString("'week' must be an int", status: HttpStatusCode.BadRequest);
                    return;
                }

                var m = cookingSchedule.FindOne(w => w.Week == week);
                if (m == null)
                {
                    await res.SendString("Der er ikke nogen menu for den uge", status: HttpStatusCode.NotFound);
                    return;
                }

                cookingSchedule.Delete(m.Week);
                await res.SendStatus(HttpStatusCode.OK);
            });

            server.Start();
            Console.ReadLine();
        }
    }
}
