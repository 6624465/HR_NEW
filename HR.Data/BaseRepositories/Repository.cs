using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace HR.Data.BaseRepositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public readonly HRDataContext hrDbContext;
        private IDbSet<T> entities;

        public Repository(HRDataContext context)
        {
            this.hrDbContext = context;
        }
        public T GetById(object id)
        {
            return this.Entities.Find(id);
        }
        public void Insert(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                this.hrDbContext.Set<T>().Add(entity);
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;

                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += string.Format("Property: {0} Error: {1}",
                        validationError.PropertyName, validationError.ErrorMessage) + Environment.NewLine;
                    }
                }

                var fail = new Exception(msg, dbEx);
                throw fail;
            }
        }
        public void Update(T entity, bool setToChanged = true)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                if (setToChanged)
                    hrDbContext.Entry(entity).State = EntityState.Modified;
                else
                    this.hrDbContext.Set<T>().Attach(entity);
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += Environment.NewLine + string.Format("Property: {0} Error: {1}",
                        validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                var fail = new Exception(msg, dbEx);
                throw fail;
            }
        }
        public void Remove(T entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException("entity");
                }
                this.Entities.Remove(entity);
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = string.Empty;

                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        msg += Environment.NewLine + string.Format("Property: {0} Error: {1}",
                        validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                var fail = new Exception(msg, dbEx);
                throw fail;
            }
        }

        public IQueryable<T> FindAll(bool disableProxies = false)
        {
            try
            {
                if (disableProxies)
                    ((IObjectContextAdapter)hrDbContext).ObjectContext.ContextOptions.ProxyCreationEnabled = false;

                return hrDbContext.Set<T>();
            }
            finally
            {
                if (disableProxies)
                    ((IObjectContextAdapter)hrDbContext).ObjectContext.ContextOptions.ProxyCreationEnabled = true;
            }
        }

        public void Commit()
        {
            for (int i = 0; i < 10; i++)
            {
                try
                {
                    this.hrDbContext.Configuration.ValidateOnSaveEnabled = false;
                    this.hrDbContext.Configuration.AutoDetectChangesEnabled = false;
                    using (var scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.Snapshot }))
                    {
                        this.hrDbContext.SaveChanges();
                        scope.Complete();
                    }
                    this.hrDbContext.Configuration.ValidateOnSaveEnabled = true;
                    this.hrDbContext.Configuration.AutoDetectChangesEnabled = true;
                    break;
                }
                catch (DbUpdateException ex)
                {
                    var innerEx = ex.InnerException;
                    if (innerEx.InnerException != null && innerEx.InnerException is System.Data.SqlClient.SqlException)
                        innerEx = innerEx.InnerException;

                    var message = innerEx != null ? innerEx.Message.ToLower() : string.Empty;

                    if (!string.IsNullOrEmpty(message)
                        && (message.Contains("deadlock victim")
                            || message.Contains("timeout")))
                    {
                        continue;
                    }
                    else
                    {
                        throw ex;
                    }
                }
            }
        }

        public virtual IQueryable<T> Table
        {
            get
            {
                return this.Entities;
            }
        }

        private IDbSet<T> Entities
        {
            get
            {
                if (entities == null)
                {
                    entities = hrDbContext.Set<T>();
                }
                return entities;
            }
        }
    }
}
