using HR.Core.Models;
using HR.Data.BaseRepositories;
using HR.Service.CompanyDetails.ICompany;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.CompanyDetails.CompanyServiceDetails
{
    public class CompanyService : ICompanyService
    {
        #region Properties
        [Inject]
        public IRepository<Company> CompanyRepository { get; set; }
        [Inject]
        public IRepository<Country> CountryRepository { get; set; }
        [Inject]
        public IRepository<Branch> BranchRepository { get; set; }
        [Inject]
        public IRepository<HolidayList> HolidayListRepository { get; set; }
        #endregion


        #region Company

        public Company GetCompany(int Id)
        {
            return CompanyRepository.GetById(Id);
        }
        public IQueryable<T> GetCompanyDetails<T>(Expression<Func<T, bool>> predicate = null) where T : Company
        {
            var query = CompanyRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }
        public void SaveCompanyDetails(Company company, bool autoCommit = true)
        {
            if (company.Id == 0)
                CompanyRepository.Insert(company);
            else
                CompanyRepository.Update(company);

            if (autoCommit)
                CompanyRepository.Commit();
        }
        public IQueryable<T> GetCountries<T>(Expression<Func<T, bool>> predicate = null) where T : Country
        {
            var query = CountryRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);

            return query;
        }
        #endregion

        #region Branch

        public IQueryable<T> GetBranchDetails<T>(Expression<Func<T, bool>> predicate = null) where T : Branch
        {
            var query = BranchRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }
        public Branch GetBranch(int Id)
        {
            return BranchRepository.GetById(Id);
        }

        public void SaveBranchDetails(Branch branch, bool autoCommit =true)
        {
            if (branch.BranchID == 0)
                BranchRepository.Insert(branch);
            else
                BranchRepository.Update(branch);

            if (autoCommit)
                CompanyRepository.Commit();
        }
        #endregion

        #region HolidayList
        public void SaveHolidayList(HolidayList holidayList, bool autoCommit = true)
        {
            if (holidayList.Id == 0)
                HolidayListRepository.Insert(holidayList);
            else
                HolidayListRepository.Update(holidayList);

            if (autoCommit)
                HolidayListRepository.Commit();

        }

        public IQueryable<T> GetHolidayList<T>(Expression<Func<T, bool>> predicate = null) where T : HolidayList
        {
            var query = HolidayListRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public HolidayList GetHolidayListById(int Id)
        {
            return HolidayListRepository.GetById(Id);
        }

        #endregion
    }
}
