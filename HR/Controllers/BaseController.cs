using HR.Data.Account;
using HR.Service.Account.IAccountService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using C = HR.Core.Constants;
using System.Web.Mvc;
using HR.Service.Master.IMasterService;
using HR.Service.CompanyDetails.ICompany;
using HR.Data;
using HR.ViewModels;
using HR.Core.Utilities;
using HR.Service.Leave.ILeaveService;
using HR.Service.Leave.LeaveService;
using HR.Core.Models;
using Ninject;
using HR.Service.EmployeeProfile.IEmployeeProfile;
using HR.Service.Roles.IRoleService;
using HR.Service.Securables.ISecurableService;

namespace HR.Controllers
{
    public class BaseController : Controller
    {
        #region Properties
        [Inject]
        public ILogInLogOutService LogInLogOutService { get; set; }
        [Inject]
        public ILookUpCodeService LookUpCodeService { get; set; }
        [Inject]
        public ICompanyService CompanyService { get; set; }
        [Inject]
        public ILeave Leaveservice { get; set; }
        [Inject]
        public IEmployeeProfileService EmployeeProfileService { get; set; }
        [Inject]
        public IRoleRightService RoleRightService { get; set; }
        [Inject]
        public ISecurableServices SecurableServices { get; set; }
        #endregion

        public SessionObject USER_OBJECT
        {
            get
            {
                return (SessionObject)System.Web.HttpContext.Current.Session[C.SSN_USER_OBJECT];
            }
            set
            {
                Session[C.SSN_USER_OBJECT] = value;
            }
        }
        public Address GetAddress(AddressViewModel addressViewModel, Address address, bool isFromCompany = true)
        {
            if (address == null)
                address = new Address();

            Country country = CompanyService.GetCountries<Country>(c => c.Id == addressViewModel.CountryId).FirstOrDefault();
            address.Address1 = !string.IsNullOrWhiteSpace(addressViewModel.Address1) ? addressViewModel.Address1 : string.Empty;
            address.Address2 = !string.IsNullOrWhiteSpace(addressViewModel.Address2) ? addressViewModel.Address2 : string.Empty;
            address.Address3 = !string.IsNullOrWhiteSpace(addressViewModel.Address3) ? addressViewModel.Address3 : string.Empty;
            address.Address4 = !string.IsNullOrWhiteSpace(addressViewModel.Address4) ? addressViewModel.Address4 : string.Empty;
            address.AddressLinkID = !string.IsNullOrWhiteSpace(addressViewModel.AddressLinkID) ? addressViewModel.AddressLinkID : string.Empty;
            address.SeqNo = 0;
            address.CityName = !string.IsNullOrWhiteSpace(addressViewModel.CityName) ? addressViewModel.CityName : string.Empty;
            address.StateName = !string.IsNullOrWhiteSpace(addressViewModel.StateName) ? addressViewModel.StateName : string.Empty;
            address.CountryCode = (country != null && country.Id > 0) ? country.CountryCode : string.Empty;
            address.ZipCode = !string.IsNullOrWhiteSpace(addressViewModel.ZipCode) ? addressViewModel.ZipCode : string.Empty;
            address.TelNo = !string.IsNullOrWhiteSpace(addressViewModel.TelNo) ? addressViewModel.TelNo : string.Empty;
            address.FaxNo = !string.IsNullOrWhiteSpace(addressViewModel.FaxNo) ? addressViewModel.FaxNo : string.Empty;
            address.MobileNo = !string.IsNullOrWhiteSpace(addressViewModel.MobileNo) ? addressViewModel.MobileNo : string.Empty;
            address.Contact = !string.IsNullOrWhiteSpace(addressViewModel.Contact) ? addressViewModel.Contact : string.Empty;
            address.Email = !string.IsNullOrWhiteSpace(addressViewModel.Email) ? addressViewModel.Email : string.Empty;
            address.WebSite = !string.IsNullOrWhiteSpace(addressViewModel.WebSite) ? addressViewModel.WebSite : string.Empty;
            address.IsActive = addressViewModel.IsActive;
            address.AddressType = isFromCompany ? "Company" : "Branch";
            if (addressViewModel.AddressID == 0)
            {
                address.CreatedBy = USER_OBJECT.UserName;
                address.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                address.ModifiedBy = string.Empty;
            }
            else
            {
                address.ModifiedBy = USER_OBJECT.UserName;
                address.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }

            return address;
        }
    }
}