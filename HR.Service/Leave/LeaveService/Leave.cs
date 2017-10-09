using HR.Core.Models;
using HR.Data.BaseRepositories;
using HR.Service.Leave.ILeaveService;
using Ninject;
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
        [Inject]
        public IRepository<EmployeeLeaveList> EmployeeLeaveListRepository { get; set; }
        #endregion


        #region EmployeeLeaveList

        public IQueryable<T> GetLeaveList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeLeaveList
        {
            var query = EmployeeLeaveListRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public void SaveLeaveList(EmployeeLeaveList employeeLeaveList, bool autoCommit = true)
        {
            if (employeeLeaveList.Id == 0)
                EmployeeLeaveListRepository.Insert(employeeLeaveList);
            else
                EmployeeLeaveListRepository.Update(employeeLeaveList);

            if (autoCommit == true)
                EmployeeLeaveListRepository.Commit();
        }

        public EmployeeLeaveList GetLeaveListById(int id)
        {
         return EmployeeLeaveListRepository.GetById(id);
        }

        #endregion


    }
}
