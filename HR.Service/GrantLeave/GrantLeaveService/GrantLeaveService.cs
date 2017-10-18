using HR.Service.GrantLeave.IGrantLeaveService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.Core.Models;
using Ninject;
using HR.Data.BaseRepositories;
using System.Linq.Expressions;

namespace HR.Service.GrantLeave.GrantLeaveService
{
    public class GrantLeaveService : IGrantLeave
    {

        [Inject]
        public IRepository<LeaveHeader> LeaveHeaderRepository { get; set; }

        public LeaveHeader Get(int Id)
        {
            return LeaveHeaderRepository.GetById(Id);
        }

        public IQueryable<T> GetAll<T>(Expression<Func<T, bool>> Predicate = null) where T : LeaveHeader
        {
         var query =LeaveHeaderRepository.FindAll().OfType<T>();
            if (Predicate != null)
            {
                query.Where(Predicate);
            }
            return query;
        }
        public void Save(LeaveHeader LeaveHeader, bool autoCommit = true)
        {
            if (LeaveHeader.Id == 0)
                LeaveHeaderRepository.Insert(LeaveHeader);
            else
                LeaveHeaderRepository.Update(LeaveHeader);

            if (autoCommit)
                LeaveHeaderRepository.Commit();
        }
    }
}
