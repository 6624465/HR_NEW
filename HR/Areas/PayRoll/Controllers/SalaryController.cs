using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.PayRoll.Controllers
{
    public class SalaryController : Controller
    {
        // GET: PayRoll/Salary
        public ActionResult Salary()
        {
            return View();
        }

        public ActionResult PayRoll()
        {
            return View();
        }
    }
}