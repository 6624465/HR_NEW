using HR.Controllers;
using HR.Core;
using HR.Core.Models;
using HR.Core.Utilities;
using Ninject;
using System;
using System.Collections.Generic;
using System.Globalization;
using HR.Service.Securables.ISecurableService;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using C = HR.Core.Constants;
using HR.Models;
using System.Linq.Expressions;

namespace HR.Areas.Account.Controllers
{
    public class SecurableController : BaseController
    {
        // GET:  Account/Securable
        public ActionResult RolerRights()
        {
            return View();
        } 
        public JsonResult GetSecurables()
        {
            JsonResult result = new JsonResult();

            var securables = SecurableServices.GetSecurable<Securable>()
                          .GroupBy(a => new { a.RegistrationType_LookUpId })
                            .Select(r => new
                            {
                                id = r.Select(x => x.SecurableID),
                                registrationType = r.Key.RegistrationType_LookUpId,
                                RegistrationTypeName = r.Select(x => x.RegistrationType.LookUpDescription).Distinct().FirstOrDefault(),
                                IsChecked = false,
                                pageList = r.GroupBy(b => new { b.PageID })
                                    .Select(p => new
                                    {
                                        id = p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.SecurableID).FirstOrDefault(),
                                        pageID = p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.PageID).FirstOrDefault(),
                                        PageName = p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.PageDescription).FirstOrDefault(),
                                        IsChecked = false,
                                        operationList = r.Where(x => x.PageID == p.Key.PageID && x.Type == 2)
                                        //r.GroupBy(c=>new { c.PageID })
                                        .Select(o => new
                                        {
                                            id = o.SecurableID,
                                            OperationID = o.OperationID,
                                            OperationName = o.OperationDescription,
                                            IsChecked = false,
                                            Access = false
                                        })
                                        .ToList()
                                    }).ToList()
                            }).ToList();



            result = Json(new { sucess = true, Securable = securables }, JsonRequestBehavior.AllowGet);
            return result;
        }

        public JsonResult GetSecurablebyId(string role)
        {
            JsonResult Result = new JsonResult();
            var rightsList = RoleRightService.GetRoleRights<RoleRight>().Where(x => x.RoleCode == role && x.CompanyId == USER_OBJECT.CompanyId).AsEnumerable();
            var securables = SecurableServices.GetSecurable<Securable>()
                                         .GroupBy(a => new { a.RegistrationType_LookUpId }).ToList()
                           .Select(r => new
                           {
                               id = r.Select(x => x.SecurableID),
                               registrationType = r.Key.RegistrationType_LookUpId,
                               RegistrationTypeName = r.Select(x => x.RegistrationType.LookUpDescription).Distinct().FirstOrDefault(),
                               IsChecked = false,
                               pageList = r.GroupBy(b => new { b.PageID })
                                  .Select(p => new
                                  {
                                      id = p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.SecurableID).FirstOrDefault(),
                                      pageID = p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.PageID).FirstOrDefault(),
                                      PageName = p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.PageDescription).FirstOrDefault(),// && rr.AccessRight !=0
                                      IsChecked = rightsList.Where(rr => rr.SecurableID == (p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.SecurableID).FirstOrDefault())).Count() > 0,
                                      Access = rightsList.Where(rr => rr.SecurableID == (p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.SecurableID).FirstOrDefault())).Count() > 0 ?
                                                  rightsList.Where(rr => rr.SecurableID == (p.Where(x => x.PageID == p.Key.PageID && x.Type == 1).Select(x => x.SecurableID).FirstOrDefault())).FirstOrDefault().AccessRight : 0,
                                      operationList = r.Where(x => x.PageID == p.Key.PageID && x.Type == 2)
                                      //r.GroupBy(c=>new { c.PageID })
                                      .Select(o => new
                                      {
                                          id = o.SecurableID,
                                          OperationID = o.OperationID,
                                          OperationName = o.OperationDescription,
                                          IsChecked = rightsList.Where(rr => rr.SecurableID == (o.SecurableID)).Count() > 0,

                                      })
                                      .ToList()
                                  }).ToList()
                           }).ToList();
            Result = Json(new { sucess = true, Securable = securables }, JsonRequestBehavior.AllowGet);
            return Result;
        }
        public IQueryable<T> IsChecked<T>(Expression<Func<T, bool>> predicate = null) where T : RoleRight
        {
            var rightsList = RoleRightService.GetRoleRights<RoleRight>().Where(x => x.CompanyId == USER_OBJECT.CompanyId).OfType<T>();
            return rightsList.Where(predicate);

        }

        public JsonResult SaveSecurables(string role, List<SecurableViewModel> securableViewModel)
        {
            JsonResult result = new JsonResult();
            List<RoleRight> roleRightsList = new List<RoleRight>();
            foreach (var item in securableViewModel)
            {
                RoleRight roleRights = null;
                roleRights = RoleRightService.GetRoleRights<RoleRight>(rr => rr.SecurableID == item.Id && rr.RoleCode.ToLower() == role.ToLower() && rr.AccessRight > 0).FirstOrDefault();

                if (item.IsChecked)
                {
                    if (roleRights == null)
                    {
                        roleRights = new RoleRight();
                    }
                    roleRights.CompanyId = USER_OBJECT.CompanyId;
                    roleRights.RoleCode = role;
                    roleRights.SecurableID = item.Id;
                    roleRights.AccessRight = Convert.ToInt16(item.Access);

                    roleRightsList.Add(roleRights);
                }
            }
            RoleRightService.SaveRoleRights(roleRightsList);
            return result;
        }
    }


   
}