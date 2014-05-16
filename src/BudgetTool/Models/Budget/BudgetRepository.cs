using System.Data.Entity.Infrastructure;
using System.Security.Principal;
using Breeze.WebApi;
using WebMatrix.WebData;

namespace BudgetTool.Models.Budget
{
    public class BudgetRepository : EFContextProvider<BudgetContext>
    {
        private readonly IPrincipal _user;

        public BudgetRepository(IPrincipal user)
        {
            _user = user;
        }

        public DbQuery<Budget> Budgets
        {
            get { return Context.Budgets; }
        }

        public DbQuery<Category> Categories
        {
            get { return Context.Categories; }
        }

        public DbQuery<BudgetCategory> BudgetCategories
        {
            get { return Context.BudgetCategories; }
        }

        public DbQuery<Transaction> Transactions
        {
            get { return Context.Transactions; }
        }

        protected override bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            if (entityInfo.Entity is Budget)
            {
                (entityInfo.Entity as Budget).UserId = WebSecurity.CurrentUserId;
            }
            if (entityInfo.Entity is Category)
            {
                (entityInfo.Entity as Category).UserId = WebSecurity.CurrentUserId;
            }
            return true;
        }
    }
}