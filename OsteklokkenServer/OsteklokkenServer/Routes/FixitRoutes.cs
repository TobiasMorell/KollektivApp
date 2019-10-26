using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using LiteDB;
using Red.Interfaces;

namespace OsteklokkenServer.Routes
{
    public static class FixitRoutes
    {
        public static void Register(IRouter router, LiteDatabase db)
        {
            var fixits = db.GetCollection<Fixit>("fixits");
            
            router.Get("", Utils.Authed, (req, res) =>
            {
                var items = fixits.FindAll();
                return res.SendJson(items);
            });
            
            router.Get("/:img", (req, res) 
                => res.SendFile("./public/" + req.Context.ExtractUrlParameter("img")));

            router.Post("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Fixit.TryValidate(form, out var fixit))
                {
                    return await res.SendString("'title' or 'description' is missing", status: HttpStatusCode.BadRequest);
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
                        return await res.SendString("Filen kunne ikke gemmes, den er nok for stor",
                            status: HttpStatusCode.BadRequest);
                    }
                }
                else
                {
                    fixit.ImagePath = "default.png";
                }

                fixits.Insert(fixit);
                return await res.SendJson(fixit);
            });

            router.Put("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!Fixit.TryValidate(form, out var fixit, true))
                {
                    return await res.SendString("'title', 'description' or 'id' is missing.", status: HttpStatusCode.BadRequest);
                }

                var f = fixits.FindOne(i => i.Id == fixit.Id);
                if (f == null)
                {
                    return await res.SendString("Invalid item Id", status: HttpStatusCode.BadRequest);
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
                return await res.SendJson(fixit);
            });

            router.Delete("", Utils.Authed, async (req, res) =>
            {
                var form = await req.GetFormDataAsync();
                if (!form.ContainsKey("id"))
                {
                    return await res.SendString("'id' is missing", status: HttpStatusCode.BadRequest);
                }

                fixits.Delete(form["id"].ToString());
                return await res.SendStatus(HttpStatusCode.OK);
            });
        }
    }
}