using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.Core.Models
{
    [Table("[Master].[LeaveHeader]")]
    public class LeaveHeader
    {
        public int Id { get; set; }
        public int BranchID { get; set; }
        public Int16 LeaveYear { get; set; }
        public int PeriodicityType { get; set; }
        public int PeriodType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int LeaveSchemeType { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
       public virtual List<LeaveDetail> LeaveDetail { get; set; }
    }
}
