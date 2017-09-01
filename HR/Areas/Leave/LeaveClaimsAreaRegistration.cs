using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.Login
{
    public class LeaveClaimsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Leave";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "LeaveClaims_default",
                "LeaveClaims/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}