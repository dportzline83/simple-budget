using System;
using System.Data.Entity;
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

#if DEBUG
            Database.
                SetInitializer(new DatabaseInitializer());

            using (var context = new BudgetContext())
            {
                context.Database.Initialize(false);
            }
            WebSecurity.InitializeDatabaseConnection("DefaultConnection", "UserProfile", "UserId", "UserName", autoCreateTables: true);
#endif
        }
    }

    public class DatabaseInitializer : DropCreateDatabaseIfModelChanges<BudgetContext>
    {
        protected override void Seed(BudgetContext context)
        {
            context.Categories.Add(new Category {Name = "Groceries", UserId = null});
            context.Categories.Add(new Category { Name = "Entertainment", UserId = null });
            context.Categories.Add(new Category { Name = "Eating Out", UserId = null });
            context.Categories.Add(new Category { Name = "Rent", UserId = null });
            context.Categories.Add(new Category { Name = "Mortgage", UserId = null });
            context.Categories.Add(new Category { Name = "Natural Gas", UserId = null });
            context.Categories.Add(new Category { Name = "Electric", UserId = null });
            context.Categories.Add(new Category { Name = "Water", UserId = null });
            context.Categories.Add(new Category { Name = "Sewage", UserId = null });
            context.Categories.Add(new Category { Name = "Internet", UserId = null });
            context.Categories.Add(new Category { Name = "Cable", UserId = null });
            context.Categories.Add(new Category { Name = "School", UserId = null });
            context.Categories.Add(new Category { Name = "Gasoline", UserId = null });
            context.SaveChanges();
        }
    }
}