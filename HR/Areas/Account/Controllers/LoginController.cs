using HR.Controllers;
using HR.Data;
using HR.Data.Account;
using HR.Service.Account.IAccountService;
using HR.Service.CompanyDetails.ICompany;
using HR.Service.Leave.ILeaveService;
using HR.Service.Master.IMasterService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HR.Core.Models;
using Ninject;
using HR.Models;
using HR.Core.Utilities;

namespace HR.Areas.Account.Controllers
{

    public class LoginController : BaseController
    {
        #region Login
        public ActionResult LogOn(User user)
        {
            JsonResult result = null;
            if (user != null)
            {
                try
                {
                    if (!string.IsNullOrWhiteSpace(user.UserName) && !string.IsNullOrWhiteSpace(user.Password))
                    {
                        User _user = LogInLogOutService.GetUser<User>(u => u.UserName == user.UserName && u.Password == user.Password).FirstOrDefault();

                        var securables = RoleRightService.GetRoleRights<RoleRight>(x => x.CompanyId == _user.Branch.CompanyId && x.RoleCode == _user.RoleCode)
                                                    .Select(x => new SecurableViewModel()
                                                    {
                                                        securableitem = x.Securable.SecurableID,
                                                        OperationID = x.Securable.OperationID,
                                                        AccessRight = x.AccessRight
                                                    }).ToList();

                        var sec = RoleRightService.GetRoleRights<RoleRight>(x => x.CompanyId == _user.Branch.CompanyId && x.RoleCode == _user.RoleCode)
                                                    .Select(x => new
                                                    {
                                                        securableitem = x.SecurableID,
                                                        OperationID = x.Securable.OperationID,
                                                        AccessRight = x.AccessRight
                                                    }).ToList();

                        EmployeeHeader employeeHeader =  EmployeeProfileService.GetEmployeeProfileList<EmployeeHeader>(u => u.UserId == _user.Id).FirstOrDefault();

                        SessionObject sessionObject = new SessionObject()
                        {
                            Id = _user.Id,
                            UserID = _user.UserID,
                            UserName = _user.UserName,
                            Email = _user.Email,
                            RoleCode = _user.RoleCode,
                            BranchId = _user.BranchId,
                            BranchName = _user.Branch.BranchName,
                            CompanyId = _user.Branch.CompanyId,
                            EmployeeId = employeeHeader != null ? employeeHeader.Id :0,
                            Employeename = employeeHeader != null ?  employeeHeader.FirstName : string.Empty

                        };
                        USER_OBJECT = sessionObject;

                        result = Json(new { success = true, SessionObject = USER_OBJECT, securables = securables }, JsonRequestBehavior.AllowGet);

                    }
                }
                catch (Exception ex)
                {
                    result = Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            return result;
        }
        #endregion
        public JsonResult ResetPassword(UserViewModel userViewModel)
        {
            JsonResult result = null;
            if (userViewModel != null)
            {
                try
                {
                    if (userViewModel.OldPassword != null && userViewModel.NewPassword != null)
                    {
                        if (USER_OBJECT != null)
                        {

                          User user =   LogInLogOutService.GetUser<User>(u => u.UserID == USER_OBJECT.UserID && u.BranchId == USER_OBJECT.BranchId && u.Password == userViewModel.OldPassword).FirstOrDefault();
                            if (user != null)
                            {
                                user.ModifiedBy = USER_OBJECT.UserID;
                                user.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                                user.Password = userViewModel.NewPassword;

                                LogInLogOutService.Save(user);
                                result = Json(new { success = true, message = "Password is Changed Sucessfull"}, JsonRequestBehavior.AllowGet);

                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    
                    result = Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
                }    
            }
            return result;
        }

        [HttpGet]
        public JsonResult LogOut()
        {
            JsonResult result = null;
            try
            {
                if (USER_OBJECT != null)
                {
                    if (!string.IsNullOrWhiteSpace(USER_OBJECT.UserID) && !string.IsNullOrWhiteSpace(USER_OBJECT.UserName))
                    {
                        User user = LogInLogOutService.GetUser<User>(u => u.UserID == USER_OBJECT.UserID && u.UserName == USER_OBJECT.UserName).FirstOrDefault();
                        if (user != null)
                        {
                            user.IsActive = false;
                            LogInLogOutService.Save(user);
                            USER_OBJECT = null;
                            result = Json(new { success = true }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                        result = Json(new { sucess = false, message = "Session Is Expired" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                result = Json(new { sucess = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return result;
        }



        #region Action Result
        // GET: Account/Login
       
        public ActionResult Login()
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