using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.Core.Models
{
    [Table("[Master].[LeaveDetail]")]
    public partial class LeaveDetail
    {
       
        public int Id { get; set; }
        public int LeaveType { get; set; }

        public int TotalLeaves { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
        public int LeaveHeaderId { get; set; }
        public virtual LeaveHeader LeaveHeader { get; set; }
    }
}
