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
            var fixits = db.GetCollection<Fixit>("fixits");
            if (!Directory.Exists("public"))
                Directory.CreateDirectory("public");

            var dateTimeFormat = new CultureInfo( "da-DK" ).DateTimeFormat;

            if (args.Contains("--add-rules"))
            {
                var plainRules = File.ReadAllText("rules.json");
                var parsedRules = JsonConvert.DeserializeObject<List<KollexiconRule>>(plainRules);
                rules.Delete(r => true);
                rules.InsertBulk(parsedRules);
                Console.WriteLine("Rules have been inserted. Please run again without '--add-rules'");
                return;
            }

            server.Use(new CookieSessions<OsteSession>(
                new CookieSessionSettings(TimeSpan.FromDays(365*3))
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
                try
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
                        await res.SendString("Brugernavn eller kodeord er ikke korrekt",
                            status: HttpStatusCode.BadRequest);
                        return;
                    }

                    if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                    {
                        await req.OpenSession(new OsteSession
                        {
                            Username = user.Username,
                            Name = user.Name
                        });
                        await res.SendJson(new
                        {
                            name = user.Name,
                            avatar = $"/assets/avatars/{user.Name.Split()[0].ToLower()}.png"
                        });
                    }
                    else
                    {
                        await res.SendString("Brugernavn eller kodeord er ikke korrekt",
                            status: HttpStatusCode.BadRequest);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    await res.SendString(e.Message, status: HttpStatusCode.InternalServerError);
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
                    await res.SendString("Listen med beboere kunne ikke hentes", status: HttpStatusCode.InternalServerError);
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
                        cook.Meal,
                        cook.Participants,
                    };
                }));
            });
            server.Post("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error, true))
                {
                    await res.SendString(error, status: HttpStatusCode.BadRequest);
                    return;
                }
                cooking.Chef = req.GetSession<OsteSession>().Data.Name;

                var items = cookingSchedule.Find(item => item.Week == cooking.Week);
                if (items.Any())
                {
                    await res.SendString("Der findes allerede et måltid for den uge", status: HttpStatusCode.BadRequest);
                    return;
                }
                
                cooking.Participants.Add(cooking.Chef);
                cookingSchedule.Insert(cooking);
                var dayName = dateTimeFormat.GetDayName(cooking.Day);
                await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cooking.Week,
                    cooking.Chef,
                    cooking.Meal,
                    cooking.Participants
                });
            });
            server.Put("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error, true))
                {
                    await res.SendString(error, status: HttpStatusCode.BadRequest);
                    return;
                }

                var cook = cookingSchedule.FindOne(i => i.Week == cooking.Week);
                if (cook == null)
                {
                    await res.SendString("Der findes ikke noget måltid for den uge", status: HttpStatusCode.BadRequest);
                    return;
                }

                cook.Week = cooking.Week;
                cook.Meal = cooking.Meal;
                cook.Chef = req.GetSession<OsteSession>().Data.Name;
                cook.Day = cooking.Day;
                cookingSchedule.Update(cook);
                var dayName = dateTimeFormat.GetDayName(cooking.Day);
                await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cook.Week,
                    cook.Chef,
                    cook.Meal
                });
            });
            server.Put("/api/cooking/participate", Auth, async (req, res) =>
            {
                try
                {
                    var user = req.GetSession<OsteSession>().Data.Name;
                    if (string.IsNullOrEmpty(user))
                    {
                        await res.SendString("Dit brugernavn kunne ikke findes. Er du logget ind?",
                            status: HttpStatusCode.BadRequest);
                        return;
                    }

                    var form = await req.GetFormDataAsync();
                    if (!Cooking.TryParseForm(form, out var cooking, out var error))
                    {
                        await res.SendString(error, status: HttpStatusCode.BadRequest);
                        return;
                    }
                    
                    if (cooking.Participants == null)
                        cooking.Participants = new List<string>();
                    if (cooking.Participants.Contains(user))
                    {
                        await res.SendString("Du deltager allerede i det måltid");
                        return;
                    }

                    cooking.Participants.Add(user);
                    cookingSchedule.Update(cooking);
                    await res.SendString("Du deltager nu i måltidet");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    await res.SendString(e.Message, status: HttpStatusCode.InternalServerError);
                }
            });
            server.Delete("/api/cooking/participate", Auth, async (req, res) =>
            {
                var user = req.GetSession<OsteSession>().Data.Name;
                if (string.IsNullOrEmpty(user))
                {
                    await res.SendString("Dit brugernavn kunne ikke findes. Er du logget ind?",
                        status: HttpStatusCode.BadRequest);
                    return;
                }

                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error))
                {
                    await res.SendString(error, status: HttpStatusCode.BadRequest);
                    return;
                }

                if (cooking.Chef == user)
                {
                    await res.SendString("Du skal deltage i dit eget måltid", status: HttpStatusCode.BadRequest);
                    return;
                }
                
                if (cooking.Participants == null)
                    cooking.Participants = new List<string>();
                if (!cooking.Participants.Contains(user))
                {
                    await res.SendString("Du kan ikke forlade et måltid du ikke deltager i",
                        status: HttpStatusCode.BadRequest);
                    return;
                }

                cooking.Participants.Remove(user);
                cookingSchedule.Update(cooking);
                var dayName = dateTimeFormat.GetDayName(cooking.Day);
                await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cooking.Week,
                    cooking.Chef,
                    cooking.Meal,
                    cooking.Participants
                });
            });

            server.Delete("/api/cooking", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error))
                {
                    await res.SendString(error, status: HttpStatusCode.BadRequest);
                    return;
                }

                var m = cookingSchedule.FindOne(w => w.Week == cooking.Week);
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

            #region Fixit

            server.Get("/api/fixit", Auth, async (req, res) =>
            {
                var items = fixits.FindAll();
                await res.SendJson(items);
            });
            server.Get("/api/fixit/:img", async (req, res) =>
            {
                await res.SendFile("./public/" + req.Parameters["img"]);
            });

            server.Post("/api/fixit", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Fixit.TryValidate(form, out var fixit))
                {
                    await res.SendString("'title' or 'description' is missing", status: HttpStatusCode.BadRequest);
                    return;
                }

                fixit.Id = Guid.NewGuid().ToString("N");
                if (form.Files.Any())
                {
                    try
                    {
                        var imgName = form.Files.GetFile("image").FileName;
                        var ext = Path.GetExtension(imgName);

                        await req.SaveFiles("public", old => fixit.Id + ext);
                        fixit.ImagePath = fixit.Id + ext;
                    }
                    catch (Exception e)
                    {
                        await res.SendString("Filen kunne ikke gemmes, den er nok for stor",
                            status: HttpStatusCode.BadRequest);
                        return;
                    }
                }
                else
                {
                    fixit.ImagePath = "default.png";
                }

                fixits.Insert(fixit);
                await res.SendJson(fixit);
            });

            server.Put("/api/fixit", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Fixit.TryValidate(form, out var fixit, true))
                {
                    await res.SendString("'title', 'description' or 'id' is missing.", status: HttpStatusCode.BadRequest);
                    return;
                }

                var f = fixits.FindOne(i => i.Id == fixit.Id);
                if (f == null)
                {
                    await res.SendString("Invalid item Id", status: HttpStatusCode.BadRequest);
                    return;
                }

                if (form.Files.Any())
                {
                    var imgName = form.Files.GetFile("image").FileName;
                    var ext = Path.GetExtension(imgName);

                    File.Delete(Path.Combine("public", f.ImagePath));
                    await req.SaveFiles("public", old => f.Id + ext);
                    fixit.ImagePath = f.Id + ext;
                }
                else
                    fixit.ImagePath = f.ImagePath;

                if (form.ContainsKey("done") && bool.TryParse(form["done"], out var done))
                    fixit.Done = done;
                else
                    fixit.Done = f.Done;

                fixits.Update(fixit);
                //Append a random query to the end of the image url to force refresh on frontend
                fixit.ImagePath += "?" + DateTime.Now.Ticks;
                await res.SendJson(fixit);
            });

            server.Delete("/api/fixit", Auth, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    await res.SendString("'id' is missing", status: HttpStatusCode.BadRequest);
                    return;
                }

                fixits.Delete(form["id"].ToString());
                await res.SendStatus(HttpStatusCode.OK);
            });

            #endregion

            server.Start();
            Console.ReadLine();
        }
    }
}
