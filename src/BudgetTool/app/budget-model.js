budget.factory('model', function () {
  var datacontext;

  var model = {
    initialize: initialize
  };
  return model;

  function initialize(context) {
    datacontext = context;
    var store = datacontext.metadataStore;
    store.registerEntityTypeCtor("Budget", Budget, budgetInitializer);
    store.registerEntityTypeCtor("BudgetCategory", BudgetCategory);
  }

  function budgetInitializer(budget) {
    budget.errorMessage = "";
  }

  function Budget() {
    this.userId = -1;
    this.name = "New budget...";
  }
  function BudgetCategory() {
  }
})