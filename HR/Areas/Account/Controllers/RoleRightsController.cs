using HR.Controllers;
using HR.Core;
using HR.Core.Models;
using HR.Core.Utilities;
using Ninject;
using System;
using System.Collections.Generic;
using System.Globalization;
using HR.Service.Roles.IRoleService;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using C = HR.Core.Constants;
namespace HR.Areas.Account.Controllers
{
    public class RoleRightsController : BaseController
    {
        // GET: Account/RoleRights
        public JsonResult GetRoles()
        {
            JsonResult result = new JsonResult();
            List<Role> Roles = RoleRightService.GetRole<Role>().ToList();
            result = Json(new { sucess = true, Roles = Roles }, JsonRequestBehavior.AllowGet);
            return result;
        }


        public JsonResult SaveEmployeeRoles(Role role)
        {
            JsonResult result = new JsonResult();

            if (role != null)
            {
                try
                {
                    Role _role = new Role();
                    if (role.Id > 0)
                    {
                        _role.ModifiedBy = USER_OBJECT.UserName;
                        _role.ModifiedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    else
                    {
                        _role.CreatedBy = USER_OBJECT.UserName;
                        _role.CreatedOn = DateTimeConverter.SingaporeDateTimeConversion(DateTime.Now);
                    }
                    _role.RoleCode = role.RoleCode;
                    _role.RoleDescription = role.RoleDescription;
                    _role.IsActive = role.IsActive;
                    RoleRightService.Save(_role);
                    result = Json(new { sucess = true, message = "Sent successfully" }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    if (ex.InnerException != null && !string.IsNullOrEmpty(ex.InnerException.Message))
                        return Json(new { success = false, message = ex.InnerException.Message }, JsonRequestBehavior.DenyGet);
                }
            }
            else
                result = Json(new { sucess = false, message = "No Data Found" }, JsonRequestBehavior.AllowGet);

            return result;
        }





        public ActionResult Roles()
        {
            return View();
        }
        public ActionResult RolerRights()
        {
            return View();
        }
    }
}