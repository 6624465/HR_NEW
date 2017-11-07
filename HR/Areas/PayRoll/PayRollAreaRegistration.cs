using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.PayRoll
{
    public class PayRollAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "PayRoll";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "PayRoll_default",
                "PayRoll/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}