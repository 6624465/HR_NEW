using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class LeaveHeaderViewModel
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int LeaveYear { get; set; }
        public string LeaveYearType { get; set; }

        public int PeriodicityType { get; set; }
        public string PeriodicityTypeDescription { get; set; }


        public int PeriodType { get; set; }

        public string PeriodTypeDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int LeaveSchemeType { get; set; }
        public string LeaveSchemeTypeDescription { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public virtual List<LeaveDetailViewModel> LeaveDetail { get; set; }
    }
}