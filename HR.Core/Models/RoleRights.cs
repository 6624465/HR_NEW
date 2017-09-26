namespace HR.Core.Models
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("[Security].[RoleRights]")]
    public class RoleRights
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }//if it is not access rename the property as CompanyaId
        //public virtual Company Company { get; set; }
        public string RoleCode { get; set; }
        //public int SecurableId { get; set; }//if it is not access rename the property as Securableid
        //public virtual List<Securable> Securables { get; set; }
        public Int16 AccessRight { get; set; }


        public Int64 SecurableID { get; set; }
    }
}
