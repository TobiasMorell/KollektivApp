using System;
using System.Linq;
using System.Net;
using LiteDB;
using Red.Interfaces;

namespace OsteklokkenServer.Routes
{
    public static class ShoppingRoutes
    {
        public static void Register(IRouter router, LiteDatabase db)
        {
            var shoppingItems = db.GetCollection<ShoppingItem>("shoppingItems");
            
            router.Get("", Utils.Authed, async (req, res) =>
            {
                var items = shoppingItems.FindAll();
                return await res.SendJson(items);
            });

            router.Post("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("name") || !form.ContainsKey("category"))
                {
                    return await res.SendString("'name' or 'category' is missing.", status: HttpStatusCode.BadRequest);
                }

                var items = shoppingItems.Find(item => item.Name == form["name"]);
                if (items.Any())
                {
                    return await res.SendString("Duplicate item cannot be added", status: HttpStatusCode.BadRequest);
                }

                var i = new ShoppingItem()
                {
                    Id = Guid.NewGuid().ToString("N"),
                    Name = form["name"],
                    Category = form["category"],
                    Active = true
                };
                shoppingItems.Insert(i);
                return await res.SendJson(i);
            });

            router.Put("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("name") || !form.ContainsKey("category") || !form.ContainsKey("id"))
                {
                    return await res.SendString("'name', 'category' or 'id' is missing.", status: HttpStatusCode.BadRequest);
                }

                var items = shoppingItems.FindOne(i => i.Id == form["id"].ToString());
                if (items == null)
                {
                    return await res.SendString("Invalid item Id", status: HttpStatusCode.BadRequest);
                }

                items.Name = form["name"];
                items.Category = form["category"];
                items.Active = form.ContainsKey("active") ? form["active"] == "true" : items.Active;
                shoppingItems.Update(items);
                return await res.SendJson(items);
            });

            router.Delete("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    return await res.SendString("'id' is missing", status: HttpStatusCode.BadRequest);
                }

                shoppingItems.Delete(form["id"].ToString());
                return await res.SendStatus(HttpStatusCode.OK);
            });
        }
    }
}