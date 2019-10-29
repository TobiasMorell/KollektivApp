using System.Globalization;
using System.Net;
using System.Threading.Tasks;
using Red;

namespace OsteklokkenServer
{
    public static class Utils
    {
        public static bool CompareNames(string name1, string name2)
        {
            var formattedName1 = name1.ToLower().Trim();
            var formattedName2 = name2.ToLower().Trim();
            return formattedName1 == formattedName2;
        }
        
        public static async Task<HandlerType> Authed(Request req, Response res)
        {
            if (req.GetData<OsteSession>() == null)
                return await res.SendStatus(HttpStatusCode.Unauthorized);
            return HandlerType.Continue;
        }
        
        public static DateTimeFormatInfo DateTimeFormat = new CultureInfo( "da-DK" ).DateTimeFormat;

    }
}