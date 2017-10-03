using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class SecurableViewModel
    {

        public bool IsChecked { get; set; }
        public int Id { get; set; }
        public string name { get; set; }
        public string type { get; set; }

        public string Access { get; set; }
        public int RoleRightId { get; set; }
        public int securableitem { get; set; }
        public string OperationID { get; set; }
        public int AccessRight { get; set; }
        public string PageId { get; set; }
        public string PageName { get; set; }

    }
}