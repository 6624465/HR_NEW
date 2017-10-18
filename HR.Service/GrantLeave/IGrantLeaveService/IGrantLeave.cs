using HR.Core.Models;
using HR.Data;
using HR.Data.BaseRepositories;
using HR.Service.Account.IAccountService;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.GrantLeave.IGrantLeaveService
{
    public  interface  IGrantLeave
    {
        void Save(LeaveHeader LeaveHeader, bool autoCommit = true);
        IQueryable<T> GetAll<T>(Expression<Func<T, bool>> Predicate = null) where T : LeaveHeader;
        LeaveHeader Get(int Id);
    }
}
