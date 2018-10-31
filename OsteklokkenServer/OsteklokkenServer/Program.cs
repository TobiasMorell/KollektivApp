using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Red;
using LiteDB;
using Microsoft.AspNetCore.Http;
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
            
            server.Use(new CookieSessions(new CookieSessionSettings(TimeSpan.FromDays(14))
            {
                Secure = false
            }));

            async Task Auth(Request req, Response res)
            {
                if (req.GetSession<OsteSession>() == null)
                    await res.SendStatus(HttpStatusCode.Unauthorized);
            }
            
            server.Post("/api/login", async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                
                if (!User.IsValidForm(form))
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
                        Username = user.Username
                    });
                    await res.SendStatus(HttpStatusCode.OK);
                }
                else
                {
                    await res.SendString("Invalid username or password", status: HttpStatusCode.Unauthorized);
                }
            });
            
            server.Post("/api/logout", Auth, async (req, res) =>
            {
                req.GetSession<OsteSession>().Close(req);
                await res.SendStatus(HttpStatusCode.OK);
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

                var allowedRegistrants = File.ReadAllLines("./AllowedUsers.txt");

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
                
                users.Insert(user.Id, user);
                req.OpenSession(new OsteSession
                {
                    Username = username
                });
                
                await res.SendStatus(HttpStatusCode.OK);
            });
            
            server.Get("/api/shopping", Auth, async (req, res) =>
            {
                var items = shoppingItems.FindAll();
                await res.SendJson(items);
            });

            server.Start();
            Console.ReadLine();
        }
    }
}