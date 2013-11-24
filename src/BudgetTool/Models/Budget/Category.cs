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

    public class BudgetedCategory
    {
        public int Id { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        public decimal BudgetedAmount { get; set; }
        public decimal ActualAmount { get; set; }
    }

    public class Budget
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public List<BudgetedCategory> Categories { get; set; }
    }
    
    public class BudgetContext : DbContext
    {
        public BudgetContext() : base("name=DefaultConnection") { }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Category> Categories { get; set; }

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
            get
            {
                return Context.Budgets;
            }
        }

        public DbQuery<Category> Categories
        {
            get
            {
                return Context.Categories;
            }
        }

    }
}