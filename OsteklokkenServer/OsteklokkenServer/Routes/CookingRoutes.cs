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
                var c = cookingSchedule.FindAll();
                return res.SendJson(c.Select(cook =>
                {
                    var dayName = Utils.DateTimeFormat.GetDayName(cook.Day);
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
            router.Post("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error, true))
                {
                    return await res.SendString(error, status: HttpStatusCode.BadRequest);
                }
                cooking.Chef = req.GetData<OsteSession>().Name;

                var items = cookingSchedule.Find(item => item.Week == cooking.Week);
                if (items.Any())
                {
                    return await res.SendString("Der findes allerede et måltid for den uge", status: HttpStatusCode.BadRequest);
                }
                
                cooking.Participants.Add(cooking.Chef);
                cookingSchedule.Insert(cooking);
                var dayName = Utils.DateTimeFormat.GetDayName(cooking.Day);
                return await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cooking.Week,
                    cooking.Chef,
                    cooking.Meal,
                    cooking.Participants
                });
            });
            router.Put("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error, true))
                {
                    return await res.SendString(error, status: HttpStatusCode.BadRequest);
                }

                var cook = cookingSchedule.FindOne(i => i.Week == cooking.Week);
                if (cook == null)
                {
                    return await res.SendString("Der findes ikke noget måltid for den uge", status: HttpStatusCode.BadRequest);
                }

                cook.Week = cooking.Week;
                cook.Meal = cooking.Meal;
                cook.Chef = req.GetData<OsteSession>().Name;
                cook.Day = cooking.Day;
                cookingSchedule.Update(cook);
                var dayName = Utils.DateTimeFormat.GetDayName(cooking.Day);
                return await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cook.Week,
                    cook.Chef,
                    cook.Meal
                });
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
                var week = int.Parse(form["week"]);

                // Find the cooking session
                var cooking = cookingSchedule.FindOne(i => i.Week == week);

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
                var dayName = Utils.DateTimeFormat.GetDayName(cooking.Day);
                return await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cooking.Week,
                    cooking.Chef,
                    cooking.Meal,
                    cooking.Participants
                });
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
                if (!form.ContainsKey("week"))
                {
                    return await res.SendString("Could not find field 'week'", status: HttpStatusCode.BadRequest);
                }

                var week = int.Parse(form["week"]);
                var cooking = cookingSchedule.FindOne(c => c.Week == week);

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
                var dayName = Utils.DateTimeFormat.GetDayName(cooking.Day);
                return await res.SendJson(new
                {
                    Day = char.ToUpper(dayName[0]) + dayName.Substring(1),
                    cooking.Week,
                    cooking.Chef,
                    cooking.Meal,
                    cooking.Participants
                });
            });

            router.Delete("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Cooking.TryParseForm(form, out var cooking, out var error))
                {
                    return await res.SendString(error, status: HttpStatusCode.BadRequest);
                }

                var m = cookingSchedule.FindOne(w => w.Week == cooking.Week);
                if (m == null)
                {
                    return await res.SendString("Der er ikke nogen menu for den uge", status: HttpStatusCode.NotFound);
                }

                cookingSchedule.Delete(m.Week);
                return await res.SendStatus(HttpStatusCode.OK);
            });
        }
    }
}