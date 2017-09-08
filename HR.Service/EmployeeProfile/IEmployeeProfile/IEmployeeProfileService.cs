using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.EmployeeProfile.IEmployeeProfile
{
    public interface IEmployeeProfileService
    {
        #region EmployeeProfile

        IQueryable<T> GetEmployeeProfileList<T>(Expression<Func<T, bool>> predicate = null) where T :EmployeePersonalInfo;
        void SaveEmployeeProfile(EmployeePersonalInfo EmployeePersonalInfo);
        EmployeePersonalInfo GetEmployeeProfileDetailsById(int Id);
        #endregion
    }
}
