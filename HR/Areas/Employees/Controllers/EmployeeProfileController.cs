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
using HR.Data;

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
                
                List<EmployeeHeader> employeeHeader = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>(e => e.Address.Select(s=>s.CountryCode == USER_OBJECT.CountryCode).FirstOrDefault()).ToList();
                List<EmployeeViewModel> employeeViewModelList = new List<EmployeeViewModel>();
                foreach (var item in employeeHeader)
                {
                    EmployeeViewModel employeeViewModel = new EmployeeViewModel();
                    employeeViewModel.Id = item.Id;
                    employeeViewModel.EmployeeName = item.FirstName + " " + item.MiddleName + " " + item.LastName;
                    foreach (var employeeWorkDetail in item.EmployeeWorkDetail)
                    {
                        employeeViewModel.JoiningDate = item.EmployeeWorkDetail != null ? employeeWorkDetail.JoiningDate.Value : DateTime.Now;
                        employeeViewModel.Designation = item.EmployeeWorkDetail != null && employeeWorkDetail.DesignationId.HasValue ? employeeWorkDetail.DesignationId.Value : 0;
                        employeeViewModel.DesignationName = item.EmployeeWorkDetail != null && employeeWorkDetail.DesignationId.HasValue ? 
                            (LookUpCodeService.GetLookUpType(employeeWorkDetail.DesignationId.Value)).LookUpDescription : string.Empty;
                    }
                    foreach (var employeePersonalInfo in item.EmployeePersonalInfo)
                    {
                        employeeViewModel.DOB = employeePersonalInfo.DOB;
                    }
                    foreach (var address in item.Address)
                    {
                        employeeViewModel.MobileNo = address.MobileNo;
                        employeeViewModel.Email = address.Email;
                        employeeViewModel.CountryCode = address.CountryCode;
                    }
                    employeeViewModel.EmployeeId = item.IDNumber;
                    employeeViewModel.EmployeeType = item.IDType;
                    employeeViewModelList.Add(employeeViewModel);
                }


                var employees = employeeViewModelList.AsQueryable();
                int totalCount = employees.Count();
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

                employees = employees.Skip(searchViewModel.offset).Take(searchViewModel.limit).AsQueryable();

                if (searchViewModel.FilterViewModel == null)
                {
                    jsonResult = Json(new { sucess = true, employees = employees, total_count = totalCount }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    jsonResult = Json(new { sucess = true, employees = employees, total_count = employees.Count() }, JsonRequestBehavior.AllowGet);
                }

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
                {
                    employeeHeader = EmployeeProfileService.GetEmployeeProfileDetailsById(employeeId);
                }
                else if (employeeId == 0)
                {
                    employeeHeader = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>(e => e.UserId == USER_OBJECT.Id).FirstOrDefault();
                    EmployeeDocument employeeDocument = EmployeeProfileService.GetEmployeeDocuments<EmployeeDocument>(ed => ed.EmployeeHeaderId == employeeHeader.Id).FirstOrDefault();
                    if (employeeDocument != null)
                        imagePathName = employeeDocument.FileName;
                    lookUpDescriptions = new LookUpDescriptions();
                    foreach (var employeePersonalInfo in employeeHeader.EmployeePersonalInfo)
                    {
                        lookUpDescriptions.MarriedStatus = LookUpCodeService.GetLookUpType(employeePersonalInfo.MaritalStatus).LookUpCode;
                    }
                    foreach (var employeeWorkDetail in employeeHeader.EmployeeWorkDetail)
                    {
                        lookUpDescriptions.Designation = LookUpCodeService.GetLookUpType(employeeWorkDetail.DesignationId.Value).LookUpCode;
                        lookUpDescriptions.Department = LookUpCodeService.GetLookUpType(employeeWorkDetail.DepartmentId.Value).LookUpCode;
                    }

                    lookUpDescriptions.Country = CompanyService.GetCountries<Country>(c => c.CountryCode == employeeHeader.Address.FirstOrDefault().CountryCode).FirstOrDefault().CountryName;
                    lookUpDescriptions.Nationality = CompanyService.GetCountries<Country>(c => c.CountryCode == employeeHeader.Nationality).FirstOrDefault().CountryName;

                }

                List<EmployeeDocument> employeeDocuments = EmployeeProfileService.GetEmployeeDocuments<EmployeeDocument>(e => e.EmployeeHeaderId == employeeHeader.Id).ToList();
                employeeHeader.EmployeeDocument = employeeDocuments != null ? employeeDocuments : null;

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
            List<EmployeeDocumentViewModel> employeeDocumentViewModel = JsonConvert.DeserializeObject<List<EmployeeDocumentViewModel>>(System.Web.HttpContext.Current.Request["EmployeeDocument"]);

            HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            JsonResult result = new JsonResult();
            if (employeeHeader != null)
            {
                try
                {
                    EmployeeHeader _employeeHeader = new EmployeeHeader();
                    _employeeHeader = PrepareEmployeeHeader(employeeHeader, hfc, employeeDocumentViewModel);

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
                        _employeeHeader.EmployeePersonalInfo.Add(PrepareEmployeePersonalInfo(employeeHeader.EmployeePersonalInfo.FirstOrDefault(), employeeHeader));

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
                        LookUpCodeService.Save(_address);
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
                HttpPostedFile file = hfc[0];
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
                EmployeeHeader EmployeeHeader = EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>(s => s.Id == employeeId).FirstOrDefault();
                employeeDocument.FileName = System.IO.Path.GetFileName(file.FileName);
                employeeDocument.BranchId = USER_OBJECT.BranchId;
                employeeDocument.EmployeeHeaderId = Convert.ToInt32(employeeId);
                employeeDocument.DocumentType = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpCode == "ProfilePic").Select(s => s.LookUpID).FirstOrDefault();
                SaveFile(file);
                EmployeeHeader.EmployeeDocument.Add(employeeDocument);
                if (employeeDocument != null)
                    EmployeeProfileService.SaveEmployeeDocuments(employeeDocument);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
            }
            return result;
        }
        #endregion

        #region EmployeeNumber
        public JsonResult GetEmployeeNumber()
        {
            JsonResult result = new JsonResult();
            try
            {
                string employeeNumber = EmployeeProfileService.GetNewEmployeeNumber(USER_OBJECT.BranchId, "Employee", USER_OBJECT.UserID);
                result = Json(employeeNumber, JsonRequestBehavior.AllowGet);
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
        private EmployeeHeader PrepareEmployeeHeader(EmployeeHeader employeeHeader, HttpFileCollection hfc = null, List<EmployeeDocumentViewModel> employeeDocumentViewModel = null)
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
            EmployeePersonalInfo employeePersonalInfo = employeeHeader.EmployeePersonalInfo.FirstOrDefault() ;

            _employeeHeader.BranchId = employeeHeader.BranchId;
            _employeeHeader.ManagerId = employeeHeader.ManagerId;
            _employeeHeader.FirstName = !string.IsNullOrWhiteSpace(employeeHeader.FirstName) ? employeeHeader.FirstName.ToUpper() : string.Empty;
            _employeeHeader.MiddleName = !string.IsNullOrWhiteSpace(employeeHeader.MiddleName) ? employeeHeader.MiddleName.ToUpper() : string.Empty;
            _employeeHeader.LastName = !string.IsNullOrWhiteSpace(employeeHeader.LastName) ? employeeHeader.LastName.ToUpper() : string.Empty;
            _employeeHeader.Nationality = !string.IsNullOrWhiteSpace(employeeHeader.Nationality) ? employeeHeader.Nationality : string.Empty;
            _employeeHeader.IDNumber = !string.IsNullOrWhiteSpace(employeeHeader.IDNumber) ? employeeHeader.IDNumber : string.Empty;
            _employeeHeader.IDType = employeeHeader.IDType;
            _employeeHeader.UserEmailId = employeeHeader.UserEmailId;
            _employeeHeader.Password = employeeHeader.Password;
            _employeeHeader.IsActive = employeeHeader.IsActive;
            _employeeHeader.ConfirmPassword = employeeHeader.ConfirmPassword;
            _employeeHeader.EmployeePersonalInfo.Add(PrepareEmployeePersonalInfo(employeePersonalInfo, _employeeHeader));
            _employeeHeader.Address.Add(PrepareEmployeeAddress(employeeHeader.Address.FirstOrDefault(), _employeeHeader));
            _employeeHeader.EmployeeWorkDetail.Add(PrepareEmployeeWorkDetail(employeeHeader.EmployeeWorkDetail.FirstOrDefault(), _employeeHeader));
            employeeHeader.User = employeeHeader.User == null ? new User() : employeeHeader.User;
            _employeeHeader.User = PrepareUserDetails(employeeHeader.User, _employeeHeader);

            List<EmployeeDocument> employeeDocument = employeeHeader.EmployeeDocument != null ? employeeHeader.EmployeeDocument : new List<EmployeeDocument>();
            PrepareEmployeeDocuments(hfc, _employeeHeader, employeeDocument, employeeDocumentViewModel);
            return _employeeHeader;
        }

        private void PrepareEmployeeDocuments(HttpFileCollection hfc, EmployeeHeader employeeHeader, List<EmployeeDocument> employeeDocuments, List<EmployeeDocumentViewModel> employeeDocumentViewModel)
        {
            for (var i = 0; i < hfc.Count; i++)
            {
                HttpPostedFile httpPostedFileBase = hfc[i];
                foreach (var item in employeeDocumentViewModel)
                {
                    if (item.Name == httpPostedFileBase.FileName)
                    {
                        EmployeeDocument employeeDocument = new EmployeeDocument();
                        LookUp lookUp = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpCode == item.DocumentType).FirstOrDefault();
                        bool employeeHeaders = employeeHeader.EmployeeDocument != null ? employeeHeader.EmployeeDocument.Any(e => e.DocumentType == lookUp.LookUpID && e.FileName == item.Name) : false;
                        if (!employeeHeaders)
                        {
                            employeeDocument.CreatedBy = USER_OBJECT.UserID;
                            employeeDocument.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                            employeeDocument.FileName = httpPostedFileBase.FileName;
                            employeeDocument.BranchId = USER_OBJECT.BranchId;
                            employeeDocument.DocumentType = LookUpCodeService.GetLookUp<LookUp>(l => l.LookUpCode == item.DocumentType).Select(s => s.LookUpID).FirstOrDefault(); ;
                            // employeeDocuments.Add(employeeDocument);
                            SaveFile(httpPostedFileBase);
                            employeeHeader.EmployeeDocument = employeeHeader.EmployeeDocument == null ? new List<EmployeeDocument>() : employeeHeader.EmployeeDocument;
                            employeeHeader.EmployeeDocument.Add(employeeDocument);
                        }
                    }
                }

            }
        }
        private EmployeePersonalInfo PrepareEmployeePersonalInfo(EmployeePersonalInfo employeePersonalInfo, EmployeeHeader employeeHeader)
        {
            EmployeePersonalInfo _employeePersonalInfo = null;
            if (employeePersonalInfo.Id > 0)
            {
                _employeePersonalInfo = employeeHeader.EmployeePersonalInfo.FirstOrDefault();
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
            //_employeePersonalInfo.EmployeeId = employeeHeader.Id;
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
                _address = employeeHeader != null ? employeeHeader.Address.FirstOrDefault() : address;
                _address.ModifiedBy = USER_OBJECT.UserName;
                _address.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            else
            {
                _address = new Address();
                _address.CreatedBy = USER_OBJECT.UserName;
                _address.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
            }
            _address.Address1 = address.Address1.ToUpper();
            _address.Address2 = !string.IsNullOrWhiteSpace(address.Address2) ? address.Address2.ToUpper() : string.Empty;
            //_address.AddressLinkID = !string.IsNullOrWhiteSpace(address.AddressLinkID) ? address.AddressLinkID : string.Empty;
            _address.SeqNo = 0;
            _address.CityName = address.CityName.ToUpper();
            _address.StateName = !string.IsNullOrWhiteSpace(address.StateName) ? address.StateName.ToUpper() : string .Empty;
            _address.ZipCode = address.ZipCode;
            _address.MobileNo = address.MobileNo;
            _address.CountryCode = address.CountryCode;
            _address.AddressType = "Employee";
            _address.Contact = address.MobileNo;
            _address.Email = !string.IsNullOrWhiteSpace(address.Email) ? address.Email : string.Empty;
            _address.IsActive = true;
            return _address;
        }
        private EmployeeWorkDetail PrepareEmployeeWorkDetail(EmployeeWorkDetail employeeWorkDetail, EmployeeHeader employeeHeader)
        {
            EmployeeWorkDetail _employeeWorkDetail = null;
            if (employeeWorkDetail.Id > 0)
            {
                _employeeWorkDetail = employeeHeader.EmployeeWorkDetail.FirstOrDefault();
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
            //_employeeWorkDetail.EmployeeId = employeeHeader.Id;
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
            user.Email = employeeHeader.Address.FirstOrDefault().Email;
            user.MobileNumber = employeeHeader.Address.FirstOrDefault().MobileNo;
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
                        if (!String.IsNullOrWhiteSpace(filterViewModel.Value))
                        {
                            employeeHeader = employeeHeader.Where(e => e.EmployeeName.Contains(filterViewModel.Value)).AsQueryable();
                          //  return employeeHeader;
                        }
                    break;
                case "JoiningDate":
                    if (filterViewModel.Type == "Where")
                        employeeHeader = employeeHeader.Where(e => e.JoiningDate==Convert.ToDateTime(filterViewModel.Value));
                    break;

                case "MobileNo":
                    if (filterViewModel.Type == "Where")
                        employeeHeader = employeeHeader.Where(e => e.MobileNo.ToLower() == filterViewModel.Value.ToLower());
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