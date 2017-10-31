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
                var regionWiseEmployees = EmployeeHeader.GroupBy(g => g.Branch.BranchName).ToList()
                     .Select(n => new
                     {
                         y = n.Count(),
                         name = n.Key
                     }).OrderByDescending(o => o.y);


                //var designationWiseEmployees = EmployeeHeader.Select(g => g.EmployeeWorkDetail).GroupBy(g => g.Select(s => s.DesignationId.Value).FirstOrDefault()).ToList()
                //                                .Select(n => new
                //                                {
                //                                    y = n.Count(),
                //                                    name = n.Key > 0? LookUpCodeService.GetLookUpType(n.Key).LookUpCode:string.Empty
                //                                });
                var genderWiseEmployees = EmployeeHeader.GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender).FirstOrDefault()).ToList()
                                          .Select(n => new
                                          {
                                              y = n.Count(),
                                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                                          });
                //var genderWiseEmployees = EmployeeHeader.
                //                          GroupBy(g => g.Branch.BranchName).ToList()
                //                                                .Select(n => new
                //                                                {
                //                                                    y= n.Count(),
                //                                                    name = n.Key,
                //                                                    male = n.Where(s => s.EmployeePersonalInfo.FirstOrDefault().Gender == 0).Count(),
                //                                                    female = n.Where(s => s.EmployeePersonalInfo.FirstOrDefault().Gender == 1).Count()
                //                                                }).OrderByDescending(o=>o.y);

                var indiawiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "INDIA")
                           .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                           .FirstOrDefault()).ToList()
                            .Select(n => new
                            {
                                y = n.Count(),
                                name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                            }).OrderByDescending(n => n.name);

                var singaporewiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "SINGAPORE")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);

                var hongkongwiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "HONGKONG")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);

                var mayanmarwiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "MAYANMAR")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);

                var pakistanwiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "PAKISTAN")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);

                var srilankawiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "SRILANKA")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);

                var cambodiawiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "CAMBODIA")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);

                var bangladeshwiseGenders = EmployeeHeader.Where(s => s.Branch.BranchName == "BANGLADESH")
                         .GroupBy(g => g.EmployeePersonalInfo.Select(s => s.Gender)
                         .FirstOrDefault()).ToList()
                          .Select(n => new
                          {
                              y = n.Count(),
                              name = n.Key == 0 ? "Male" : n.Key == 1 ? "Female" : ""
                          }).OrderByDescending(n => n.name);


                //var countryWiseGender = EmployeeHeader.GroupBy(g => g.Address.CountryCode && g.EmployeePersonalInfo.Gender).ToList();

                result = Json(new
                {
                    sucess = true,
                    regionWiseEmployees = regionWiseEmployees,
                    genderWiseEmployees = genderWiseEmployees,
                    indiawiseGenders = indiawiseGenders,
                    bangladeshwiseGenders = bangladeshwiseGenders,
                    cambodiawiseGenders = cambodiawiseGenders,
                    srilankawiseGenders = srilankawiseGenders,
                    pakistanwiseGenders = pakistanwiseGenders,
                    mayanmarwiseGenders = mayanmarwiseGenders,
                    hongkongwiseGenders = hongkongwiseGenders,
                    singaporewiseGenders = singaporewiseGenders
                }, JsonRequestBehavior.AllowGet);

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