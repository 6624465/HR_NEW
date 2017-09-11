namespace HR.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Core.Models;
    using HR.Core;
    public class HRDataContext : DbContext
    {
        #region Constructor
        public HRDataContext()
            : base("name=HRDataContext")
        {
           
        }
        #endregion

        #region Tables

        public virtual DbSet<LookUp> LookUps { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<HolidayList> HolidayLists { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<EmployeeLeaveList> EmployeeLeaveLists { get; set; }
        public virtual DbSet<EmployeeHeader> EmployeeHeaders { get; set; }
        public virtual DbSet<EmployeePersonalInfo> EmployeePersonalInfoes { get; set; }
        public virtual DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
        public virtual DbSet<EmployeeWorkDetail> EmployeeWorkDetails { get; set; }

        #endregion

        #region OnModelCreating
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeLeaveList>().ToTable("EmployeeLeaveLists", "Leave");
            //modelBuilder.Entity<LookUp>().Map<LeaveType>(m => { m.Requires("DiscriminatorTypeId").HasValue(4); });

        }
        #endregion
    }
}
