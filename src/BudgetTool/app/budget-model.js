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
  }

  function budgetInitializer(budget) {
    budget.errorMessage = "";
  }

  function Budget() {
    this.name = "My Budget";
  }
})