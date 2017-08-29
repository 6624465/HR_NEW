using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.Leave.Controllers
{
    public class AppliedLeaveListController : Controller
    {
        // GET: Leave/AppliedLeaveList
        public ActionResult AppliedLeaveList()
        {
            return View();
        }
    }
}