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
        public string Name { get; set; }

        public static string NewId()
        {
            return new Guid().ToString("N");
        }
        
        public static bool IsValidForm(IFormCollection form)
        {
            if (form.ContainsKey("username") && form.ContainsKey("password") && form.ContainsKey("registrant") &&
                !string.IsNullOrWhiteSpace(form["username"][0]) && 
                !string.IsNullOrWhiteSpace(form["password"][0]) && 
                !string.IsNullOrWhiteSpace(form["registrant"][0]))
            {
                return true;
            }

            return false;
        }
    }
}