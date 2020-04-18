using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using LiteDB;
using Red.Interfaces;

namespace OsteklokkenServer.Routes
{
    public static class CookingRoutes
    {
        public static void Register(IRouter router, LiteDatabase db)
        {
            var cookingSchedule = db.GetCollection<Cooking>("cooking");
            
            router.Get("", Utils.Authed, (req, res) =>
            {
                try
                {
                    var c = cookingSchedule.FindAll();
                    return res.SendJson(c);
                }
                catch (Exception e)
                {
                    // We get to this point if we have malformed data in the database. We do not care about preserving
                    // old data ATM, so simply delete it.
                    cookingSchedule.Delete(c => true);
                    return res.SendJson(new List<Cooking>());
                }
            });
            router.Post("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error, true))
                {
                    return await res.SendString(error, status: HttpStatusCode.BadRequest);
                }
                cooking.Chef = req.GetData<OsteSession>().Name;

                var items = cookingSchedule.Find(item => item.Date.Equals(cooking.Date));
                if (items.Any())
                {
                    return await res.SendString("Der findes allerede et måltid for den uge", status: HttpStatusCode.BadRequest);
                }
                
                cooking.Participants.Add(cooking.Chef);
                cookingSchedule.Insert(cooking);
                return await res.SendJson(cooking);
            });
            router.Put("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error))
                {
                    return await res.SendString(error, status: HttpStatusCode.BadRequest);
                }

                Console.WriteLine(cooking.ToString());
                var cook = cookingSchedule.FindOne(i => i.Equals(cooking));
                if (cook == null)
                {
                    return await res.SendString("Der findes ikke noget måltid for den valgte dato", status: HttpStatusCode.BadRequest);
                }

                cook.Date = cooking.Date;
                cook.Meal = cooking.Meal;
                cook.Chef = req.GetData<OsteSession>().Name;
                cook.Price = cooking.Price;
                cookingSchedule.Update(cook);
                return await res.SendJson(cook);
            });
            router.Put("/participate", Utils.Authed, async (req, res) =>
            {
                // Validate that a user is logged in
                var user = req.GetData<OsteSession>().Name;
                if (string.IsNullOrEmpty(user))
                {
                    return await res.SendString("Dit brugernavn kunne ikke findes. Er du logget ind?",
                        status: HttpStatusCode.BadRequest);
                }

                // Get the week number of the cooking session the user wishes to participate in
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("week"))
                {
                    return await res.SendString("Could not find field 'week'", status: HttpStatusCode.BadRequest);
                }
                string id = form["id"];

                // Find the cooking session
                var cooking = cookingSchedule.FindOne(i => i.Id.Equals(id));

                // Check if the user has already subscribed, return error if so
                if (cooking.Participants == null)
                    cooking.Participants = new List<string>();
                if (cooking.Participants.Contains(user))
                {
                    return await res.SendString("Du deltager allerede i det måltid");
                }

                // Add the user and return OK
                cooking.Participants.Add(user);
                cookingSchedule.Update(cooking);
                return await res.SendJson(cooking);
            });
            router.Delete("/participate", Utils.Authed, async (req, res) =>
            {
                // Validate that a user is logged in
                var user = req.GetData<OsteSession>().Name;
                if (string.IsNullOrEmpty(user))
                {
                    return await res.SendString("Dit brugernavn kunne ikke findes. Er du logget ind?",
                        status: HttpStatusCode.BadRequest);
                }

                // Get the week number of the cooking session and find the session in the database
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    return await res.SendString("Could not find field 'id'", status: HttpStatusCode.BadRequest);
                }

                string id = form["id"];
                var cooking = cookingSchedule.FindOne(c => c.Id.Equals(id));

                // Check if the user is the chef, return error if so, as the Chef must participate in the session
                if (cooking.Chef == user)
                {
                    return await res.SendString("Du skal deltage i dit eget måltid", status: HttpStatusCode.BadRequest);
                }
                
                // Check if the user is participating, return error if not
                if (cooking.Participants == null)
                    cooking.Participants = new List<string>();
                if (!cooking.Participants.Contains(user))
                {
                    return await res.SendString("Du kan ikke forlade et måltid du ikke deltager i",
                        status: HttpStatusCode.BadRequest);
                }

                // Now remote the user, and save the changes to the database.
                cooking.Participants.Remove(user);
                cookingSchedule.Update(cooking);
                return await res.SendJson(cooking);
            });

            router.Delete("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    return await res.SendString("Intet måltid valgt", status: HttpStatusCode.BadRequest);
                }

                string id = form["id"];
                Console.WriteLine(id);

                var m = cookingSchedule.FindOne(w => w.Id.Equals(id));
                if (m == null)
                {
                    return await res.SendString("Der er ikke nogen menu for den valgte dato", status: HttpStatusCode.NotFound);
                }

                cookingSchedule.Delete(m.Id);
                return await res.SendStatus(HttpStatusCode.OK);
            });
        }
    }
}