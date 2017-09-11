using HR.Core.Models;
using HR.Data.BaseRepositories;
using HR.Service.EmployeeProfile.IEmployeeProfile;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
namespace HR.Service.EmployeeProfile.EmployeeProfileService
{
    public class EmployeeProfileService : IEmployeeProfileService
    {
        #region Properties
        [Inject]
        public IRepository<EmployeeHeader> EmployeeRepository { get; set; }
        #endregion

        public IQueryable<T> GetEmployeeProfileList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeHeader
        {
            var query = EmployeeRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;

        }

        public void SaveEmployeeProfile(EmployeeHeader employeeHeader)
        {
            if (employeeHeader.Id == 0)
                EmployeeRepository.Insert(employeeHeader);
            else
                EmployeeRepository.Update(employeeHeader);
        }
        public EmployeeHeader GetEmployeeProfileDetailsById(int id)
        {
            return EmployeeRepository.GetById(id);
        }
    }
}