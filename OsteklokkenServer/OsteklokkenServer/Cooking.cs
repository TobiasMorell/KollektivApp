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
        public int Week { get; set; }

        public DayOfWeek Day { get; set; }
        
        public List<string> Participants { get; set; }

        public static bool TryParseForm(IFormCollection form, out Cooking cooking, out string error, bool doFullValidation = false)
        {
            cooking = null;
            error = "";
            if (!form.ContainsKey("week"))
            {
                error = "'week' is missing";
                return false;
            }
            if (!int.TryParse(form["week"], out var week))
            {
                error = "'week' must be an int";
                return false;
            }
            cooking = new Cooking()
            {
                Week = week,
            };
            if (!doFullValidation) return true;
            
            if (!form.ContainsKey("meal"))
            {
                error = "'meal' is missing.";
                return false;
            }
            if (!Enum.TryParse<DayOfWeek>(form["weekday"], out var day))
            {
                error = "The value of 'weekday' was not valid: " + form["weekday"];
                return false;
            }
;
            cooking.Meal = form["meal"];
            cooking.Day = day;
            cooking.Participants = new List<string>();

            return true;
        }
    }
}