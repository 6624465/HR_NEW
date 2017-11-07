using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Core.Models;
using System.Linq.Expressions;

namespace HR.Service.Securables.ISecurableService
{
    public interface ISecurableServices
    {
        IQueryable<T> GetSecurable<T>(Expression<Func<T, bool>> predicate = null) where T : Securable;
    }
}
