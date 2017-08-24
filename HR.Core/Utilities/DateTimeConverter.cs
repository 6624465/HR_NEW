using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace HR.Core.Utilities
{
    public static class DateTimeConverter
    {
        public static DateTime ThaiDateTimeConversion(DateTime dateTime)
        {
            string timeZoneKey = ConfigurationManager.AppSettings.Get("ThaiTimeZoneKey");//"SE Asia Standard Time";
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZoneKey);
            return TimeZoneInfo.ConvertTimeFromUtc(dateTime, timeZoneInfo);
        }

        public static DateTime SingaporeDateTimeConversion(DateTime dateTime)
        {
            string timeZoneKey = ConfigurationManager.AppSettings.Get("SingaporeTimeZoneKey");//Singapore Standard Time
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZoneKey);
            DateTime convertedDateTime = DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
            return TimeZoneInfo.ConvertTimeFromUtc(convertedDateTime, timeZoneInfo);
        }

    }
}
