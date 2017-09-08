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
        public IRepository<EmployeeHeader> EmployeeHeaderRepository { get; set; }
        #endregion

        public IQueryable<T> GetEmployeeHeader<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeHeader
        {
            var query = EmployeeHeaderRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
           
        }

        public void SaveEmployeeHeader(EmployeeHeader employeeHeader)
        {
            if (employeeHeader.Id == 0)
                EmployeeHeaderRepository.Insert(employeeHeader);
            else
                EmployeeHeaderRepository.Update(employeeHeader);
        }
        public EmployeePersonalInfo GetEmployeeProfileDetailsById(int id)
        {
            return EmployeePersonalInfoRepository.GetById(id);
        }
    }
}