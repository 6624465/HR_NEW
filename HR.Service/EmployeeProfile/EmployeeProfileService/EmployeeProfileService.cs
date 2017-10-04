using HR.Core.Models;
using HR.Data;
using HR.Data.BaseRepositories;
using HR.Service.EmployeeProfile.IEmployeeProfile;
using Ninject;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
namespace HR.Service.EmployeeProfile.EmployeeProfileService
{
    public class EmployeeProfileService : IEmployeeProfileService
    {
        #region Properties
        [Inject]
        public IRepository<EmployeeHeader> EmployeeRepository { get; set; }

        [Inject]
        public IRepository<EmployeeDocument> EmployeeDocumentRepository { get; set; }

        #endregion

        public IQueryable<T> GetEmployeeProfileList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeHeader
        {
            var query = EmployeeRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;

        }

        public void SaveEmployeeProfile(EmployeeHeader employeeHeader, bool autoCommit =true)
        {
            if (employeeHeader.Id == 0)
                EmployeeRepository.Insert(employeeHeader);
            else
                EmployeeRepository.Update(employeeHeader);

            if (autoCommit == true)
                EmployeeRepository.Commit();

        }
        public EmployeeHeader GetEmployeeProfileDetailsById(int id)
        {
            return EmployeeRepository.GetById(id);
        }

        public IQueryable<T> GetEmployeeDocuments<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeDocument
        {
            var query = EmployeeDocumentRepository.FindAll().OfType<T>();
            if (predicate != null)
                query = query.Where(predicate);
            return query;
        }

        public void SaveEmployeeDocuments(EmployeeDocument employeeDocument, bool autoCommit = true)
        {
            if (employeeDocument.Id == 0)
                EmployeeDocumentRepository.Insert(employeeDocument);
            else
                EmployeeDocumentRepository.Update(employeeDocument);

            if (autoCommit == true)
                EmployeeDocumentRepository.Commit();

        }
        //public string GetNewDocumentNo(Int64 BranchID, string DocumentId)
        //{
        //    using (HRDataContext entities = new HRDataContext())
        //    {
        //        entities.Database.Exists();
           
        //    return entities.Database.SqlQuery<string>("Exec [Utility].[usp_GenerateDocumentNumber2] @BranchID, @DocumentId, @TrxDate, @UserId",
        //        new SqlParameter("BranchID", BranchID),
        //        new SqlParameter("DocumentId", DocumentId),
        //        new SqlParameter("TrxDate", DateTime.Now.Date),
        //        new SqlParameter("UserId", "SYSTEM")).FirstOrDefault<string>();
        //        }
        //}
        //public string GetNewEmployeeNumber(Int64 BranchID, string DocumentId, string UserName)
        //{
        //    IDictionary<string, object> parameters = new Dictionary<string, object>();
        //    parameters.Add(new KeyValuePair<string, object>("BranchID", BranchID));
        //    parameters.Add(new KeyValuePair<string, object>("DocumentId", DocumentId));
        //    parameters.Add(new KeyValuePair<string, object>("TrxDate", DateTime.Now.Date));
        //    parameters.Add(new KeyValuePair<string, object>("UserId", DateTime.Now.Date));
        //    var result =  UnitOfWork.ExecuteStoreQuery<int>("[Utility].[usp_GenerateDocumentNumber] @BranchID, @DocumentId, @TrxDate, @UserId", parameters);
        //    return result.Single();
        //}


    }
}