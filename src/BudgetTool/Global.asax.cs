using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using BudgetTool.Models.Budget;
using WebMatrix.WebData;

namespace BudgetTool
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            Database.
                SetInitializer(new DatabaseInitializer());

            try
            {
                using (var context = new BudgetContext())
                {
                    context.Database.Initialize(false);
                    if (!context.Database.Exists())
                    {
                        // Create the SimpleMembership database without Entity Framework migration schema
                        //((IObjectContextAdapter)context).ObjectContext.CreateDatabase();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    "The ASP.NET Simple Membership database could not be initialized. For more information, please see http://go.microsoft.com/fwlink/?LinkId=256588",
                    ex);
            }


        }
    }

    public class DatabaseInitializer : DropCreateDatabaseAlways<BudgetContext>
    {
        protected override void Seed(BudgetContext context)
        {
            WebSecurity.InitializeDatabaseConnection("DefaultConnection", "UserProfile", "UserId", "UserName", autoCreateTables: true);
        }
    }
}