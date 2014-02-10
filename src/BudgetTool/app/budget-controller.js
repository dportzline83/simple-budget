budget.controller('BudgetCtrl',
  ['$scope', 'breeze', 'datacontext', '$routeParams',
    function($scope, breeze, datacontext, $routeParams) {
      $scope.budget = {};
      $scope.error = "";
      $scope.categories = [];
      $scope.transactions = [];
      $scope.getBudgetData = getBudgetData;
      $scope.getCategories = getCategories;
      $scope.addCategory = addCategory;
      $scope.getSpentAmount = getSpentAmount;
      $scope.refresh = refresh;
      $scope.endEdit = endEdit;

      $scope.getCategories();
      $scope.getBudgetData();

      function getBudgetData() {
        datacontext.getBudgetData($routeParams.id)
          .then(getSucceeded)
          .fail(failed)
          .fin(refreshView);
      }
      function getCategories() {
        datacontext.getCategories()
          .then(function(data) {
            $scope.categories = data;
          })
          .fail(failed)
          .fin(refreshView);
      }
      function getSpentAmount(category) {
        var total = 0;
        category.transactions.map(function(transaction) {
          total += transaction.amount;
        });
        return total;
      }
      function refresh() {
        getCategories();
      }
      function endEdit(entity) {
        datacontext.saveEntity(entity)
          .fin(refreshView);
      }
      function getSucceeded(data) {
        $scope.budget = data[0];
      }
      function failed(error) {
        $scope.error = error.message;
      }
      function refreshView() {
        $scope.$apply();
      }

      function addCategory() {
        var cat =
          datacontext.createDetachedEntity(
          'BudgetCategory',
          {
            budgetId: $routeParams.id
          });
        datacontext.saveEntity(cat)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          $scope.budget.categories.unshift(cat);
        }

        function addFailed(error) {
          failed({ message: error.message });
        }
      }
    }
  ]);