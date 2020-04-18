using System;
using System.Collections.Generic;
using LiteDB;
using Microsoft.AspNetCore.Http;

namespace OsteklokkenServer
{
    public class Cooking
    {
        public string Chef { get; set; }
        public string Meal { get; set; }
        [BsonId]
        public string Id { get; set; }
        public string Date { get; set; }

        public uint Price { get; set; }

        public List<string> Participants { get; set; }

        public static bool TryParseForm(IFormCollection form, out Cooking cooking, out string error, bool generateId = false)
        {
            cooking = null;
            error = "";
            string id;
            if (generateId)
            {
                id = Guid.NewGuid().ToString("N");
            }
            else
            {
                if (!form.ContainsKey("id"))
                {
                    error = "'id' is missing";
                    return false;
                }

                id = form["id"];
            }

            cooking = new Cooking()
            {
                Id = id,
            };
            
            if (!form.ContainsKey("date"))
            {
                error = "'date' is missing";
                return false;
            }

            cooking.Date = form["date"];

            if (!form.ContainsKey("meal"))
            {
                error = "'meal' is missing.";
                return false;
            }

            if (!form.ContainsKey("price"))
            {
                error = "'price' is missing";
                return false;
            }

            if (!uint.TryParse(form["price"], out var price))
            {
                error = "'price' is not an uint";
                return false;
            }
;
            cooking.Meal = form["meal"];
            cooking.Participants = new List<string>();
            cooking.Price = price;

            return true;
        }

        public override bool Equals(object obj)
        {
            return obj is Cooking c && c.Id == Id;
        }

        protected bool Equals(Cooking other)
        {
            return Id == other.Id;
        }

        public override int GetHashCode()
        {
            return Id != null ? Id.GetHashCode() : 0;
        }
    }
}