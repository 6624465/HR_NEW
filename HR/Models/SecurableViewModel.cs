using HR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class SecurableViewModel
    {

        public int Id { get; set; }
        public bool IsActive { get; set; }       
        public string Name { get; set; }
        public string Type { get; set; }
        public Int16 Access { get; set; }
        public int RoleRightId { get; set; }
        public string RoleCode { get; set; }
        public Int64 SecurableID { get; set; }
        public bool Checked { get; set; }
    }
}