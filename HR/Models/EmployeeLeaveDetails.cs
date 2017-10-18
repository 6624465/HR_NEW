using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class EmployeeLeaveDetails
    {
        public int GrantedLeaves { get; set; }
        public int RemaingStatusCount { get; set; }
        public int AppliedStatusCount { get; set; }

    }
}