using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.Leave.ILeaveService
{
    public interface ILeave
    {
        #region EmployeeLeaveList
        IQueryable<T> GetLeaveList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeLeaveList;
        void SaveLeaveList(EmployeeLeaveList employeeLeaveList, bool autoCommit = true);
        EmployeeLeaveList GetLeaveListById(int id);
        #endregion


    }
}
