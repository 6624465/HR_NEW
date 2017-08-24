using HR.Core.Models;
using HR.Data.BaseRepositories;
using HR.Service.CompanyDetails.ICompany;
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
        public IRepository<Company> CompanyRepository;
        public IRepository<Country> CountryRepository;
        public IRepository<Branch> BranchRepository;
        public IRepository<HolidayList> HolidayListRepository;
        #endregion

        #region Constructor
        public CompanyService(Repository<Company> CompanyRepository, Repository<Country> CountryRepository, 
            Repository<Branch> BranchRepository, Repository<HolidayList> HolidayListRepository)
        {
            this.CompanyRepository = CompanyRepository;
            this.CountryRepository = CountryRepository;
            this.BranchRepository = BranchRepository;
            this.HolidayListRepository = HolidayListRepository;
        }

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
        public void SaveCompanyDetails(Company company)
        {
            if (company.Id == 0)
                CompanyRepository.Insert(company);
            else
                CompanyRepository.Update(company);
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

        public void SaveBranchDetails(Branch branch)
        {
            if (branch.BranchID == 0)
                BranchRepository.Insert(branch);
            else
                BranchRepository.Update(branch);
        }
        #endregion

        #region HolidayList
        public void SaveHolidayList(HolidayList holidayList)
        {
            if (holidayList.Id == 0)
                HolidayListRepository.Insert(holidayList);
            else
                HolidayListRepository.Update(holidayList);


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
