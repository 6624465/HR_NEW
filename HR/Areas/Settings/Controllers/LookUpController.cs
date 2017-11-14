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
using System.Linq.Expressions;

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

                    var dataList = (from eType in LookUpCodeService.GetLookUp<LookUp>(et => et.LookUpCategory == dt.LookUpCategory)
                                   select new
                                   {
                                       LookUpID = eType.LookUpID,
                                       LookUpCode = eType.LookUpCode,
                                       LookUpDescription = eType.LookUpDescription,
                                       IsActive = eType.IsActive
                                   }).Distinct();
                    var data = dataList.Select(x => new SortingViewModel()
                    {
                        employeeDescription = x.LookUpDescription,
                        employeeDesignation = x.LookUpCode,
                        IsActive=x.IsActive,
                        LookUpID=x.LookUpID
                    }).AsQueryable();


                    int totalCount = dataList.Count();


                    dt.sortType = dt.sortType ?? "asc";
                    dt.sortColumn = dt.sortColumn ?? "employeeDescription";

                    if (dt.sortType.ToLower() == "asc")
                        data = OrderBy(data, dt.sortColumn, false, false);
                    else
                        data = OrderBy(data, dt.sortColumn, true, false);
                    var lookups = data.Skip(dt.offset).Take(dt.limit).AsQueryable();
                    if (lookups.Any() && lookups != null)
                        result = Json(new { success = true, lookUpLists = lookups, total_count = totalCount, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
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

        public IOrderedQueryable<SortingViewModel> OrderBy(IQueryable<SortingViewModel> source, string propertyName, bool descending, bool anotherLevel)
        {
            try
            {
                ParameterExpression param = Expression.Parameter(typeof(SortingViewModel), string.Empty);
                MemberExpression property = Expression.PropertyOrField(param, propertyName);
                LambdaExpression sort = Expression.Lambda(property, param);
                MethodCallExpression call = Expression.Call(
                    typeof(Queryable),
                    (!anotherLevel ? "OrderBy" : "ThenBy") + (descending ? "Descending" : string.Empty),
                    new[] { typeof(SortingViewModel), property.Type },
                    source.Expression,
                    Expression.Quote(sort));
                return (IOrderedQueryable<SortingViewModel>)source.Provider.CreateQuery<SortingViewModel>(call);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
