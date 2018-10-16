using System;
using System.Runtime.InteropServices.ComTypes;
using LiteDB;
using Microsoft.AspNetCore.Http;

namespace OsteklokkenServer
{
    public class User
    {
        [BsonId]
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public static string NewId()
        {
            return new Guid().ToString("N");
        }
        
        public static bool IsValidForm(IFormCollection form, out string username, out string password)
        {
            if (form.ContainsKey("username") && form.ContainsKey("password"))
            {
                username = form["username"][0];
                password = form["password"][0];
                return true;
            }

            username = string.Empty;
            password = string.Empty;
            return false;
        }
    }
}