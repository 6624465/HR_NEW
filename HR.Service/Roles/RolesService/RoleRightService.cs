using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using HR.Core.Models;
using HR.Service.Roles.IRoleService;
using Ninject;
using HR.Data.BaseRepositories;
namespace HR.Service.Roles.RolesService
{
    public class RoleRightService : IRoleRightService
    {

        [Inject]
        public IRepository<Role> RolesRepository { get; set; }

        [Inject]
        public IRepository<RoleRight> RoleRightRepository { get; set; }

        public IQueryable<T> GetRole<T>(Expression<Func<T, bool>> predicate = null) where T : Role
        {
            // throw new NotImplementedException();
            var query = RolesRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }


        public void Save(Role role, bool autoCommit = true)
        {
            if (role.Id == 0)
                RolesRepository.Insert(role);
            else
                RolesRepository.Update(role);
            if (autoCommit == true)
                RolesRepository.Commit();
        }

        public IQueryable<T> GetRoleRights<T>(Expression<Func<T, bool>> predicate = null) where T : RoleRight
        {
            // throw new NotImplementedException();
            var query = RoleRightRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public void RemoveroleRight(RoleRight roleRight, bool autoCommit = true)
        {
            if (roleRight.Id > 0)
                RoleRightRepository.Remove(roleRight);

            if (autoCommit)
                RoleRightRepository.Commit();
        }

        public void RemoveroleRight(List<RoleRight> roleRights, bool autoCommit = true)
        {
            foreach (RoleRight roleRight in roleRights)
            {
                RemoveroleRight(roleRight);
            }
        }
        public void SaveRoleRights(RoleRight roleRights, bool autoCommit = true)
        {
            if (roleRights.Id == 0)
                RoleRightRepository.Insert(roleRights);
            else
                RoleRightRepository.Update(roleRights);

            if (autoCommit == true)
                RoleRightRepository.Commit();
        }

        public void SaveRoleRights(List<RoleRight> roleRights, bool autoCommit = true)
        {
            foreach (RoleRight roleRight in roleRights)
            {
                SaveRoleRights(roleRight);
            }
        }


    }
}
