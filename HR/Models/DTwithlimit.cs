using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class DTwithlimit
    {
        public Int16 limit { get; set; }
        public string sortColumn { get; set; }
        public string sortType { get; set; }
        public string LookUpCategory { get; set; }
        public Int64 recordsCount { get; set; }
        public Int16 offset { get; set; }
    }
}