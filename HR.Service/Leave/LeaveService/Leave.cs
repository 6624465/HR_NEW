using HR.Core.Models;
using HR.Data.BaseRepositories;
using HR.Service.Leave.ILeaveService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.Leave.LeaveService
{
    public class Leave : ILeave
    {
        #region Properties
        public IRepository<EmployeeLeaveList> EmployeeLeaveListRepository;
        #endregion

        #region Constructor
        public Leave(Repository<EmployeeLeaveList> EmployeeLeaveListRepository)
        {
            this.EmployeeLeaveListRepository = EmployeeLeaveListRepository;
        }
        #endregion

        #region EmployeeLeaveList

        public IQueryable<T> GetEmployeeLeaveList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeLeaveList
        {
            var query = EmployeeLeaveListRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public void SaveEmployeeLeaveList(EmployeeLeaveList employeeLeaveList)
        {
            if (employeeLeaveList.Id == 0)
                EmployeeLeaveListRepository.Insert(employeeLeaveList);
            else
                EmployeeLeaveListRepository.Update(employeeLeaveList);
        }

        public EmployeeLeaveList GetEmployeeLeaveListById(int id)
        {
         return EmployeeLeaveListRepository.GetById(id);
        }

        #endregion


    }
}
