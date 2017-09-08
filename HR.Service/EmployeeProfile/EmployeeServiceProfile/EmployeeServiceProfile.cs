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
namespace HR.Service.EmployeeProfile.EmployeeServiceProfile
{
    public class EmployeeServiceProfile : IEmployeeProfileService
    {
        #region Properties
        [Inject]
        public IRepository<EmployeePersonalInfo> EmployeePersonalInfoRepository { get; set; }
        #endregion

        public IQueryable<T> GetEmployeeProfileList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeePersonalInfo
        {
            var query = EmployeePersonalInfoRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
           
        }

        public void SaveEmployeeProfile(EmployeePersonalInfo EmployeePersonalInfo)
        {
            throw new NotImplementedException();
            if (EmployeePersonalInfo.Id == 0)
                EmployeePersonalInfoRepository.Insert(EmployeePersonalInfo);
            else
                EmployeePersonalInfoRepository.Update(EmployeePersonalInfo);
        }
    }
}