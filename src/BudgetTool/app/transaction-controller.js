﻿budget.controller('TransactionController',
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
      $scope.refresh = refresh;
      $scope.endEdit = endEdit;
      $scope.getCategories();
      $scope.getBudgetData();
      $scope.income = {};
      $scope.loading = true;
      $scope.transactions = [];
      $scope.orderByOptions = [
        'Category',
        'Type',
        'Date',
        'Amount'
      ];
      $scope.orderBy = 'Date';

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
        $scope.transactions = $scope.budget.transactions;
        $scope.loading = false;
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
          .fin(refreshView);

        function removeSucceeded() {

        }

        function removeFailed(error) {
          failed({ message: error.message });
        }
      }

      function addTransaction() {
        var initialValues = {
          budgetId: $routeParams.id,
          type: "1", //debit
          date: new Date()
      };
        var transaction =
          datacontext.createDetachedEntity('Transaction',
            initialValues);
        datacontext.saveEntity(transaction)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          $scope.budget.transactions.push(transaction);
        }
        function addFailed(error) {
          failed({ message: error.message });
        }
      }
    }
  ]);