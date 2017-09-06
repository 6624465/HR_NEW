using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Core.Models
{
    public class EmployeeDocument
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual EmployeePersonalInfo EmployeePersonalInfo { get; set; }
        public virtual Branch Branch { get; set; }
        public int DocumentType { get; set; }
        public string FileName { get; set; }

    }
}
