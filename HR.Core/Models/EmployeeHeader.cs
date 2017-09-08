using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Core.Models
{
   public class EmployeeHeader
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Nationality{ get; set; }
        public int IDType { get; set; }
        public string IDNumber { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public virtual Address Address { get; set; }
        public virtual EmployeePersonalInfo EmployeePersonalInfo { get; set; }
        public virtual EmployeeWorkDetail EmployeeWorkDetail { get; set; }
        public virtual EmployeeDocument EmployeeDocument { get; set; }
    }
}
