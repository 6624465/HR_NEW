using HR.Data.BaseRepositories;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Service
{
    public class BaseService
    {
        [Inject]
        public IUnitOfWork UnitOfWork { get; set; }
    }
}
