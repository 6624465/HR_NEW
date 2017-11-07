using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Service.Securables.ISecurableService;
using Ninject;
using HR.Data.BaseRepositories;
using HR.Core.Models;
using System.Linq.Expressions;

namespace HR.Service.Securables.SecurableService
{
    public class SecurableServices : ISecurableServices
    {

        [Inject]
        public IRepository<Securable> SecurablesRepository { get; set; }

        public IQueryable<T> GetSecurable<T>(Expression<Func<T, bool>> predicate = null) where T : Securable
        {
            //throw new NotImplementedException();
            var query = SecurablesRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }
    }
}
