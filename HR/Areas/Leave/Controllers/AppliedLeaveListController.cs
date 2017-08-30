using HR.Controllers;
using HR.Core.Models;
using HR.Service.Account.IAccountService;
using HR.Service.CompanyDetails.ICompany;
using HR.Service.Leave.ILeaveService;
using HR.Service.Master.IMasterService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Areas.Leave.Controllers
{
    public class AppliedLeaveListController : BaseController
    {

        public AppliedLeaveListController(ILogInLogOutService LogInLogOutService, ILookUpCodeService LookUpCodeService,
           ICompanyService CompanyService, ILeave LeaveService) :
            base(LogInLogOutService, LookUpCodeService, CompanyService, LeaveService)
        {
        }

        public JsonResult GetAppliedLeaveList(int teamLeadId)
        {
            JsonResult result = null;
            if (teamLeadId > 0)
            {
                try
                {
                  List<EmployeeLeaveList> employeeLeaveList = Leaveservice.GetEmployeeLeaveList<EmployeeLeaveList>(e => e.TeamLeadId == teamLeadId).ToList();
                    if (employeeLeaveList != null && employeeLeaveList.Any())
                        result = Json(new { employeeLeaveList = employeeLeaveList, sucess = true }, JsonRequestBehavior.AllowGet);
                    else
                        result = Json(new { sucess = false, message = "No Data Found." }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {

                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return result; 
        }
        public ActionResult AppliedLeaveList()
        {
            return View();
        }
    }
}