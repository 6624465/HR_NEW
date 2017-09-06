using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Core.Models
{
   public class EmployeeWorkDetail
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual EmployeePersonalInfo EmployeePersonalInfo { get; set; }
        public virtual Branch Branch  { get; set; }
        public DateTime? JoiningDate { get; set; }
        public DateTime? ConfirmationDate { get; set; }
        public int ProbationPeriod { get; set; }
        public int NoticePeriod { get; set; }
    }
}
