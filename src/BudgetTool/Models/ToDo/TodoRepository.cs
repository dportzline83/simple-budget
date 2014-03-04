using System;
using System.Linq;
using System.Data.Entity.Infrastructure;
using System.Security;
using System.Security.Principal;
using Breeze.WebApi;
using BudgetTool.Models.Budget;

// ReSharper disable InconsistentNaming
namespace BudgetTool.Models
{
    public class TodoRepository : EFContextProvider<BudgetContext>
    {
        public TodoRepository(IPrincipal user)
        {
            UserId = user.Identity.Name;
        }

        public string UserId { get; private set; }

        #region Save processing

        // Todo: delegate to helper classes when it gets more complicated


        private bool BeforeSaveTodoList(TodoList todoList, EntityInfo info)
        {
            if (info.EntityState == EntityState.Added)
            {
                todoList.UserId = UserId;
                return true;
            }
            return UserId == todoList.UserId || throwCannotSaveEntityForThisUser();
        }

        // "this.Context" is reserved for Breeze save only!
        // A second, lazily instantiated DbContext will be used
        // for db access during custom save validation. 
        // See this stackoverflow question and reply for an explanation:
        // http://stackoverflow.com/questions/14517945/using-this-context-inside-beforesaveentity
        private BudgetContext ValidationContext
        {
            get { return _validationContext ?? (_validationContext = new BudgetContext()); }
        }
        private BudgetContext _validationContext;

        private bool throwCannotSaveEntityForThisUser()
        {
            throw new SecurityException("Unauthorized user");
        }

        private bool throwCannotFindParentTodoList()
        {
            throw new InvalidOperationException("Invalid TodoItem");
        }

        #endregion

    }
}