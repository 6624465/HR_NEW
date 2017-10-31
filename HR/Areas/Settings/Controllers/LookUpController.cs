using HR.Controllers;
using HR.Core.Models;
using HR.Core.Utilities;
using HR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using C = HR.Core.Constants;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace HR.Areas.Settings.Controllers
{
    public class LookUpController : BaseController
    {
        #region GetLookUp 
        //[HttpPost]
        public JsonResult GetLookUp(string LookUpCategory)
        {
            JsonResult result = null;
            try
            {
                if (!string.IsNullOrWhiteSpace(LookUpCategory))
                {
                    var lookUp = from eType in LookUpCodeService.GetLookUp<LookUp>(et => et.LookUpCategory == LookUpCategory)
                                 select new
                                 {
                                     LookUpID = eType.LookUpID,
                                     LookUpCode = eType.LookUpCode,
                                     LookUpDescription = eType.LookUpDescription,
                                     IsActive = eType.IsActive
                                 };
                    if (lookUp.Any() && lookUp != null)
                        result = Json(new { success = true, lookUpLists = lookUp, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                    else
                        result = Json(new { success = false, message = C.NO_DATA_FOUND }, JsonRequestBehavior.AllowGet);
                }
                else
                    result = Json(new { success = false, message = C.NO_DATA_FOUND }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }

        #endregion

        public JsonResult GetActiveLookUp(string LookUpCategory)
        {
            JsonResult result = null;
            try
            {
                if (!string.IsNullOrWhiteSpace(LookUpCategory))
                {
                    var lookUp = from eType in LookUpCodeService.GetLookUp<LookUp>(et => et.LookUpCategory == LookUpCategory && et.IsActive == true)
                                 select new
                                 {
                                     LookUpID = eType.LookUpID,
                                     LookUpCode = eType.LookUpCode,
                                     LookUpDescription = eType.LookUpDescription,
                                     IsActive = eType.IsActive
                                 };
                    if (lookUp.Any() && lookUp != null)
                        result = Json(new { success = true, lookUpLists = lookUp, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                    else
                        result = Json(new { success = false, message = C.NO_DATA_FOUND }, JsonRequestBehavior.AllowGet);
                }
                else
                    result = Json(new { success = false, message = C.NO_DATA_FOUND }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }


        #region SaveLookUp
        public JsonResult SaveLookUp(LookUp lookUpViewModel)
        {
            JsonResult result = null;
            try
            {
                if (lookUpViewModel != null)
                {
                    LookUp lookUp = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpID == lookUpViewModel.LookUpID).FirstOrDefault();
                    if (lookUp != null)
                    {
                        lookUp.ModifiedBy = USER_OBJECT.UserID;
                        lookUp.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        lookUp = new LookUp();
                        lookUp.CreatedBy = USER_OBJECT.UserID;
                        lookUp.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        lookUp.ModifiedOn = null;
                    }

                    lookUp.LookUpCode = lookUpViewModel.LookUpCode;
                    lookUp.LookUpDescription = lookUpViewModel.LookUpDescription;
                    lookUp.IsActive = lookUpViewModel.IsActive;
                    lookUp.LookUpCategory = lookUpViewModel.LookUpCategory;
                    LookUpCodeService.Save(lookUp);

                    result = Json(new { success = true, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                result = Json(new { success = true, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }

        #endregion
        #region Action Result
        public ActionResult EmployeeType()
        {
            return View();
        }
        public ActionResult EmployeeDesignation()
        {
            return View();
        }

        public ActionResult EmployeeDepartment()
        {
            return View();
        }

        public ActionResult PaymentType()
        {
            return View();
        }
        public ActionResult LeaveType()
        {
            return View();
        }

        public ActionResult EmployeeStatus()
        {
            return View();
        }

        #endregion
        #region GetTableData 
        public JsonResult GetTableData(DTwithlimit dt)
        {
            JsonResult result = null;
            try
            {
              
                if (!string.IsNullOrWhiteSpace(dt.LookUpCategory))
                {

                    var lookUp = from eType in LookUpCodeService.GetLookUp<LookUp>(et => et.LookUpCategory ==dt.LookUpCategory)
                                 select new
                                 {
                                     LookUpID = eType.LookUpID,
                                     LookUpCode = eType.LookUpCode,
                                     LookUpDescription = eType.LookUpDescription,
                                     IsActive = eType.IsActive
                                 };
                    int totalCount = lookUp.Count();
                    var lookups = lookUp.OrderByDescending(x=>x.LookUpID).Skip(dt.offset).Take(dt.limit);
                    if (lookUp.Any() && lookUp != null)
                        result = Json(new { success = true, lookUpLists = lookups,total_count= totalCount, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                    else
                        result = Json(new { success = false, message = C.NO_DATA_FOUND }, JsonRequestBehavior.AllowGet);
                }
                else
                    result = Json(new { success = false, message = C.NO_DATA_FOUND }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }
        #endregion 
    }
}
