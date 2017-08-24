namespace HR.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Config.LookUp")]
    public  class LookUp
    {
        public int LookUpID { get; set; }

        [Required]
        [StringLength(50)]
        public string LookUpCode { get; set; }

        [Required]
        [StringLength(50)]
        public string LookUpDescription { get; set; }

        [Required]
        [StringLength(50)]
        public string LookUpCategory { get; set; }

        public bool IsActive { get; set; }

        [Required]
        [StringLength(25)]
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        [StringLength(25)]
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
