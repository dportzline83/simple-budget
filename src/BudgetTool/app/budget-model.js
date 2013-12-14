budget.factory('model', function() {
    var datacontext;

    var model = {
        initialize: initialize
    };
    return model;
    
    function initialize(context) {
        datacontext = context;
        var store = datacontext.metadataStore;
        store.registerEntityTypeCtor("budget", null, budgetInitializer);
    }
    
    function budgetInitializer(budget) {
        budget.errorMessage = "";
        budget.newBudgetTitle = "";
    }
    
    function Budget() {
        this.title = "My Budget";
        this.userId = "unknown";
    }
})