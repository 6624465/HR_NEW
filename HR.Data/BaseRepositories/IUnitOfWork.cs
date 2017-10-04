using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Data.BaseRepositories
{
   public interface IUnitOfWork
    {
        ObjectResult<T> ExecuteStoreQuery<T>(string procedureName, IDictionary<string, object> values);
    }
}
