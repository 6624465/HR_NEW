using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class EmployeeLeaveViewModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName{ get; set; }
        public int LeaveTypeId { get; set; }
        public string LeaveType { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int Days { get; set; }
        public string Reason { get; set; }
        public string Remarks { get; set; }
        public int TeamLeadId { get; set; }
        public string Status { get; set; }
        public DateTime ApplyDate { get; set; }
    }
}