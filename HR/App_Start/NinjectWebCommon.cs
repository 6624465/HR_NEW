[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(HR.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(HR.App_Start.NinjectWebCommon), "Stop")]

namespace HR.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Data.BaseRepositories;
    using Service.Account.IAccountService;
    using Service.Account.AccountService;
    using Service.Master.IMasterService;
    using Service.Master.MasterService;
    using Service.CompanyDetails.ICompany;
    using Service.CompanyDetails.CompanyServiceDetails;
    using Service.Leave.ILeaveService;
    using Service.Leave.LeaveService;
    using Service.EmployeeProfile.EmployeeProfileService;
    using Service.EmployeeProfile.IEmployeeProfile;
    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind(typeof(IRepository<>)).To(typeof(Repository<>)).InRequestScope();
            kernel.Bind<ILogInLogOutService>().To<LogInLogOutService>();
            kernel.Bind<ILookUpCodeService>().To<LookUpCodeService>();
            kernel.Bind<ICompanyService>().To<CompanyService>();
            kernel.Bind<ILeave>().To<Leave>();
            kernel.Bind<IEmployeeProfileService>().To<EmployeeProfileService>();
        }
    }
}
