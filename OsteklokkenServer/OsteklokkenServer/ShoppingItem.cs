using System;
using LiteDB;

namespace OsteklokkenServer
{
    public class ShoppingItem
    {
        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public bool Active { get; set; }
    }
}