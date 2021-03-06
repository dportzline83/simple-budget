﻿using BudgetTool.Models.Budget;
using WebMatrix.WebData;

namespace BudgetTool.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using Breeze.WebApi;
    using Filters;
    using Newtonsoft.Json.Linq;

    [Authorize]
    [BreezeController]
    public class BudgetController : ApiController
    {
        private readonly BudgetRepository _repository;

        public BudgetController()
        {
            _repository = new BudgetRepository(User);
        }

        // GET ~/api/Budget/Metadata 
        [HttpGet]
        public string Metadata()
        {
            return _repository.Metadata();
        }

        // POST ~/api/Budget/SaveChanges
        [HttpPost]
        [ValidateHttpAntiForgeryToken]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _repository.SaveChanges(saveBundle);
        }

        // GET ~/api/Budget/Budgets
        [HttpGet]
        public IQueryable<Budget> Budgets()
        {
            return _repository.Budgets.Where(b => b.UserId == WebSecurity.CurrentUserId);
        }

        // GET ~/api/Budget/Categories
        [HttpGet]
        public IQueryable<Category> Categories()
        {
            return _repository.Categories.Where(b => b.UserId == WebSecurity.CurrentUserId || b.UserId == null); ;
        }

        // GET ~/api/Budget/BudgetCategories
        [HttpGet]
        public IQueryable<BudgetCategory> BudgetCategories()
        {
            return _repository.BudgetCategories;
        }
    }
}