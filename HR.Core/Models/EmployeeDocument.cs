using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Script.Serialization;

namespace HR.Core.Models
{
    public class EmployeeDocument
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
       
        public int DocumentType { get; set; }
        //public virtual LookUp DocumentType { get; set; }

        public int EmployeeHeaderId { get; set; }
        //[ScriptIgnore(ApplyToOverrides = true)]
        //public virtual EmployeeHeader EmployeeHeader { get; set; }
        public string FileName { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
