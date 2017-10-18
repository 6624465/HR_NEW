using HR.Controllers;
using HR.Core;
using HR.Core.Models;
using HR.Core.Utilities;
using HR.Models;
using HR.Service.GrantLeave.GrantLeaveService;
using HR.Service.GrantLeave.IGrantLeaveService;
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
    public class GrantLeaveController : BaseController
    {
        public JsonResult GetGrantLeave(int Id)
        {
            JsonResult result = null;

            try
            {
                if (Id > 0)
                {
                    LeaveHeader leaveHeader = GrantLeaveService.Get(Id);
                    result = Json(new { sucess = true, leaveHeader = leaveHeader }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
            }
            return result;
        }

        public JsonResult GetGrantLeaves()
        {
            JsonResult result = null;
            try
            {
                List<LeaveHeader> leaveHeaders = GrantLeaveService.GetAll<LeaveHeader>().ToList();
                List<LeaveHeaderViewModel> LeaveHeaderVMList = new List<LeaveHeaderViewModel>();
                List<LookUp> LeaveTypeLookUp = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpCategory == "LeaveType").ToList();
                foreach (LeaveHeader leaveHeader in leaveHeaders)
                {
                    LeaveHeaderViewModel LeaveHeaderVM = new LeaveHeaderViewModel()
                    {
                        Id = leaveHeader.Id,
                        BranchId = leaveHeader.BranchID,
                        LeaveSchemeType = leaveHeader.LeaveSchemeType,
                        LeaveSchemeTypeDescription = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpID == leaveHeader.LeaveSchemeType).Select(s=>s.LookUpCode).FirstOrDefault(),
                        LeaveYear = leaveHeader.LeaveYear,
                        LeaveYearType = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpID == leaveHeader.LeaveYear).Select(l => l.LookUpCode).FirstOrDefault(),
                        PeriodicityType = leaveHeader.PeriodicityType,
                        PeriodicityTypeDescription = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpID == leaveHeader.PeriodicityType).Select(l => l.LookUpCode).FirstOrDefault(),
                        PeriodType = leaveHeader.PeriodType,
                        PeriodTypeDescription = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpID == leaveHeader.PeriodType).Select(l => l.LookUpCode).FirstOrDefault(),
                    };
                    PrepareleavedetailsViewModel(leaveHeader, LeaveHeaderVM, LeaveTypeLookUp);
                    LeaveHeaderVMList.Add(LeaveHeaderVM);
                }
                result = Json(new { sucess = true, LeaveHeaderVMList = LeaveHeaderVMList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
            }
            return result;
        }




        public JsonResult SaveGrantLeaves(LeaveHeader LeaveHeader)
        {
            JsonResult jsonResult = new JsonResult();
            if (LeaveHeader != null)
            {
                LeaveHeader _LeaveHeader = null;
                if (LeaveHeader.Id > 0 )
                {
                    _LeaveHeader = GrantLeaveService.Get(LeaveHeader.Id);

                    _LeaveHeader.ModifiedOn = Core.Utilities.DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    _LeaveHeader.ModifiedBy = USER_OBJECT.UserName;
                }
                else
                {
                    _LeaveHeader = new LeaveHeader();
                    _LeaveHeader.CreatedBy = USER_OBJECT.UserName;
                    _LeaveHeader.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    _LeaveHeader.BranchID = LeaveHeader.BranchID;
                }
                _LeaveHeader.LeaveYear = LeaveHeader.LeaveYear;
                string leaveYear = LeaveHeader.LeaveYear > 0 ? LookUpCodeService.GetLookUpType(LeaveHeader.LeaveYear).LookUpCode : "";
                _LeaveHeader.PeriodicityType = LeaveHeader.PeriodicityType;
                _LeaveHeader.PeriodType = LeaveHeader.PeriodType;

                _LeaveHeader.StartDate = (LeaveHeader.PeriodType != 0 && LeaveHeader.PeriodType == 1108) ?
                                        DateTimeConverter.SingaporeDateTimeConversion(LeaveHeader.StartDate = new DateTime(Convert.ToInt32(leaveYear), 1, 01)) :
                                         DateTimeConverter.SingaporeDateTimeConversion(LeaveHeader.StartDate = new DateTime(Convert.ToInt32(leaveYear), 07, 01));
                if (LeaveHeader.EndDate != null)
                    _LeaveHeader.EndDate = (LeaveHeader.PeriodType != 0 && LeaveHeader.PeriodType == 1108) ?
                                        DateTimeConverter.SingaporeDateTimeConversion(LeaveHeader.EndDate = new DateTime(Convert.ToInt32(leaveYear), 06, 01)) :
                                         DateTimeConverter.SingaporeDateTimeConversion(LeaveHeader.StartDate = new DateTime(Convert.ToInt32(leaveYear), 12, 01));

                Prepareleavedetails(LeaveHeader, _LeaveHeader);

                _LeaveHeader.LeaveSchemeType = LeaveHeader.LeaveSchemeType;
                GrantLeaveService.Save(_LeaveHeader);
            }
          return jsonResult = Json(new { sucess = true, message = C.SUCCESSFUL_SAVE_MESSAGE}, JsonRequestBehavior.AllowGet);
        }

        private void Prepareleavedetails(LeaveHeader leaveHeader, LeaveHeader _leaveHeader)
        {
            if (leaveHeader.LeaveDetail != null && leaveHeader.LeaveDetail.Any())
            {
                foreach (LeaveDetail item in leaveHeader.LeaveDetail)
                {
                    LeaveDetail _leaveDetail = null;
                    if (item.Id > 0)
                    {
                        _leaveDetail = _leaveHeader.LeaveDetail.Where(i=>i.Id == item.Id).FirstOrDefault();
                        _leaveDetail.ModifiedBy = USER_OBJECT.UserName;
                        _leaveDetail.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        _leaveDetail = new LeaveDetail();
                        _leaveDetail.CreatedBy = USER_OBJECT.UserName;
                        _leaveDetail.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);

                    }
                    _leaveDetail.LeaveType = item.LeaveType;
                    _leaveDetail.TotalLeaves = item.TotalLeaves;
                    if (_leaveHeader.LeaveDetail == null)
                        _leaveHeader.LeaveDetail = new List<LeaveDetail>();
                   
                     bool isExists =  _leaveHeader.LeaveDetail.Any(s => s.LeaveType == item.LeaveType);
                    if (!isExists)
                        _leaveHeader.LeaveDetail.Add(_leaveDetail);
                }
            }
        }

        private void PrepareleavedetailsViewModel(LeaveHeader leaveHeader, LeaveHeaderViewModel leaveHeaderVM, List<LookUp> lookUp)
        {
            if (leaveHeader.LeaveDetail != null && leaveHeader.LeaveDetail.Any())
            {

                foreach (LeaveDetail leaveDetail in leaveHeader.LeaveDetail)
                {
                    LeaveDetailViewModel leaveDetailVM = new LeaveDetailViewModel()
                    {
                        Id = leaveDetail.Id,
                        IsChecked = leaveDetail.LeaveType > 0 ? true : false,
                        LeaveType = leaveDetail.LeaveType,
                        LeaveTypeDescription = lookUp.Where(s => s.LookUpID == leaveDetail.LeaveType).Select(s => s.LookUpCode).FirstOrDefault(),
                        TotalLeaves = leaveDetail.TotalLeaves,
                        LeaveHeaderId = leaveDetail.LeaveHeaderId

                    };
                    if (leaveHeaderVM.LeaveDetail == null)
                        leaveHeaderVM.LeaveDetail = new List<LeaveDetailViewModel>();

                    leaveHeaderVM.LeaveDetail.Add(leaveDetailVM);
                }
            }
        }
        public ActionResult GrantLeave()
        {
            return View();
        }
    }
}