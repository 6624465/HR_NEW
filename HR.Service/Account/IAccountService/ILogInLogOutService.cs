using HR.Core.Models;
using HR.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.Account.IAccountService
{
    public interface ILogInLogOutService
    {
        IQueryable<T> GetUser<T>(Expression<Func<T, bool>> predicate = null) where T : User;
        void Save(User user);
    }
}
