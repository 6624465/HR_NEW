using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class LeaveDetailViewModel
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int LeaveType { get; set; }

        public string LeaveTypeDescription { get; set; }
        public bool IsChecked { get; set; }

        public int TotalLeaves { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
        public int LeaveHeaderId { get; set; }
        public virtual LeaveHeaderViewModel LeaveHeader { get; set; }
    }
}