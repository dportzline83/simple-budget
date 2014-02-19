budget.controller('TransactionCtrl',
  ['$scope', 'breeze', 'datacontext', '$routeParams',
    function($scope, breeze, datacontext, $routeParams) {
      $scope.budget = {};
      $scope.error = "";
      $scope.categories = [];
      $scope.transactions = [];
      $scope.getBudgetData = getBudgetData;
      $scope.getCategories = getCategories;
      $scope.addTransaction = addTransaction;
      $scope.getBudgetedIncome = getBudgetedIncome;
      $scope.removeTransaction = removeTransaction;
      $scope.setTransactionCategory = setTransactionCategory;
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

      function removeTransaction(trans) {
        trans.entityAspect.setDeleted();
        datacontext.saveEntity(trans)
          .then(removeSucceeded)
          .fail(removeFailed)
          .fin(refreshView());

        function removeSucceeded() {
          var index = $scope.budget.transactions.indexOf(trans);
          $scope.budget.transactions.splice(index, 1);
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
      function setTransactionCategory(category) {
        $scope.newTransaction.category = category.category;
      }
    }
  ]);