using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Security.Principal;
using Breeze.WebApi;
using WebMatrix.WebData;

namespace BudgetTool.Models.Budget
{
    public class Budget
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public virtual UserProfile UserProfile { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<BudgetCategory> Categories { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }

    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [ForeignKey("UserProfile")]
        public Nullable<int> UserId { get; set; }
        public virtual UserProfile UserProfile { get; set; }
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
        public TransactionType Type { get; set; }

        [Required]
        public decimal BudgetedAmount { get; set; }
        [Required]
        public int Priority { get; set; }
    }

    public class Transaction
    {
        public int Id { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public string Description { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public int BudgetId { get; set; }
        public virtual Budget Budget { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }

    public enum TransactionType
    {
        Debit,
        Credit
    }
    
    public class BudgetContext : DbContext
    {
        public BudgetContext() : base("name=DefaultConnection") { }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BudgetCategory> BudgetCategories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
    }

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