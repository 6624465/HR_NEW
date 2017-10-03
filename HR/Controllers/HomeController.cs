using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MasterData()
        {
            return View();
        }
        public ActionResult AdministrationData()
        {
            return View();
        }

        public ActionResult AdministrationPage()
        {
            return View();
        }
        public ActionResult MasterList()
        {
            return View();
        }

        public ActionResult EmployeeDepartment()
        {
            return View();
        }



    }
}