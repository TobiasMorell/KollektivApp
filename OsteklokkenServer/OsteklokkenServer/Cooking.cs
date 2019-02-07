using LiteDB;

namespace OsteklokkenServer
{
    public class Cooking
    {
        public string Chef { get; set; }
        public string Meal { get; set; }
        [BsonId]
        public int Week { get; set; }
    }
}