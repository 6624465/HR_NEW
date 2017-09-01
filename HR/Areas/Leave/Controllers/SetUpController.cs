using HR.Controllers;
using HR.Core.Utilities;
using HR.Data;
using HR.Core.Models;
using HR.Service.Account.IAccountService;
using HR.Service.CompanyDetails.ICompany;
using HR.Service.Leave.ILeaveService;
using HR.Service.Master.IMasterService;
using HR.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using C = HR.Core.Constants;

namespace HR.Areas.Leave.Controllers
{
    public class SetUpController : BaseController
    {
        #region Public Accessors
        public ActionResult GetHolidayList(int countryId, int branchId)
        {
            JsonResult result = new JsonResult();
            if (countryId > 0 && branchId > 0)
            {
                try
                {
                    List<HolidayList> holidayList = CompanyService.GetHolidayList<HolidayList>(hl => hl.CountryId == countryId && hl.BranchID == branchId).ToList();
                    if (holidayList != null && holidayList.Any())
                        result = Json(new { success = true, holidayList = holidayList }, JsonRequestBehavior.AllowGet);
                    else
                        result = Json(new { sucess = false, holidayList = holidayList }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            return result;
        }

        public ActionResult SaveHolidayListData(HolidayList holidayList)
        {
            JsonResult result = new JsonResult();
            if (holidayList != null)
            {
                try
                {
                    HolidayList _holidayList = new HolidayList();
                    if (holidayList.Id > 0)
                    {
                        _holidayList = CompanyService.GetHolidayListById(holidayList.Id);
                        _holidayList.ModifiedBy = USER_OBJECT.UserID;
                        _holidayList.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        _holidayList.CreatedBy = USER_OBJECT.UserID;
                        _holidayList.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    _holidayList.Date = DateTimeConverter.SingaporeDateTimeConversion(holidayList.Date);
                    _holidayList.Description = holidayList.Description;
                    _holidayList.CountryId = holidayList.CountryId;
                    _holidayList.BranchID = holidayList.BranchID;

                    CompanyService.SaveHolidayList(_holidayList);

                    result = Json(new { success = true, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {

                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            return result;
        }
        public ActionResult GetBranchLocation(int branchId)
        {
            JsonResult result = null;
            try
            {
                if (branchId > 0)
                {
                    int companyId = CompanyService.GetBranchDetails<Branch>().Where(b => b.BranchID == branchId).
                                    Select(c => c.CompanyId).FirstOrDefault();
                    List<string> countryCode = CompanyService.GetBranchDetails<Branch>()
                                                .Where(b => b.CompanyId == companyId).Select(s => s.Address.CountryCode).ToList();
                    List<Country> countries = CompanyService.GetCountries<Country>().Where(c => countryCode.Contains(c.CountryCode)).ToList();
                    result = Json(new { success = true, BranchLocations = countries }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }
        #endregion

        public ActionResult HolidayList()
        {
            return View();
        }
    }
}