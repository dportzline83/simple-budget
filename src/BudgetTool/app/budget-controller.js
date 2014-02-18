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
      $scope.addTransaction = addTransaction;
      $scope.getSpentAmount = getSpentAmount;
      $scope.getBudgetedIncome = getBudgetedIncome;
      $scope.removeCategory = removeCategory;
      $scope.refresh = refresh;
      $scope.endEdit = endEdit;
      $scope.newTransaction = {};
      $scope.getCategories();
      $scope.getBudgetData();
      $scope.income = {};

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
        if ($scope.budget.transactions) {
          $scope.budget.transactions.forEach(function(transaction) {
            if (transaction.categoryId === category.categoryId)
              total += transaction.amount;
          });
          category.totalSpent = total;
        }
        return total;
      }
      function getBudgetedIncome() {
        var total = 0;
        if ($scope.budget.categories) {
          $scope.budget.categories.forEach(function(c) {
            total += c.budgetedAmount;
          });
          $scope.income = {
            budgeted: total,
            remaining: $scope.budget.income - total
          };
        }
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
          datacontext.createDetachedEntity('BudgetCategory', {
            budgetId: $routeParams.id
          });
        datacontext.saveEntity(cat)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          $scope.budget.categories.push(cat);
        }

        function addFailed(error) {
          failed({ message: error.message });
        }
      }

      function removeCategory(category) {
        category.entityAspect.setDeleted();
        datacontext.saveEntity(category)
          .then(removeSucceeded)
          .fail(removeFailed)
          .fin(refreshView());

        function removeSucceeded() {
          var index = $scope.budget.categories.indexOf(category);
          $scope.budget.categories.splice(index, 1);
        }
        function removeFailed(error) {
          failed({ message: error.message });
        }
      }

      function addTransaction(initialValues) {
        initialValues.budgetId = $routeParams.id;
        var transaction =
          datacontext.createEntity('Transaction',
            initialValues);
        datacontext.saveEntity(transaction)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          $scope.budget.transactions.push(transaction);
          $scope.newTransaction = {};
        }
        function addFailed(error) {
          failed({ message: error.message });
        }
      }
    }
  ]);