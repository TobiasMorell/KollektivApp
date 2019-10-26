using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using LiteDB;
using Newtonsoft.Json;
using Red.Interfaces;

namespace OsteklokkenServer.Routes
{
    public static class KollexiconRoutes
    {
        public static void ImportRules(LiteDatabase db)
        {
            var rules = db.GetCollection<KollexiconRule>("kollexicon");
                        
            var plainRules = File.ReadAllText("rules.json");
            var parsedRules = JsonConvert.DeserializeObject<List<KollexiconRule>>(plainRules);
            rules.Delete(r => true);
            rules.InsertBulk(parsedRules);
        }
        
        public static void Register(IRouter router, LiteDatabase db)
        {
            var rules = db.GetCollection<KollexiconRule>("kollexicon");

            
            router.Get("", Utils.Authed, async (request, response) =>
            {
                var r = rules.FindAll().OrderBy(x => x.Title);
                return await response.SendJson(r);
            });

            router.Post("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("title") || !form.ContainsKey("description"))
                {
                    return await res.SendString("'title' or 'description' missing.", status: HttpStatusCode.BadRequest);
                }

                if (rules.FindOne(r => r.Title == form["title"]) != null)
                {
                    return await res.SendString("Der findes allerede en regl med det navn", status: HttpStatusCode.BadRequest);
                }

                var rule = new KollexiconRule { Title = form["title"], Description = form["description"] };
                rules.Insert(rule);

                return await res.SendJson(rule);
            });

            router.Put("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("title") || !form.ContainsKey("description") || !form.ContainsKey("id"))
                {
                    return await res.SendString("'id', 'title' or 'description' missing.", status: HttpStatusCode.BadRequest);
                }

                string id = form["id"];
                var rule = rules.FindOne(r => r.Id.Equals(id));
                if (rule == null)
                {
                    return await res.SendString("No rule for the given id", status: HttpStatusCode.BadRequest);
                }

                rule.Title = form["title"];
                rule.Description = form["description"];

                rules.Update(rule);
                return await res.SendJson(rule);
            });

            router.Delete("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    return await res.SendString("'id' is missing", status: HttpStatusCode.BadRequest);
                }

                string id = form["id"];
                var m = rules.FindOne(r => r.Id.Equals(id));
                if (m == null)
                {
                    return await res.SendString("No rule for the given id", status: HttpStatusCode.NotFound);
                }

                rules.Delete(m.Id);
                return await res.SendStatus(HttpStatusCode.OK);
            });
        }
    }
}