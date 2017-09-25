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
using Ninject;

namespace HR.Service.Master.MasterService
{
    public class LookUpCodeService: ILookUpCodeService
    {
        [Inject]
        public IRepository<LookUp> LookUpCodeRepository { get; set; }
        [Inject]
        public IRepository<EmployeePersonalInfo> EmployeeRepository { get; set; }

        [Inject]
        public IRepository<Address> AddressRepository { get; set; }

        public void Save(LookUp lookUp, bool autoCommit = true)
        {
            if (lookUp.LookUpID == 0)
                LookUpCodeRepository.Insert(lookUp);
            else
                LookUpCodeRepository.Update(lookUp);

            if (autoCommit)
                LookUpCodeRepository.Commit();
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
        public IQueryable<T> GetEmployeeList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeHeader
        {
            var query = EmployeeRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public void Save(Address address, bool autoCommit = true)
        {
            if (address.AddressId == 0)
                AddressRepository.Insert(address);
            else
                AddressRepository.Update(address);

            if (autoCommit)
                AddressRepository.Commit();
        }



    }
}
