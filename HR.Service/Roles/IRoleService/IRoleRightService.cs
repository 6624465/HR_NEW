using HR.Core.Models;
using HR.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.Roles.IRoleService
{
   public interface IRoleRightService
    {
        IQueryable<T> GetRole<T>(Expression<Func<T, bool>> predicate = null) where T : Role;
        void Save(Role role, bool autoCommit = true);
        IQueryable<T> GetRoleRights<T>(Expression<Func<T, bool>> predicate = null) where T : RoleRight;
        void SaveRoleRights(RoleRight roleRights, bool autoCommit = true);
        void SaveRoleRights(List<RoleRight> roleRights, bool autoCommit = true);
        void RemoveroleRight(RoleRight roleRight, bool autoCommit = true);
        void RemoveroleRight(List<RoleRight> roleRight, bool autoCommit = true);
    }
}
