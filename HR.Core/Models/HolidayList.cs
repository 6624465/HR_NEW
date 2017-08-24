namespace HR.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Master.HolidayLists")]
    public partial class HolidayList
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        [Required]
        [StringLength(200)]
        public string Description { get; set; }

        public int BranchID { get; set; }

        [Required]
        [StringLength(25)]
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        [StringLength(25)]
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public int? CountryId { get; set; }
        //public virtual Country Country { get; set; }
    }
}
