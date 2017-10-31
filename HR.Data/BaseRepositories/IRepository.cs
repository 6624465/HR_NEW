using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Data.BaseRepositories
{
    public interface IRepository<T> where T : class
    {
        void Commit();
        T GetById(object id);
        void Insert(T entity);
        void Update(T entity, bool setToChanged = true);
        void Remove(T entity);
        IQueryable<T> FindAll(bool disableProxies = false);
        IQueryable<T> Table { get; }
        ObjectResult<T> ExecuteStoreQuery<T>(string procedureName, IDictionary<string, object> values);
    }
}
