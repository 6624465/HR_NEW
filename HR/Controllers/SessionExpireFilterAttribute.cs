using HR.Data;
using HR.Data.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using C = HR.Core.Constants;

namespace HR.Controllers
{
    public class SessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session != null)
            {

                var test = (SessionObject)System.Web.HttpContext.Current.Session[C.SSN_USER_OBJECT];
                if (test == null)
                {

                    //filterContext.Result = new RedirectResult("~/Account/Login");
                    filterContext.Result =
                   new RedirectResult("~/Account/Login/LogOut");
                    
                    return;
                }
            }
           // base.OnActionExecuting(filterContext);
        }
    }
}