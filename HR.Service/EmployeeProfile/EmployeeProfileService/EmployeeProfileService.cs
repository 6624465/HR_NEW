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

        HRDataContext hrDataContext = new HRDataContext();

        public IQueryable<T> GetEmployeeProfileList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeHeader
        {
           
                var query = hrDataContext.EmployeeHeaders
                                   .Include("EmployeePersonalInfo")
                                   .Include("EmployeeWorkDetail")
                                   .Include("Address")
                                   .ToList().OfType<T>();
                //var query = EmployeeRepository.FindAll().OfType<T>();
                if (predicate != null)
                    query = query.AsQueryable<T>().Where(predicate);

                return query.AsQueryable();
        }

        public void SaveEmployeeProfile(EmployeeHeader employeeHeader, bool autoCommit = true)
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
        public string GetNewEmployeeNumber(int BranchID, string DocumentId, string UserName)
        {
            HRDataContext entities = new HRDataContext();
            return entities.Database.SqlQuery<string>("Exec [Utility].[usp_GenerateDocumentNumber] @BranchID, @DocumentId, @TrxDate, @UserId",
                new SqlParameter("BranchID", BranchID),
                new SqlParameter("DocumentId", DocumentId),
                new SqlParameter("TrxDate", DateTime.Now.Date),
                new SqlParameter("UserId", UserName)).FirstOrDefault<string>();
        }
    }
}