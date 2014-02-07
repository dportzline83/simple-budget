using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Security.Principal;
using Breeze.WebApi;

namespace BudgetTool.Models.Budget
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }

    public class BudgetCategory
    {
        public int Id { get; set; }
        [Required]
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        [Required]
        public decimal BudgetedAmount { get; set; }
        public decimal ActualAmount { get; set; }
    }

    public class Budget
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<BudgetCategory> Categories { get; set; }
    }
    
    public class BudgetContext : DbContext
    {
        public BudgetContext() : base("name=DefaultConnection") { }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BudgetCategory> BudgetCategories { get; set; }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }
    }

    public class BudgetRepository : EFContextProvider<BudgetContext>
    {

        public BudgetRepository(IPrincipal user)
        {
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

    }
}