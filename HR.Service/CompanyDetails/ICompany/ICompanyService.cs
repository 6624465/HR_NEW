using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using HR.Core.Models;

namespace HR.Service.CompanyDetails.ICompany
{
    public interface ICompanyService
    {
        #region Company
        Company GetCompany(int Id);
        IQueryable<T> GetCompanyDetails<T>(Expression<Func<T, bool>> predicate = null) where T : Company;
        void SaveCompanyDetails(Company company, bool autoCommit = true);

        #endregion

        #region Country
        IQueryable<T> GetCountries<T>(Expression<Func<T, bool>> predicate = null) where T : Country;
        Country GetCountryById(int id); 
        #endregion

        #region Branch
        Branch GetBranch(int Id);
        void SaveBranchDetails(Branch branch, bool autoCommit = true);
        IQueryable<T> GetBranchDetails<T>(Expression<Func<T, bool>> predicate = null) where T : Branch;
        #endregion

        #region HolidayList
        void SaveHolidayList(HolidayList holidayList, bool autoCommit = true);
        IQueryable<T> GetHolidayList<T>(Expression<Func<T, bool>> predicate = null) where T : HolidayList;
        HolidayList GetHolidayListById(int Id);
        #endregion
    }
}
