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

namespace HR.Service.Account.AccountService
{
    public class LogInLogOutService : ILogInLogOutService
    {
        #region Properties
        [Inject]
        public IRepository<User> UsersRepository { get; set; }

        #endregion

        public IQueryable<T> GetUser<T>(Expression<Func<T, bool>> predicate = null) where T : User
        {
            var query = UsersRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);

            return query;
        }

        public void Save(User user, bool autoCommit = true)
        {
            if (!string.IsNullOrWhiteSpace(user.UserID) && !string.IsNullOrWhiteSpace(user.UserName))
                UsersRepository.Update(user);

            if (autoCommit)
                UsersRepository.Commit();

        }
    }
}
