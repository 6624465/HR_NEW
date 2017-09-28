﻿namespace HR.Core.Models
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Web.Script.Serialization;
    
    public class RoleRight
    {
        // public int Id { get; set; }

        // public int CompanyId { get; set; }//if it is not access rename the property as CompanyaId
        // //public virtual Company Company { get; set; }
        // public string RoleCode { get; set; }
        // //public int SecurableId { get; set; }//if it is not access rename the property as Securableid
        // //
        //// public virtual List<Securable> Securable { get; set; }
        // public Int16 AccessRight { get; set; }
        // public System.Int64 SecurableID { get; set; }

        // public virtual Securable Securables { get; set; }
        public int Id { get; set; }

        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string RoleCode { get; set; }
        public Int16 AccessRight { get; set; }
        public int SecurableID { get; set; }

        public virtual Securable Securable { get; set; }
    }
}