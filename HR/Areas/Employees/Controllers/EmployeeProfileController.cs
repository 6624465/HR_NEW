using HR.Controllers;
using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HR.Core.Utilities;

namespace HR.Areas.Employees.Controllers
{
    public class EmployeeProfileController : BaseController
    {

        public JsonResult SaveEmlployee(EmployeePersonalInfo employeePersonalInfo)
        {
            JsonResult result = new JsonResult();
            if (employeePersonalInfo != null)
            {
                try
                {
                    EmployeePersonalInfo _employeePersonalInfo = new EmployeePersonalInfo();
                    if (employeePersonalInfo.Id > 0)
                    {
                        _employeePersonalInfo.ModifiedBy = USER_OBJECT.UserName;
                        _employeePersonalInfo.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        _employeePersonalInfo.CreatedBy = USER_OBJECT.UserName;
                        _employeePersonalInfo.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    _employeePersonalInfo.EmployeeName = employeePersonalInfo.EmployeeName;
                    _employeePersonalInfo.DOB = employeePersonalInfo.DOB;
                    _employeePersonalInfo.Gender = employeePersonalInfo.Gender;
                    _employeePersonalInfo.BirthCountry = employeePersonalInfo.BirthCountry;
                    _employeePersonalInfo.CitizenshipCountry = employeePersonalInfo.CitizenshipCountry;
                    _employeePersonalInfo.FatherName = employeePersonalInfo.FatherName;
                    _employeePersonalInfo.MaritalStatus = employeePersonalInfo.MaritalStatus;
                    _employeePersonalInfo.SpouseName = employeePersonalInfo.SpouseName;
                    _employeePersonalInfo.MarriageDate = employeePersonalInfo.MarriageDate;
                    _employeePersonalInfo.ResidentialStatus = employeePersonalInfo.ResidentialStatus;
                    EmployeeProfileService.SaveEmployeeProfile(employeePersonalInfo);
                    result = Json(new { sucess = true, message = "Sent successfully" }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return result;
        }
        // GET: Employee/EmployeeProfile
        public ActionResult EmployeeProfile()
        {
            return View();
        }
    }
}