using HR.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HR.Core.Models
{
    public class EmployeeLeaveList
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual EmployeeHeader Employee { get; set; }
        public int LeaveTypeId { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int Days { get; set; }
        public string Reason { get; set; }
        public string Remarks { get; set; }
        public int TeamLeadId { get; set; }
        public string Status { get; set; }
        public DateTime ApplyDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
