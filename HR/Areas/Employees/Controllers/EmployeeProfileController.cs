using HR.Controllers;
using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HR.Core.Utilities;
using C = HR.Core.Constants;
using HR.Models;
using System.Linq.Expressions;
using System.Text;
using HR.Core;
using System.IO;
using Newtonsoft.Json;
using System.Web.Hosting;

namespace HR.Areas.Employees.Controllers
{
    public class EmployeeProfileController : BaseController
    {
        #region Public Accessors

        #region Get
        public JsonResult GetEmployeeDetails(SearchViewModel searchViewModel)
        {
            JsonResult jsonResult = new JsonResult();
            try
            {
                List<EmployeeHeader> employeeHeader =  EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>().ToList();
                List<EmployeeViewModel> employeeViewModelList = new List<EmployeeViewModel>();
                foreach (var item in employeeHeader)
                {
                    EmployeeViewModel employeeViewModel = new EmployeeViewModel()
                    {
                        Id = item.Id,
                        EmployeeName = item.FirstName,
                        JoiningDate = item.EmployeeWorkDetail != null ? item.EmployeeWorkDetail.JoiningDate.Value : DateTime.Now,
                        MobileNo = item.Address.MobileNo,
                        Email = item.Address.Email,
                        EmployeeId = item.IDNumber,
                        CountryCode = item.Address.CountryCode,
                        Designation = item.EmployeeWorkDetail != null ? item.EmployeeWorkDetail.DesignationId : 0,
                        DesignationName = (LookUpCodeService.GetLookUpType(item.EmployeeWorkDetail.DesignationId)).LookUpDescription,
                        EmployeeType = item.IDType
                    };
                    employeeViewModelList.Add(employeeViewModel);
                }


                var employees = employeeViewModelList.AsQueryable();

                if (searchViewModel.FilterViewModel != null)
                {
                    foreach (FilterViewModel item in searchViewModel.FilterViewModel)
                    {
                        employees = ApplyWhere(item, employees);
                    }
                }
                if (!string.IsNullOrWhiteSpace(searchViewModel.sortType))
                {
                    if (searchViewModel.sortType.ToLower() == "asc")
                        employees = OrderBy(employees, searchViewModel.sortColumn, false, false);
                    else
                        employees = OrderBy(employees, searchViewModel.sortColumn, false, false);
                }

                employees = employees.Take(searchViewModel.limit);

                jsonResult = Json(new { sucess = true, employees = employees, total_count = employees.Count() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
            }
            return jsonResult;
        }
        public JsonResult GetEmployeeById(int employeeId, bool IsfromIndividualEmployee)
        {
            JsonResult result = null;
            try
            {
                EmployeeHeader employeeHeader = null;
                string imagePathName = string.Empty;
                LookUpDescriptions lookUpDescriptions = null;
                if (!IsfromIndividualEmployee)
                    employeeHeader = EmployeeProfileService.GetEmployeeProfileDetailsById(employeeId);
                else if (employeeId == 0)
                {
                    employeeHeader = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>(e => e.UserId == USER_OBJECT.Id).FirstOrDefault();
                    EmployeeDocument employeeDocument = EmployeeProfileService.GetEmployeeDocuments<EmployeeDocument>(ed => ed.EmployeeHeaderId == employeeHeader.Id).FirstOrDefault();
                    if (employeeDocument != null)
                        imagePathName = employeeDocument.FileName;
                    lookUpDescriptions = new LookUpDescriptions()
                    {
                        MarriedStatus = LookUpCodeService.GetLookUpType(employeeHeader.EmployeePersonalInfo.MaritalStatus).LookUpCode,
                        Country = CompanyService.GetCountries<Country>(c => c.CountryCode == employeeHeader.Address.CountryCode).FirstOrDefault().CountryName,
                        Nationality = CompanyService.GetCountries<Country>(c => c.CountryCode == employeeHeader.Nationality).FirstOrDefault().CountryName,
                        Designation = LookUpCodeService.GetLookUpType(employeeHeader.EmployeeWorkDetail.DesignationId).LookUpCode,
                        Department = LookUpCodeService.GetLookUpType(employeeHeader.EmployeeWorkDetail.DepartmentId).LookUpCode,
                    };
                }
                result = Json(new { employeeHeader = employeeHeader, imagePathName = imagePathName, LookUpDescriptions = lookUpDescriptions }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
            }

            return result;
        }
        #endregion

        #region Save
        public JsonResult SaveEmlployee()
        {
            EmployeeHeader employeeHeader = JsonConvert.DeserializeObject<EmployeeHeader>(System.Web.HttpContext.Current.Request["EmployeeDetails"]);
            HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            JsonResult result = new JsonResult();
            if (employeeHeader != null)
            {
                try
                {
                    EmployeeHeader _employeeHeader = new EmployeeHeader();
                    _employeeHeader = PrepareEmployeeHeader(employeeHeader);

                    EmployeeProfileService.SaveEmployeeProfile(_employeeHeader);

                    PrepareEmail(_employeeHeader);

                    result = Json(new { sucess = true, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return result;
        }
        #endregion

        #region SaveIndividual

        public JsonResult SaveEmployeeHeader(EmployeeHeader employeeHeader)
        {
            JsonResult result = null;
            if (employeeHeader != null)
            {
                try
                {
                    if (employeeHeader.Id > 0)
                    {
                        EmployeeHeader _employeeHeader = employeeHeader;
                        _employeeHeader.ModifiedBy = USER_OBJECT.UserID;
                        _employeeHeader.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        _employeeHeader.FirstName = employeeHeader.FirstName;
                        _employeeHeader.MiddleName = employeeHeader.MiddleName;
                        _employeeHeader.LastName = employeeHeader.LastName;
                        _employeeHeader.EmployeePersonalInfo = PrepareEmployeePersonalInfo(employeeHeader.EmployeePersonalInfo, employeeHeader);

                        _employeeHeader.Nationality = employeeHeader.Nationality;
                        EmployeeProfileService.SaveEmployeeProfile(_employeeHeader);
                        result = Json(new { sucess = true, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return result;
        }

        public JsonResult SaveAddressDetails(Address address)
        {
            JsonResult result = null;
            if (address != null)
            {
                try
                {
                    if (address.AddressId > 0)
                    {
                        Address _address = PrepareEmployeeAddress(address, null);
                        LookUpCodeService.Save(address);
                        result = Json(new { sucess = true, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return result;
        }

        public JsonResult SaveEmployeeUser(User EmployeeUser, Int32 employeeId)
        {
            JsonResult result = null;
            if (EmployeeUser != null)
            {
                try
                {
                    if (EmployeeUser.Id > 0)
                    {
                        User _user = EmployeeUser;


                        EmployeeHeader _employeeHeader = EmployeeProfileService.GetEmployeeProfileDetailsById(employeeId);
                        _user.ModifiedOn = _employeeHeader.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        _user.ModifiedBy = _employeeHeader.ModifiedBy = USER_OBJECT.UserID;
                        _user.UserName = _employeeHeader.UserEmailId = EmployeeUser.UserName;
                        _user.Password = _employeeHeader.Password = _employeeHeader.ConfirmPassword = EmployeeUser.Password;

                        LogInLogOutService.Save(EmployeeUser, true);
                        EmployeeProfileService.SaveEmployeeProfile(_employeeHeader, true);

                        result = Json(new { sucess = true, message = C.SUCCESSFUL_SAVE_MESSAGE }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            return result;
        }

        public JsonResult SaveEmployeeDocuments()
        {
            var employeeId = Convert.ToInt16(System.Web.HttpContext.Current.Request["employeeId"]);
            HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            JsonResult result = null;

            try
            {
                EmployeeDocument employeeDocument = null;
                for (int i = 0; i <= hfc.Count; i++)
                {
                    if (hfc[1] != null)
                    {

                        employeeDocument = EmployeeProfileService.GetEmployeeDocuments<EmployeeDocument>(ed => ed.EmployeeHeaderId == employeeId).FirstOrDefault();

                        //EmployeeHeader employeeHeader = EmployeeProfileService.GetEmployeeDocuments(Convert.ToInt16(employeeId));
                        if (employeeDocument != null)
                        {
                            employeeDocument.ModifiedBy = USER_OBJECT.UserID;
                            employeeDocument.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        }
                        else
                        {
                            employeeDocument = new EmployeeDocument();
                            employeeDocument.CreatedBy = USER_OBJECT.UserID;
                            employeeDocument.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                        }
                        EmployeeHeader EmployeeHeader = employeeDocument.EmployeeHeader;
                        employeeDocument.FileName = System.IO.Path.GetFileName(hfc[i].FileName);
                        employeeDocument.BranchId = USER_OBJECT.BranchId;
                        employeeDocument.EmployeeHeaderId = Convert.ToInt32(employeeId);

                        SaveFile(System.Web.HttpContext.Current.Request.Files);
                        EmployeeHeader.EmployeeDocument.Add(employeeDocument);


                    }
                }
                EmployeeProfileService.SaveEmployeeDocuments(employeeDocument);
            }
            catch (Exception ex)
            {

                throw;
            }
            return result;
        }
        #endregion

        #region EmployeeNumber
        public JsonResult GetEmployeeNumber(int employeeTypeId)
        {
            JsonResult result = new JsonResult();
            string newEmployeeNumber = string.Empty;
            string existingemployeeNumber = string.Empty;
            try
            {
                if (employeeTypeId > 0)
                {
                    string employeeNumber = EmployeeProfileService.GetNewEmployeeNumber(USER_OBJECT.BranchId, "Employee", USER_OBJECT.UserID);
                    {
                        //    EmployeeHeader employeeHeader = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>().Where(x => x.IDType == employeeTypeId).OrderByDescending(o => o.Id).FirstOrDefault();
                        //    if (employeeHeader != null)
                        //    {
                        //        existingemployeeNumber = employeeHeader.IDNumber;
                        //    }

                        //    if (!string.IsNullOrWhiteSpace(existingemployeeNumber))
                        //    {
                        //        string existingNumber = existingemployeeNumber.Substring(1);
                        //        char type = employeeTypeId == 2 ? 'P' : 'T';
                        //        int number = Convert.ToInt32(existingNumber);
                        //        newEmployeeNumber = type + (number + 1).ToString();
                        //        result = Json(newEmployeeNumber, JsonRequestBehavior.AllowGet);
                        //    }
                        //    else
                        //    {
                        //        if (employeeTypeId == 2)
                        //            newEmployeeNumber = "P1000";
                        //        else if (employeeTypeId == 3)
                        //            newEmployeeNumber = "T1000";
                        //        result = Json(newEmployeeNumber, JsonRequestBehavior.AllowGet);
                        //    }
                        //}
                    }
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);

            }
            return result;
        }

        #endregion

        #endregion

        #region Private Accessors
        private EmployeeHeader PrepareEmployeeHeader(EmployeeHeader employeeHeader, HttpFileCollection hfc = null)
        {
            EmployeeHeader _employeeHeader = null;
            if (employeeHeader.Id > 0)
            {

                _employeeHeader = EmployeeProfileService.GetEmployeeProfileDetailsById(employeeHeader.Id);
                _employeeHeader.ModifiedBy = USER_OBJECT.UserName;
                _employeeHeader.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            else
            {
                _employeeHeader = new EmployeeHeader();
                _employeeHeader.CreatedBy = USER_OBJECT.UserName;
                _employeeHeader.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            EmployeePersonalInfo employeePersonalInfo = employeeHeader.EmployeePersonalInfo;

            _employeeHeader.BranchId = employeeHeader.BranchId;
            //_employeeHeader.EmployeeId = employeeHeader.EmployeeId > 0 ? employeeHeader.EmployeeId : 0;
            _employeeHeader.FirstName = !string.IsNullOrWhiteSpace(employeeHeader.FirstName) ? employeeHeader.FirstName : string.Empty;
            _employeeHeader.MiddleName = !string.IsNullOrWhiteSpace(employeeHeader.MiddleName) ? employeeHeader.MiddleName : string.Empty;
            _employeeHeader.LastName = !string.IsNullOrWhiteSpace(employeeHeader.LastName) ? employeeHeader.LastName : string.Empty;
            _employeeHeader.Nationality = !string.IsNullOrWhiteSpace(employeeHeader.Nationality) ? employeeHeader.Nationality : string.Empty;
            _employeeHeader.IDNumber = !string.IsNullOrWhiteSpace(employeeHeader.IDNumber) ? employeeHeader.IDNumber : string.Empty;
            _employeeHeader.IDType = employeeHeader.IDType;
            _employeeHeader.UserEmailId = employeeHeader.UserEmailId;
            _employeeHeader.Password = employeeHeader.Password;
            _employeeHeader.IsActive = employeeHeader.IsActive;
            _employeeHeader.ConfirmPassword = employeeHeader.ConfirmPassword;
            _employeeHeader.EmployeePersonalInfo = PrepareEmployeePersonalInfo(employeePersonalInfo, _employeeHeader);
            _employeeHeader.Address = PrepareEmployeeAddress(employeeHeader.Address, _employeeHeader);
            _employeeHeader.EmployeeWorkDetail = PrepareEmployeeWorkDetail(employeeHeader.EmployeeWorkDetail, _employeeHeader);
            employeeHeader.User = employeeHeader.User == null ? new User() : employeeHeader.User;
            _employeeHeader.User = PrepareUserDetails(employeeHeader.User, _employeeHeader);

            //List<EmployeeDocument> employeeDocument = employeeHeader.EmployeeDocument;
            //PrepareEmployeeDocuments(hfc, _employeeHeader, employeeDocument);
            return _employeeHeader;
        }

        private void PrepareEmployeeDocuments(HttpFileCollection hfc, EmployeeHeader employeeHeader, List<EmployeeDocument> employeeDocuments)
        {
            for (var i = 0; i < hfc.Count; i++)
            {
                if (employeeDocuments != null && employeeDocuments.Any())
                {
                    EmployeeDocument employeeDocument = new EmployeeDocument();

                    //if (employeeDocument.Id > 0)
                    //{
                    //    employeeDocument = EmployeeProfileService.GetEmployeeDocuments<EmployeeDocument>(e=>e.Id == employeeDocument.Id).FirstOrDefault()
                    //    employeeDocument.ModifiedBy = USER_OBJECT.UserID;
                    //    employeeDocument.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    //}
                    //else
                    //{
                    employeeDocument.CreatedBy = USER_OBJECT.UserID;
                    employeeDocument.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    //}
                    employeeDocument.FileName = hfc[i].FileName;
                    employeeDocument.BranchId = USER_OBJECT.BranchId;
                    //employeeDocument.DocumentType = hfc[i].ContentLength
                    employeeDocuments.Add(employeeDocument);

                }

            }
        }
        private EmployeePersonalInfo PrepareEmployeePersonalInfo(EmployeePersonalInfo employeePersonalInfo, EmployeeHeader employeeHeader)
        {
            EmployeePersonalInfo _employeePersonalInfo = null;
            if (employeePersonalInfo.Id > 0)
            {
                _employeePersonalInfo = employeeHeader.EmployeePersonalInfo;
                _employeePersonalInfo.ModifiedBy = USER_OBJECT.UserID;
                _employeePersonalInfo.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            else
            {
                _employeePersonalInfo = new EmployeePersonalInfo();
                _employeePersonalInfo.CreatedBy = USER_OBJECT.UserName;
                _employeePersonalInfo.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            _employeePersonalInfo.BranchId = employeePersonalInfo.BranchId;
            _employeePersonalInfo.EmployeeId = employeeHeader.Id;
            _employeePersonalInfo.DOB = DateTimeConverter.SingaporeDateTimeConversion(employeePersonalInfo.DOB);
            _employeePersonalInfo.Gender = employeePersonalInfo.Gender;
            _employeePersonalInfo.FatherName = employeePersonalInfo.FatherName;
            _employeePersonalInfo.BirthCountry = employeePersonalInfo.BirthCountry;
            _employeePersonalInfo.MaritalStatus = employeePersonalInfo.MaritalStatus;
            _employeePersonalInfo.SpouseName = employeePersonalInfo.SpouseName;
            _employeePersonalInfo.EmergencyContactNumber = employeePersonalInfo.EmergencyContactNumber;
            _employeePersonalInfo.EmergencyContactName = employeePersonalInfo.EmergencyContactName;
            if (employeePersonalInfo.MarriageDate.HasValue)
                _employeePersonalInfo.MarriageDate = DateTimeConverter.SingaporeDateTimeConversion(employeePersonalInfo.MarriageDate.Value);
            else
                _employeePersonalInfo.MarriageDate = null;
            _employeePersonalInfo.ResidentialStatus = employeePersonalInfo.ResidentialStatus;

            return _employeePersonalInfo;
        }
        private Address PrepareEmployeeAddress(Address address, EmployeeHeader employeeHeader = null)
        {
            Address _address = null;
            if (address.AddressId > 0)
            {
                _address = employeeHeader != null ? employeeHeader.Address : address;
                _address.ModifiedBy = USER_OBJECT.UserName;
                _address.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            else
            {
                _address = new Address();
                _address.CreatedBy = USER_OBJECT.UserName;
                _address.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            _address.Address1 = address.Address1;
            _address.Address2 = !string.IsNullOrWhiteSpace(address.Address2) ? address.Address2 : string.Empty;
            _address.AddressLinkID = !string.IsNullOrWhiteSpace(address.AddressLinkID) ? address.AddressLinkID : string.Empty;
            _address.SeqNo = 0;
            _address.CityName = address.CityName;
            _address.StateName = address.StateName;
            _address.ZipCode = address.ZipCode;
            _address.MobileNo = address.MobileNo;
            _address.CountryCode = address.CountryCode;
            _address.AddressType = "Employee";
            _address.Contact = address.MobileNo;
            _address.Email = address.Email;
            _address.IsActive = true;
            return _address;
        }
        private EmployeeWorkDetail PrepareEmployeeWorkDetail(EmployeeWorkDetail employeeWorkDetail, EmployeeHeader employeeHeader)
        {
            EmployeeWorkDetail _employeeWorkDetail = null;
            if (employeeWorkDetail.Id > 0)
            {
                _employeeWorkDetail = employeeHeader.EmployeeWorkDetail;
                _employeeWorkDetail.ModifiedBy = USER_OBJECT.UserName;
                _employeeWorkDetail.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            else
            {
                _employeeWorkDetail = new EmployeeWorkDetail();
                _employeeWorkDetail.CreatedBy = USER_OBJECT.UserName;
                _employeeWorkDetail.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            _employeeWorkDetail.BranchId = employeeWorkDetail.BranchId;
            _employeeWorkDetail.EmployeeId = employeeHeader.Id;
            _employeeWorkDetail.JoiningDate = employeeWorkDetail.JoiningDate.HasValue ? DateTimeConverter.SingaporeDateTimeConversion(employeeWorkDetail.JoiningDate.Value) : DateTime.Now;
            _employeeWorkDetail.ConfirmationDate = employeeWorkDetail.ConfirmationDate.HasValue ? DateTimeConverter.SingaporeDateTimeConversion(employeeWorkDetail.ConfirmationDate.Value) : DateTime.Now;
            _employeeWorkDetail.ProbationPeriod = employeeWorkDetail.ProbationPeriod;
            _employeeWorkDetail.NoticePeriod = employeeWorkDetail.NoticePeriod;
            _employeeWorkDetail.DesignationId = employeeWorkDetail.DesignationId;
            _employeeWorkDetail.DepartmentId = employeeWorkDetail.DepartmentId;          
            _employeeWorkDetail.ResignationDate = employeeWorkDetail.ResignationDate;
            return _employeeWorkDetail;
        }
        private User PrepareUserDetails(User user, EmployeeHeader employeeHeader)
        {
            if (user.Id == 0)
            {
                user = new User();
                user.CreatedBy = USER_OBJECT.UserName;
                user.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            else
            {
                user = employeeHeader.User;
                user.ModifiedBy = USER_OBJECT.UserName;
                user.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            user.BranchId = employeeHeader.BranchId;
            user.UserID = employeeHeader.UserEmailId;
            user.UserName = employeeHeader.UserEmailId;
            user.Password = employeeHeader.Password;
            user.IsActive = employeeHeader.IsActive;
            user.Email = employeeHeader.Address.Email;
            user.MobileNumber = employeeHeader.Address.MobileNo;
            user.RoleCode = "Employee";
            user.CreatedBy = USER_OBJECT.UserName;
            user.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);

            return user;
        }

        private void PrepareEmail(EmployeeHeader employeeHeader)
        {

            string message = "UserId : " + employeeHeader.UserEmailId
                         + "<br/>"
                         + "Password: " + employeeHeader.Password
                         + "<br/>"
                         + "Please go through this link to login HR:"
                         + "<br/>" +
                          "http://ragsarma-001-site20.htempurl.com";

            var emailGen = new HR.Core.HelperMethods();
            emailGen.ConfigMail(employeeHeader.User.UserName, true, "Login Crediantials for HR", message.ToString());
        }

        public void ExportEmployeeDocumentFile(string employeeFileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(employeeFileName))
                {

                    string employeeFilePathToSave = Path.Combine(Server.MapPath("~/img/profile-pics"), employeeFileName);
                    //var buffer = System.IO.File.ReadAllBytes(employeeFilePathToSave);
                    //var stream = new MemoryStream(buffer);
                    //return File(stream.ToArray(), "text/html", employeeFileName);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //return this.Content(string.Empty);
        }

        private IQueryable<EmployeeViewModel> ApplyWhere(FilterViewModel filterViewModel, IQueryable<EmployeeViewModel> employeeHeader)

        {

            switch (filterViewModel.Field)
            {
                case "EmployeeId":
                    if (filterViewModel.Type == "Where")
                        employeeHeader = employeeHeader.Where(e => e.EmployeeId == filterViewModel.Value);

                    break;
                case "FirstName":
                    if (filterViewModel.Type == "Where")
                        employeeHeader = employeeHeader.Where(e => e.EmployeeName.ToLower() == filterViewModel.Value.ToLower());

                    break;
                case "JoiningDate":
                    if (filterViewModel.Type == "Where")
                        employeeHeader = employeeHeader.Where(e => e.JoiningDate == Convert.ToDateTime(filterViewModel.Value));
                    break;

                case "MobileNo":
                    if (filterViewModel.Type == "Where")
                        employeeHeader = employeeHeader = employeeHeader.Where(e => e.MobileNo.ToLower() == filterViewModel.Value.ToLower());
                    break;
                case "CountryCode":
                    employeeHeader = employeeHeader.Where(e => e.CountryCode == filterViewModel.Value);
                    break;
                case "Designation":
                    employeeHeader = employeeHeader.Where(e => e.Designation == Convert.ToInt32(filterViewModel.Value));
                    break;
                case "EmployeeType":
                    employeeHeader = employeeHeader.Where(et => et.EmployeeType == Convert.ToInt32(filterViewModel.Value));
                    break;
                default:
                    break;

            }
            return employeeHeader;
        }

        public IOrderedQueryable<EmployeeViewModel> OrderBy(IQueryable<EmployeeViewModel> source, string propertyName, bool descending, bool anotherLevel)
        {
            try
            {
                ParameterExpression param = Expression.Parameter(typeof(EmployeeViewModel), string.Empty);
                MemberExpression property = Expression.PropertyOrField(param, propertyName);
                LambdaExpression sort = Expression.Lambda(property, param);
                MethodCallExpression call = Expression.Call(
                    typeof(Queryable),
                    (!anotherLevel ? "OrderBy" : "ThenBy") + (descending ? "Descending" : string.Empty),
                    new[] { typeof(EmployeeViewModel), property.Type },
                    source.Expression,
                    Expression.Quote(sort));
                return (IOrderedQueryable<EmployeeViewModel>)source.Provider.CreateQuery<EmployeeViewModel>(call);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region ActionResult
        public ActionResult EmployeeProfile()
        {
            return View();
        }
        public ActionResult EmployeeDirectory()
        {
            return View();
        }

        public ActionResult EmployeeInfo()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }
        #endregion
    }
}