using LiteDB;
using Microsoft.AspNetCore.Http;

namespace OsteklokkenServer
{
    public class Fixit
    {
        [BsonId]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }

        public static bool TryValidate(IFormCollection form, out Fixit fixit, bool requireId = false)
        {
            if (!form.ContainsKey("title") || !form.ContainsKey("description"))
            {
                fixit = null;
                return false;
            }

            fixit = new Fixit{Title = form["title"], Description = form["description"]};
            if (requireId && !form.ContainsKey("id"))
                return false;
            if(requireId)
                fixit.Id = form["id"];

            return true;
        }
    }
}