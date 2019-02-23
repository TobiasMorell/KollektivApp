using System;
using LiteDB;

namespace OsteklokkenServer
{
    public class KollexiconRule
    {
        [BsonId] public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public KollexiconRule()
        {
            Id = Guid.NewGuid().ToString("N");
        }
    }
}