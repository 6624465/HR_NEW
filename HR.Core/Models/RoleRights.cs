namespace HR.Core.Models
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Web.Script.Serialization;
    
    public class RoleRight
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string RoleCode { get; set; }
        public Int16 AccessRight { get; set; }
        public int SecurableID { get; set; }
       
       public virtual Securable Securable { get; set; }
    }
}
