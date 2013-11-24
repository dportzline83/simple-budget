using BudgetTool.Models.Budget;

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

        // GET ~/api/Budget/TodoList
        [HttpGet]
        public IQueryable<Budget> Budgets()
        {
            return _repository.Budgets;
            // We do the following on the client
            //.Include("Todos")
            //.OrderByDescending(t => t.TodoListId);
        }
    }
}