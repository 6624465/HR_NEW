using HR.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using HR.Core;
using HR.Core.Models;

namespace HR.Service.Master.IMasterService
{
    public interface ILookUpCodeService
    {
        #region EmployeeType
        void Save(LookUp lookUpData);
        IQueryable<T> GetLookUp<T>(Expression<Func<T, bool>> predicate = null) where T : LookUp;
        LookUp GetLookUpType(int LookUpID);

        IQueryable<T> GetEmployeeList<T>(Expression<Func<T, bool>> predicate = null) where T : Employee;
        #endregion
    }
}
