using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.Employees.Controllers
{
    public class EmployeeProfileController : Controller
    {
        // GET: Employee/EmployeeProfile
        public ActionResult EmployeeProfile()
        {
            return View("~/Areas/Employees/Views/EmployeeProfile/EmployeeProfile.cshtml");
        }
    }
}