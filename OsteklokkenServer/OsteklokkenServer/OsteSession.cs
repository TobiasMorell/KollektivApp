using Red.CookieSessions;

namespace OsteklokkenServer
{
    public class OsteSession : CookieSessionBase
    {
        public string Username { get; set; }
        public string Name { get; set; }
        
    }
}