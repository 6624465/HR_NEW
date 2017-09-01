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
                    if (!string.IsNullOrEmpty(user.UserName) && !string.IsNullOrWhiteSpace(user.Password))
                    {
                        User _user = LogInLogOutService.GetUser<User>(u => u.UserName == user.UserName && u.Password == user.Password).FirstOrDefault();
                        SessionObject sessionObject = new SessionObject()
                        {
                            UserID = _user.UserID,
                            UserName = _user.UserName,
                            Email = _user.Email,
                            RoleCode = _user.RoleCode,
                            BranchId = _user.BranchId,
                            BranchName = _user.Branch.BranchName
                        };
                        USER_OBJECT = sessionObject;
                        result = Json(new { success = true, SessionObject = USER_OBJECT }, JsonRequestBehavior.AllowGet);

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
        #endregion


    }
}