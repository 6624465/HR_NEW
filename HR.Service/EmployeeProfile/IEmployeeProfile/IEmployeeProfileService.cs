﻿using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service.EmployeeProfile.IEmployeeProfile
{
    public interface IEmployeeProfileService
    {
        #region EmployeeProfile

        IQueryable<T> GetEmployeeProfileList<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeHeader;
        void SaveEmployeeProfile(EmployeeHeader EmployeePersonalInfo, bool autoCommit = true);
        EmployeeHeader GetEmployeeProfileDetailsById(int Id);

        IQueryable<T> GetEmployeeDocuments<T>(Expression<Func<T, bool>> predicate = null) where T : EmployeeDocument;
        void SaveEmployeeDocuments(EmployeeDocument employeeDocument, bool autoCommit = true);
        string GetNewEmployeeNumber(int BranchID, string DocumentId, string UserName);

        #endregion
    }
}
