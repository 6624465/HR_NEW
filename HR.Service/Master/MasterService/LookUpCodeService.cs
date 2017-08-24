using HR.Data;
using HR.Data.BaseRepositories;
using HR.Service.Master.IMasterService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using HR.Core;
using HR.Core.Models;

namespace HR.Service.Master.MasterService
{
    public class LookUpCodeService: ILookUpCodeService
    {
        public IRepository<LookUp> LookUpCodeRepository;
        public IRepository<Employee> EmployeeRepository;
        public LookUpCodeService(Repository<LookUp> LookUpCodeRepository, Repository<Employee> EmployeeRepository) {
            this.LookUpCodeRepository = LookUpCodeRepository;
            this.EmployeeRepository = EmployeeRepository;
        }
        public void Save(LookUp lookUp)
        {
            if (lookUp.LookUpID == 0)
                LookUpCodeRepository.Insert(lookUp);
            else
                LookUpCodeRepository.Update(lookUp);
        }

        public IQueryable<T> GetLookUp<T>(Expression<Func<T, bool>> predicate = null) where T : LookUp
        {
            var query = LookUpCodeRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public LookUp GetLookUpType(int LookUpID)
        {
            return LookUpCodeRepository.GetById(LookUpID);
        }
        //public Employee GetEmployeeType(int id)
        //{
        //    return EmployeeCodeRepository.GetById(id);
        //}
        public IQueryable<T> GetEmployeeList<T>(Expression<Func<T, bool>> predicate = null) where T : Employee
        {
            var query = EmployeeRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }


    }
}
