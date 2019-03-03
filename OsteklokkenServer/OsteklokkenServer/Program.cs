using System;
using System.Collections.Generic;
using System.Globalization;
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
using Newtonsoft.Json;
using Red.CookieSessions;

namespace OsteklokkenServer
{
    class Program
    {

        private static bool Compare(string name1, string name2)
        {
            var formattedName1 = name1.ToLower().Trim();
            var formattedName2 = name2.ToLower().Trim();
            return formattedName1 == formattedName2;
        }
        
        static void Main(string[] args)
        {
            var server = new RedHttpServer(5000, "public");
            var db = new LiteDatabase("osteklokken.litedb");
            var users = db.GetCollection<User>("users");
            var shoppingItems = db.GetCollection<ShoppingItem>("shoppingItems");
            var cookingSchedule = db.GetCollection<Cooking>("cooking");
            var rules = db.GetCollection<KollexiconRule>("kollexicon");
            
            var dateTimeFormat = new CultureInfo( "da-DK" ).DateTimeFormat;
            
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

            server.Get("/api/ping", async (req, res) => {
                await res.SendString("pong");
            });
            
            #region Users
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
                
                var user = users.FindOne(u => Compare(username, u.Username));
                if (user == null)
                {
                    await res.SendString("Brugernavn eller kodeord er ikke korrekt", status: HttpStatusCode.BadRequest);
                    return;
                }
                
                if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                {
                    await req.OpenSession(new OsteSession
                    {
                        Username = user.Username,
                        Name = user.Name
                    });
                    await res.SendJson(new {
                        name = user.Name,
                        avatar = $"/osteklokken/assets/avatars/{user.Name.Split()[0].ToLower()}.png"
                    });
                }
                else
                {
                    await res.SendString("Brugernavn eller kodeord er ikke korrekt", status: HttpStatusCode.BadRequest);
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
                    await res.SendString("Man kan ikke logge ud endnu :(", status: HttpStatusCode.InternalServerError);
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

                try
                {
                    var allowedRegistrants = await File.ReadAllLinesAsync("./AllowedUsers.txt");
                    if (!allowedRegistrants.Any(n => Compare(n, registrant)))
                    {
                        await res.SendString(
                            "Du står ikke på listen af nuværende beboere. Tal med Tobias hvis det er en fejl",
                            status: HttpStatusCode.BadRequest);
                        return;
                    }
                }
                catch (Exception e)
                {
                    await res.SendString(e.ToString(), status: HttpStatusCode.InternalServerError);
                    return;
                }

                var userWithSameUsername = users.FindOne(u => Compare(u.Username, username));
                if (userWithSameUsername != null)
                {
                    await res.SendString("Brugernavnet er optaget", status: HttpStatusCode.BadRequest);
                    return;
                }

                var user = new User()
                {
                    Id = User.NewId(),
                    Username = username.ToLower(),
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
                
                await req.OpenSession(new OsteSession
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
                string newPassword1 = form["password"];
                
                var user = users.FindOne(u => Compare(u.Username, username) && Compare(u.Name, registrant));
                if (user != null)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword1);
                    users.Update(user);
                    await res.SendString("Dit kodeord er opdateret!");
                }
                else
                {
                    await res.SendString("Dit brugernavn og rigtige navn passer ikke på en bruger", status: HttpStatusCode.BadRequest);
                } 
            });
            #endregion
            
            #region Shopping
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
            #endregion

            #region Cooking
            server.Get("/api/cooking", Auth, async (req, res) =>
            {
                var c = cookingSchedule.FindAll();
                await res.SendJson(c.Select(cook =>
                {
                    var dayName = dateTimeFormat.GetDayName(cook.Day);
                    return new
                    {
                        Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                        cook.Week,
                        cook.Chef,
                        cook.Meal
                    };
                }));
            });
            server.Post("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("chef") || !form.ContainsKey("meal") || !form.ContainsKey("week") || !form.ContainsKey("weekday"))
                {
                    await res.SendString("'name', 'meal, 'weekday' or 'category' is missing.", status: HttpStatusCode.BadRequest);
                    return;
                }
                if (!int.TryParse(form["week"], out var week))
                {
                    await res.SendString("'week' must be an int");
                    return;
                }

                if (!Enum.TryParse<DayOfWeek>(form["weekday"], out var day))
                {
                    await res.SendString("The value of 'weekday' was not valid: " + form["weekday"],
                        status: HttpStatusCode.BadRequest);
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
                    Meal = form["meal"],
                    Day = day
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
                if (!Enum.TryParse<DayOfWeek>(form["weekday"], out var day))
                {
                    await res.SendString("The value of 'weekday' was not valid: " + form["weekday"],
                        status: HttpStatusCode.BadRequest);
                    return;
                }

                var cook = cookingSchedule.FindOne(i => i.Week == week);
                if (cook == null)
                {
                    await res.SendString("Der findes ikke noget måltid for den uge", status: HttpStatusCode.BadRequest);
                    return;
                }

                cook.Week = week;
                cook.Meal = form["meal"];
                cook.Chef = form["chef"];
                cook.Day = day;
                cookingSchedule.Update(cook);
                var dayName = dateTimeFormat.GetDayName(day);
                await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cook.Week,
                    cook.Chef,
                    cook.Meal
                });
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
            #endregion

            #region Kollexicon

            server.Get("/api/kollexicon", async (request, response) =>
            {
                var r = rules.FindAll().OrderBy(x => x.Title);
                await response.SendJson(r);
            });
            
            server.Post("/api/kollexicon", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("title") || !form.ContainsKey("description"))
                {
                    await res.SendString("'title' or 'description' missing.", status: HttpStatusCode.BadRequest);
                    return;
                }

                if (rules.FindOne(r => r.Title == form["title"]) != null)
                {
                    await res.SendString("Der findes allerede en regl med det navn", status: HttpStatusCode.BadRequest);
                    return;
                }

                var rule = new KollexiconRule { Title = form["title"], Description = form["description"] };
                rules.Insert(rule);

                await res.SendJson(rule);
            });

            server.Put("/api/kollexicon", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("title") || !form.ContainsKey("description") || !form.ContainsKey("id"))
                {
                    await res.SendString("'id', 'title' or 'description' missing.", status: HttpStatusCode.BadRequest);
                    return;
                }

                string id = form["id"];
                var rule = rules.FindOne(r => r.Id.Equals(id));
                if (rule == null)
                {
                    await res.SendString("No rule for the given id", status: HttpStatusCode.BadRequest);
                    return;
                }

                rule.Title = form["title"];
                rule.Description = form["description"];
                
                rules.Update(rule);
                await res.SendJson(rule);
            });
            
            server.Delete("/api/kollexicon", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    await res.SendString("'id' is missing", status: HttpStatusCode.BadRequest);
                    return;
                }

                string id = form["id"];
                var m = rules.FindOne(r => r.Id.Equals(id));
                if (m == null)
                {
                    await res.SendString("No rule for the given id", status: HttpStatusCode.NotFound);
                    return;
                }

                rules.Delete(m.Id);
                await res.SendStatus(HttpStatusCode.OK);
            });
            #endregion

            server.Start();
            Console.ReadLine();
        }
    }
}
