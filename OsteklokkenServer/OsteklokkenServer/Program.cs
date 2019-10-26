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
using OsteklokkenServer.Routes;
using Red.CookieSessions;
using Red.CookieSessions.LiteDBStore;

namespace OsteklokkenServer
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var server = new RedHttpServer(5000, "public");
            var db = new LiteDatabase("osteklokken.litedb");
            
            if (!Directory.Exists("public"))
                Directory.CreateDirectory("public");

            if (args.Contains("--add-rules"))
            {
                KollexiconRoutes.ImportRules(db);
                Console.WriteLine("Rules have been inserted. Please run again without '--add-rules'");
                return;
            }


            server.Use(new CookieSessions<OsteSession>(TimeSpan.FromDays(365 * 3))
            {
                Secure = false,
                Store = new LiteDBSessionStore<OsteSession>(db)
            });

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

            server.Get("/api/ping", (req, res) => res.SendString("pong"));
            
            UserRoutes.Register(server.CreateRouter("/api"), db);
            FixitRoutes.Register(server.CreateRouter("/api/fixit"), db);
            KollexiconRoutes.Register(server.CreateRouter("/api/kollexicon"), db);
            ShoppingRoutes.Register(server.CreateRouter("/api/shopping"), db);
            CookingRoutes.Register(server.CreateRouter("/api/cooking"), db);

            await server.RunAsync();
        }
    }
}
