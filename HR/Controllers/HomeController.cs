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
                List<EmployeeHeader> EmployeeHeader = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>().ToList();

                var regionWiseEmployees = EmployeeHeader.GroupBy(g => g.Address.Select(s => s.CountryCode).FirstOrDefault()).ToList()
                                         .Select(n => new
                                         {
                                             y = n.Count(),
                                             name = CompanyService.GetCountries<Country>(c => c.CountryCode == n.Key).Select(c => c.CountryName).FirstOrDefault()
                                         });

                //var designationWiseEmployees = EmployeeHeader.Select(g => g.EmployeeWorkDetail).GroupBy(g => g.Select(s => s.DesignationId.Value).FirstOrDefault()).ToList()
                //                                .Select(n => new
                //                                {
                //                                    y = n.Count(),
                //                                    name = n.Key > 0? LookUpCodeService.GetLookUpType(n.Key).LookUpCode:string.Empty
                //                                });

                var genderWiseEmployees = EmployeeHeader.GroupBy(g => g.EmployeePersonalInfo.Select(s=>s.Gender).FirstOrDefault()).ToList()
                                          .Select(n => new
                                          {
                                              y = n.Count(),
                                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                                          });
                //var countryWiseGender = (from t in EmployeeHeader
                //                         group t by new { t.Address.CountryCode, t.EmployeePersonalInfo.Gender } into grp
                //                         select new
                //                         {

                //                             Male = grp.Key.Gender == 0 ? "Male" : "",
                //                             FeMale = grp.Key.Gender == 1 ? "FeMale" : "",
                //                             Country = grp.Key.CountryCode,
                //                         }).ToList();
                //var countryWiseGender = EmployeeHeader.GroupBy(g => g.Address.CountryCode && g.EmployeePersonalInfo.Gender).ToList();

                result = Json(new { sucess = true, regionWiseEmployees = regionWiseEmployees, genderWiseEmployees= genderWiseEmployees }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                result = Json(new { sucess = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }
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