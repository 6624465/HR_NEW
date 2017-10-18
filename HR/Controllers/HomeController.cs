using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HR.Controllers
{
    public class HomeController : BaseController
    {
        #region DashBoard
        public JsonResult GetRegionWiseEmployees()
        {
            JsonResult result = null;
            try
            {
                var regionWiseEmployees = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>()
                        .GroupBy(g => g.Address.CountryCode).ToList()
                        .Select(n => new
                        {
                            y = n.Count(),
                            name = CompanyService.GetCountries<Country>(c => c.CountryCode == n.Key).Select(c => c.CountryName).FirstOrDefault()
                        });

                var designationWiseEmployees = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>()
                      .GroupBy(g => g.EmployeeWorkDetail.DesignationId).ToList()
                      .Select(n => new
                      {
                          y = n.Count(),
                          name = LookUpCodeService.GetLookUpType(n.Key).LookUpCode
                      });

                var genderWiseEmployees = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>()
                       .GroupBy(g => g.EmployeePersonalInfo.Gender).ToList()
                       .Select(n => new
                       {
                           y = n.Count(),
                           name = n.Key == 0 ? "Male" : n.Key == 1 ? "FeMale" : ""
                       });
                result = Json(new { sucess = true, regionWiseEmployees = regionWiseEmployees , designationWiseEmployees  = designationWiseEmployees , genderWiseEmployees = genderWiseEmployees }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                result = Json(new { sucess = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }

        //public JsonResult GetGenderWiseEmployees()
        //{
        //    JsonResult result = null;
        //    try
        //    {
        //        var regionWiseEmployees = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>()
        //                .GroupBy(g => g.EmployeePersonalInfo.Gender).ToList()
        //                .Select(n => new
        //                {
        //                    y = n.Count(),
        //                    name = n.Key == 0 ? "Male" : n.Key == 1 ? "FeMale" : "Other"
        //                });
        //        result = Json(new { sucess = true, regionWiseEmployees = regionWiseEmployees }, JsonRequestBehavior.AllowGet);

        //    }
        //    catch (Exception ex)
        //    {
        //        result = Json(new { sucess = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
        //    }
        //    return result;
        //}
        //public JsonResult GetDesignationWiseEmployees()
        //{
        //    JsonResult result = null;
        //    try
        //    {
        //        var regionWiseEmployees = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>()
        //                .GroupBy(g => g.EmployeeWorkDetail.DesignationId).ToList()
        //                .Select(n => new
        //                {
        //                    y = n.Count(),
        //                    name = LookUpCodeService.GetLookUpType(n.Key)
        //                });
        //        result = Json(new { sucess = true, regionWiseEmployees = regionWiseEmployees }, JsonRequestBehavior.AllowGet);

        //    }
        //    catch (Exception ex)
        //    {
        //        result = Json(new { sucess = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
        //    }
        //    return result;
        //}


        #endregion
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

        public ActionResult DashBoard()
        {
            return View();
        }



    }
}