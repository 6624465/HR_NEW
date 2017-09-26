using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Data.Account
{
    public class SessionObject
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string RoleCode { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public int CompanyId { get; set; }
    }
}
