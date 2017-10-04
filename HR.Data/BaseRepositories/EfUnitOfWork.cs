using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Data.BaseRepositories
{
    public class EfUnitOfWork: IUnitOfWork,IDisposable
    {
        public readonly HRDataContext hrDbContext;

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public ObjectResult<T> ExecuteStoreQuery<T>(string procedureName, IDictionary<string, object> values)
        {
            var parameterList = new List<SqlParameter>();

            if (values != null)
            {
                foreach (var key in values.Keys)
                    parameterList.Add(new SqlParameter(key, values[key]));
            }

            return ((IObjectContextAdapter)hrDbContext).ObjectContext.ExecuteStoreQuery<T>(procedureName, parameterList.ToArray());
        }
    }
}
