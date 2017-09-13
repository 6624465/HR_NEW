﻿using HR.Controllers;
using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HR.Core.Utilities;

namespace HR.Areas.Employees.Controllers
{
    public class EmployeeProfileController : BaseController
    {
        #region Public Accessors

        #region Get
        public JsonResult GetEmployeeDetails()
        {
            JsonResult jsonResult = new JsonResult();
            try
            {
                var employees = (from employee in EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>()
                                 select new
                                 {
                                     EmployeeName = employee.FirstName + employee.MiddleName + employee.LastName,
                                     JoiningDate = employee.EmployeeWorkDetail.JoiningDate,
                                     MobileNo = employee.Address.MobileNo,
                                     Email = employee.Address.Email,
                                     EmployeeId = employee.Id
                                 }).ToList();

                jsonResult = Json(new { sucess = true, employees = employees }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                    return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
            }
            return jsonResult;
        }
        #endregion

        public JsonResult GetEmployeeById(int employeeId)
        {
            JsonResult result = null;
            if (employeeId > 0)
            {
                try
                {
                    EmployeeHeader employeeHeader = EmployeeProfileService.GetEmployeeProfileDetailsById(employeeId);
                    result = Json(employeeHeader, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }

            return result;
        }

        #region Save
        public JsonResult SaveEmlployee(EmployeeHeader employeeHeader)
        {
            JsonResult result = new JsonResult();
            if (employeeHeader != null)
            {
                try
                {
                    EmployeeHeader _employeeHeader = new EmployeeHeader();

                    _employeeHeader = PrepareEmployeeHeader(employeeHeader);

                    EmployeeProfileService.SaveEmployeeProfile(_employeeHeader);
                    result = Json(new { sucess = true, message = "Sent successfully" }, JsonRequestBehavior.AllowGet);
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

        #endregion

        #region Private Accessors
        private EmployeeHeader PrepareEmployeeHeader(EmployeeHeader employeeHeader)
        {
            EmployeeHeader _employeeHeader = null;
            if (employeeHeader.Id > 0)
            {
                _employeeHeader = employeeHeader;
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
            _employeeHeader.EmployeePersonalInfo = PrepareEmployeePersonalInfo(employeePersonalInfo, _employeeHeader);
            _employeeHeader.Address = PrepareEmployeeAddress(employeeHeader.Address);
            _employeeHeader.EmployeeWorkDetail = PrepareEmployeeWorkDetail(employeeHeader.EmployeeWorkDetail, _employeeHeader);
            return _employeeHeader;
        }

        private EmployeePersonalInfo PrepareEmployeePersonalInfo(EmployeePersonalInfo employeePersonalInfo, EmployeeHeader employeeHeader)
        {
            EmployeePersonalInfo _employeePersonalInfo = null;
            if (employeePersonalInfo.Id > 0)
            {
                _employeePersonalInfo = employeePersonalInfo;
                _employeePersonalInfo.ModifiedBy = USER_OBJECT.UserName;
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
            if (employeePersonalInfo.MarriageDate.HasValue)
                _employeePersonalInfo.MarriageDate = DateTimeConverter.SingaporeDateTimeConversion(employeePersonalInfo.MarriageDate.Value);
            else
                _employeePersonalInfo.MarriageDate = null;
            _employeePersonalInfo.ResidentialStatus = employeePersonalInfo.ResidentialStatus;

            return _employeePersonalInfo;
        }
        private Address PrepareEmployeeAddress(Address address)
        {
            Address _address = null;
            if (address.AddressId > 0)
            {
                _address = address;
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
            _address.Email = "meena.konakondla@gmail.com";
            _address.IsActive = true;
            return _address;
        }
        private EmployeeWorkDetail PrepareEmployeeWorkDetail(EmployeeWorkDetail employeeWorkDetail, EmployeeHeader employeeHeader)
        {
            EmployeeWorkDetail _employeeWorkDetail = null;
            if (employeeWorkDetail.Id > 0)
            {
                _employeeWorkDetail = employeeWorkDetail;
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
            _employeeWorkDetail.Designation = employeeWorkDetail.Designation;
            _employeeWorkDetail.Department = employeeWorkDetail.Department;
            return _employeeWorkDetail;
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

        #endregion
    }
}