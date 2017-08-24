using HR.Controllers;
using HR.Core.Utilities;
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

namespace HR.Areas.Company.Controllers
{
    public class CompanyController : BaseController
    {
        public CompanyController(ILogInLogOutService LogInLogOutService, ILookUpCodeService LookUpCodeService,
            ICompanyService CompanyService, ILeave LeaveService) : base(LogInLogOutService, LookUpCodeService, CompanyService, LeaveService)
        {

        }
        #region public methods

        #region GetCompanyDetails
        public JsonResult GetCopmanyDetails()
        {
            JsonResult result = null;
            try
            {
              List<HR.Core.Models.Company> Companies= CompanyService.GetCompanyDetails<HR.Core.Models.Company>().ToList();
                List<CompanyViewModel> companyViewModelList = new List<CompanyViewModel>();
                foreach (var company in Companies)
                {
                    CompanyViewModel companyViewModel = new CompanyViewModel();
                    Country country = CompanyService.GetCountries<Country>(c => c.CountryCode == company.Address.CountryCode).FirstOrDefault();
                    companyViewModel.Id = company.Id;
                    companyViewModel.CompanyCode = company.CompanyCode;
                    companyViewModel.CompanyName = company.CompanyName;
                    companyViewModel.Logo = company.Logo;
                    companyViewModel.IsActive = company.IsActive;
                    companyViewModel.RegNo = company.RegNo;
                    companyViewModel.Address = BindAddressViewModel(company.Address, country);
                    companyViewModel.Branches = new List<BranchViewModel>();
                    foreach (var branch in company.Branches)
                    {
                        BranchViewModel branchViewModel = new BranchViewModel();
                        branchViewModel.BranchID = branch.BranchID;
                        branchViewModel.CompanyId = company.Id;
                        branchViewModel.CompanyCode = branch.CompanyCode;
                        branchViewModel.BranchCode = branch.BranchCode;
                        branchViewModel.BranchName = branch.BranchName;
                        branchViewModel.IsActive = branch.IsActive;
                        branchViewModel.Address = BindAddressViewModel(branch.Address, country);
                        companyViewModel.Branches.Add(branchViewModel);
                    }
                    companyViewModelList.Add(companyViewModel);
                } 
                if (Companies != null)
                    result = Json(new { success = true, CompaniesList = companyViewModelList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                result = Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }
        #endregion

        #region Save Company
        public JsonResult SaveCompany(CompanyViewModel companyViewModel)
        {
            JsonResult result = null;
            if (companyViewModel != null)
            {
                try
                {
                    HR.Core.Models.Company company = new HR.Core.Models.Company();
                    if (companyViewModel.Id > 0)
                    {
                        company = CompanyService.GetCompany(companyViewModel.Id);
                        //company.Address = MasterService.GetAddress(company.AddressID);
                        company.ModifiedBy = USER_OBJECT.UserName;
                        company.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        company.CreatedBy = USER_OBJECT.UserName;
                        company.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        company.ModifiedOn = null;
                    }

                    company.CompanyCode = !string.IsNullOrWhiteSpace(companyViewModel.CompanyCode) ? companyViewModel.CompanyCode : string.Empty;
                    company.CompanyName = !string.IsNullOrWhiteSpace(companyViewModel.CompanyName) ? companyViewModel.CompanyName : string.Empty;
                    company.IsActive = companyViewModel.IsActive;
                    company.RegNo = companyViewModel.RegNo;
                    company.Address = companyViewModel.Address.AddressID == 0 ? new Address() : company.Address;
                    company.Address = GetAddress(companyViewModel.Address, company.Address, true);

                    CompanyService.SaveCompanyDetails(company);

                    result = Json(new { success = true, message = "Saved Successfully.", JsonRequestBehavior.AllowGet });
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            return result;
        }
        #endregion

        public JsonResult SaveBranch(BranchViewModel branchViewModel)
        {
            JsonResult result = null;
            if (branchViewModel != null)
            {
                try
                {
                    Branch branch = new Branch();
                    if (branchViewModel.BranchID > 0)
                    {
                        branch = CompanyService.GetBranch(branchViewModel.BranchID);
                        //company.Address = MasterService.GetAddress(company.AddressID);
                        branch.ModifiedBy = USER_OBJECT.UserName;
                        branch.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        branch.CreatedBy = USER_OBJECT.UserName;
                        branch.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        branch.ModifiedOn = null;
                    }

                    branch.CompanyCode = !string.IsNullOrWhiteSpace(branchViewModel.CompanyCode) ? branchViewModel.CompanyCode : string.Empty;
                    branch.BranchName = !string.IsNullOrWhiteSpace(branchViewModel.BranchName) ? branchViewModel.BranchName : string.Empty;
                    branch.BranchID = branchViewModel.BranchID;
                    branch.CompanyId = branchViewModel.CompanyId;
                    branch.IsActive = branchViewModel.IsActive;
                    branch.RegNo = branchViewModel.RegNo;
                    branch.Address = branchViewModel.Address.AddressID == 0 ? new Address() : branch.Address;
                    branch.Address = GetAddress(branchViewModel.Address, branch.Address, true);

                    CompanyService.SaveBranchDetails(branch);

                    result = Json(new { success = true, message = "Saved Successfully.", JsonRequestBehavior.AllowGet });
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            return result;
        }
        public JsonResult GetCountries()
        {
            JsonResult result = null;
            try
            {
                var countries = from country in CompanyService.GetCountries<Country>()
                              select new CountryViewModel
                              {
                                  Id = country.Id,
                                  CountryCode=country.CountryCode,
                                  CountryName=country.CountryName
                              };
                //List < Country > countries = CompanyService.GetCountries<Country>().OrderBy(c => c.CountryName).ToList();
                result = Json(new { success = true, countries = countries }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    result =  Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }

        #endregion

        #region Private Methods

        private AddressViewModel BindAddressViewModel(Address address, Country country = null)
        {
            AddressViewModel addressViewModel = new AddressViewModel();
            addressViewModel.Address1 = address.Address1;
            addressViewModel.Address2 = address.Address2;
            addressViewModel.Address3 = address.Address3;
            addressViewModel.Address4 = address.Address4;
            addressViewModel.AddressID = address.AddressId;
            addressViewModel.AddressLinkID = address.AddressLinkID;
            addressViewModel.AddressType = address.AddressType;
            addressViewModel.CityName = address.CityName;
            addressViewModel.StateName = address.StateName;
            addressViewModel.IsActive = address.IsActive;
            addressViewModel.CountryCode = country != null ? country.CountryCode :address.CountryCode;
            addressViewModel.CountryId = country != null ?  country.Id : 0;
            addressViewModel.CountryName = country != null ? country.CountryName : string.Empty;
            addressViewModel.Email = address.Email;
            addressViewModel.FaxNo = address.FaxNo;
            addressViewModel.SeqNo = address.SeqNo;
            addressViewModel.MobileNo = address.MobileNo;
            addressViewModel.Contact = address.Contact;
            addressViewModel.ZipCode = address.ZipCode;
            addressViewModel.WebSite = address.WebSite;
            addressViewModel.TelNo = address.TelNo;
            return addressViewModel;
        }
        #endregion

        #region ActionResult
        public ActionResult CompanyList()
        {
            return View();
        }

        #endregion
    }
}