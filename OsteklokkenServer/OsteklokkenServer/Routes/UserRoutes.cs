using System;
using System.IO;
using System.Linq;
using System.Net;
using LiteDB;
using Red.CookieSessions;
using Red.Interfaces;

namespace OsteklokkenServer.Routes
{
    public static class UserRoutes
    {
        public static void Register(IRouter router, LiteDatabase db)
        {
            var users = db.GetCollection<User>("users");
            
            router.Post("/login", async (req, res) =>
            {
                var form = await req.GetFormDataAsync();

                if (!form.ContainsKey("username") || !form.ContainsKey("password"))
                {
                    return await res.SendString("Fields 'username' or 'password' missing", status: HttpStatusCode.BadRequest);
                }

                string username = form["username"];
                string password = form["password"];

                var user = users.FindOne(u => Utils.CompareNames(username, u.Username));
                if (user == null)
                {
                    return await res.SendString("Brugernavn eller kodeord er ikke korrekt",
                        status: HttpStatusCode.BadRequest);
                }

                if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                {
                    await res.OpenSession(new OsteSession
                    {
                        Username = user.Username,
                        Name = user.Name
                    });
                    return await res.SendJson(new
                    {
                        name = user.Name,
                        avatar = $"/assets/avatars/{user.Name.Split()[0].ToLower()}.png"
                    });
                }

                return await res.SendString("Brugernavn eller kodeord er ikke korrekt",
                    status: HttpStatusCode.BadRequest);
            });

            router.Post("/logout", Utils.Authed, async (req, res) =>
            {
                var session = req.GetData<OsteSession>();
                await res.CloseSession(session);
                return await res.SendStatus(HttpStatusCode.OK);
            });

            router.Post("/register", async (req, res) =>
            {
                var form = await req.GetFormDataAsync();

                if (!User.IsValidForm(form))
                {
                    return await res.SendString("Username, password or registrant name is missing", status: HttpStatusCode.BadRequest);
                }

                string username = form["username"];
                string password = form["password"];
                string registrant = form["registrant"];

                try
                {
                    var allowedRegistrants = await File.ReadAllLinesAsync("./AllowedUsers.txt");
                    if (!allowedRegistrants.Any(n => Utils.CompareNames(n, registrant)))
                    {
                        return await res.SendString(
                            "Du står ikke på listen af nuværende beboere. Tal med Tobias hvis det er en fejl",
                            status: HttpStatusCode.BadRequest);
                    }
                }
                catch (IOException e)
                {
                    return await res.SendString("Listen med beboere kunne ikke hentes", status: HttpStatusCode.InternalServerError);
                }

                var userWithSameUsername = users.FindOne(u => Utils.CompareNames(u.Username, username));
                if (userWithSameUsername != null)
                {
                    return await res.SendString("Brugernavnet er optaget", status: HttpStatusCode.BadRequest);
                }

                var user = new User
                {
                    Id = User.NewId(),
                    Username = username.ToLower(),
                    Password = BCrypt.Net.BCrypt.HashPassword(password),
                    Name = registrant
                };
                users.Insert(user.Id, user);
                
                await res.OpenSession(new OsteSession
                {
                    Username = username,
                    Name = registrant
                });

                return await res.SendStatus(HttpStatusCode.OK);
            });

            router.Post("/resetpassword", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();

                string username = form["username"];
                string registrant = form["registrant"];
                string newPassword1 = form["password"];

                var user = users.FindOne(u => Utils.CompareNames(u.Username, username) && Utils.CompareNames(u.Name, registrant));
                if (user != null)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword1);
                    users.Update(user);
                    return await res.SendString("Dit kodeord er opdateret!");
                }

                return await res.SendString("Dit brugernavn og rigtige navn passer ikke på en bruger", status: HttpStatusCode.BadRequest);
            });
        }
    }
}