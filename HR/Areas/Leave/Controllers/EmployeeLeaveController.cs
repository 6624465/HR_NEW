using HR.Controllers;
using HR.Core;
using HR.Core.Models;
using HR.Core.Utilities;
using HR.Service.Account.IAccountService;
using HR.Service.CompanyDetails.ICompany;
using HR.Service.Leave.ILeaveService;
using HR.Service.Master.IMasterService;
using Ninject;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using C = HR.Core.Constants;

namespace HR.Areas.Leave.Controllers
{
    public class EmployeeLeaveController : BaseController
    {
        public ActionResult GetEmployeeList(string employeeName)
        {
            JsonResult jsonResult = new JsonResult();
            if (!string.IsNullOrWhiteSpace(employeeName))
            {
                try
                {

                    List<EmployeeHeader> employees = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>(e => e.FirstName.ToLower().Contains(employeeName.ToLower())).ToList();
                    jsonResult = Json(new { sucess = true, employees = employees }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {

                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return jsonResult;
        }

        public JsonResult SaveEmployeeLeaveForm(EmployeeLeaveList employeeLeaveList)
        {
            JsonResult result = new JsonResult();

            if (employeeLeaveList != null)
            {
                try
                {
                    EmployeeLeaveList _employeeLeaveList = new EmployeeLeaveList();
                    if (employeeLeaveList.Id > 0)
                    {
                        _employeeLeaveList = Leaveservice.GetLeaveListById(employeeLeaveList.Id);
                        //_employeeLeaveList.ModifiedBy = USER_OBJECT.UserName;
                        _employeeLeaveList.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);

                    }
                    else
                    {
                        //_employeeLeaveList.CreatedBy = USER_OBJECT.UserName;
                        _employeeLeaveList.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        _employeeLeaveList.ApplyDate = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    _employeeLeaveList.EmployeeId = employeeLeaveList.EmployeeId;
                    _employeeLeaveList.FromDate = employeeLeaveList.FromDate;
                    _employeeLeaveList.ToDate = employeeLeaveList.ToDate;
                    _employeeLeaveList.Days = employeeLeaveList.Days;
                    _employeeLeaveList.Reason = employeeLeaveList.Reason;
                    _employeeLeaveList.Remarks = employeeLeaveList.Remarks;
                    _employeeLeaveList.LeaveTypeId = employeeLeaveList.LeaveTypeId;
                    _employeeLeaveList.Status = employeeLeaveList.Status;
                    _employeeLeaveList.TeamLeadId = 6674;
                    Leaveservice.SaveLeaveList(_employeeLeaveList);

                    result = Json(new { sucess = true, message = "Sent successfully" }, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            else
                result = Json(new { sucess = false, message = "No Data Found" }, JsonRequestBehavior.AllowGet);

            return result;
        }
        public ActionResult EmployeeLeave()
        {
            return View();
        }
        public JsonResult GetCasualHolidayListCount(DateTime fromDate, DateTime toDate)
        {
            JsonResult result = null;
            try
            {
                if (USER_OBJECT != null)
                {

                    Branch branch = CompanyService.GetBranch(USER_OBJECT.BranchId);
                    Country country = branch != null ? CompanyService.GetCountries<Country>(c => c.CountryCode == branch.Address.CountryCode).FirstOrDefault() : null;
                    var holidayLists = (country != null && branch != null) ? CompanyService.GetHolidayList<HolidayList>(h => h.CountryId == country.Id && h.BranchID == branch.BranchID).AsEnumerable()
                                        .Select(x => new
                                        {
                                            Date = x.Date.ToShortDateString()
                                        }).ToList() : null;
                    int holidayListCount = holidayLists != null ? holidayLists.Where(d => string.Compare(d.Date, fromDate.ToShortDateString()) >= 0 && string.Compare(d.Date, toDate.ToShortDateString()) <= 0).Count() : 0;

                    result = Json(holidayListCount, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);

            }
            return result;
        }
    }
}