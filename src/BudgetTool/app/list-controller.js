budget.controller('ListController',
    ['$scope', 'breeze', 'datacontext', '$routeParams', '$location',
        function ($scope, breeze, datacontext, $routeParams, $location) {

          $scope.budgets = [];
          $scope.error = "";
          $scope.getBudgets = getBudgets;
          $scope.addBudget = addBudget;
          $scope.refresh = refresh;
          $scope.endEdit = endEdit;
          $scope.copyBudget = copyBudget;

          $scope.getBudgets();

          function getBudgets() {
            datacontext.getBudgetsWithCategories()
                .then(getSucceeded).fail(failed)
                .fin(refreshView);
          }
          function refresh() {
            getBudgets();
          }
          function endEdit(entity) {
            datacontext.saveEntity(entity)
              .fin(refreshView);
          }
          function getSucceeded(data) {
            $scope.budgets = data;
          }
          function failed(error) {
            $scope.error = error.message;
          }
          function refreshView() {
            $scope.$apply();
          }

          function addBudget() {
            var budget = datacontext.createBudget();
            datacontext.saveEntity(budget)
                .then(addSucceeded)
                .fail(addFailed)
                .fin(refreshView);

            function addSucceeded() {
              $scope.budgets.push(budget);
            }
            function addFailed(error) {
              failed({ message: error.message });
            }
          }

          function copyBudget(budget) {
            if (!budget) {
              failed({ message: "Can't copy empty budget" });
              return;
            }

            var newBudget = datacontext.createEntity('Budget');

            budget.categories.forEach(function(category) {
              var newCategory = {};
              newCategory.budget = newBudget;
              newCategory.category = category.category;
              newCategory.type = category.type;
              newCategory.budgetedAmount = category.budgetedAmount;
              newCategory.priority = category.priority;
              datacontext.createEntity('BudgetCategory', newCategory);
            });
            datacontext.saveChanges();
            $scope.budgets.push(newBudget);
            
            //make sure the real id gets updated on the $scope when the server sends it
            var handle = newBudget.entityAspect.propertyChanged.subscribe(function(args) {
              refreshView();
              newBudget.entityAspect.propertyChanged.unsubscribe(handle);
            });

          }
        }
    ]);