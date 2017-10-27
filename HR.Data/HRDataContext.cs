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
            //this.Configuration.LazyLoadingEnabled = false;
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

        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Securable> Securable { get; set; }
        public virtual DbSet<RoleRight> RoleRights { get; set; }
        public virtual DbSet<LeaveHeader> LeaveHeader { get; set; }
        public virtual DbSet<LeaveDetail> LeaveDetail { get; set; }
        #endregion

        #region OnModelCreating
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeLeaveList>().ToTable("EmployeeLeaveLists", "Leave");
            modelBuilder.Entity<RoleRight>().ToTable("RoleRights", "Security");
            //modelBuilder.Entity<LookUp>().Map<LeaveType>(m => { m.Requires("DiscriminatorTypeId").HasValue(4); });

            modelBuilder.Entity<Securable>().Ignore(p => p.RegistrationTypeDescription);
        }
        #endregion
    }
}
