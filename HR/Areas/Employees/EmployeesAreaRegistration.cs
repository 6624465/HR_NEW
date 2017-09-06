using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.Employees
{
    public class EmployeesAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Employees";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Employees_default",
                "Employees/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}