budget.controller('DetailController',
  ['$scope', 'breeze', 'datacontext', '$routeParams',
    function($scope, breeze, datacontext, $routeParams) {
      $scope.budget = {};
      $scope.error = "";
      $scope.categories = [];
      $scope.getBudgetData = getBudgetData;
      $scope.getCategories = getCategories;
      $scope.addCategory = addCategory;
      $scope.addTransaction = addTransaction;
      $scope.getSpentAmount = getSpentAmount;
      $scope.getBudgetedIncome = getBudgetedIncome;
      $scope.removeCategory = removeCategory;
      $scope.setInitialTransactionValues = setInitialTransactionValues;
      $scope.sortStart = sortStart;
      $scope.sortEnd = sortEnd;
      $scope.saveSequence = saveSequence;
      $scope.refresh = refresh;
      $scope.endEdit = endEdit;
      $scope.newTransaction = {};
      $scope.getCategories();
      $scope.getBudgetData();
      $scope.income = {};
      $scope.incomeCategories = [];
      $scope.spendingCategories = [];
      $scope.showCategoryCreator = false;
      $scope.createNewCategory = createNewCategory;
      $scope.newCategory = {};
      $scope.loading = true;

      function getBudgetData() {
        datacontext.getBudgetData($routeParams.id)
          .then(getSucceeded)
          .fail(failed)
          .fin(refreshView);
      };
      function getSucceeded(data) {
        $scope.budget = data[0];
        $scope.incomeCategories = $scope.budget.categories.filter(function (c) { return c.type == 0; });
        $scope.spendingCategories = $scope.budget.categories.filter(function (c) { return c.type == 1; });
        $scope.spendingCategories.sort(function (first, second) {
          if (first.priority < second.priority)
            return -1;
          else
            return 1;
        });
        getBudgetedIncome();
        $scope.loading = false;
      };
      function failed(error) {
        $scope.error = error.message;
      };
      function refreshView() {
        $scope.$apply();
      };
      function getCategories() {
        datacontext.getCategories()
          .then(function(data) {
            $scope.categories = data;
          })
          .fail(failed)
          .fin(refreshView);
      };
      function getSpentAmount(category) {
        var total = 0;
        if ($scope.budget.transactions) {
          $scope.budget.transactions.forEach(function(transaction) {
            if (transaction.categoryId === category.categoryId && transaction.type == category.type)
              total += transaction.amount;
          });
          category.totalSpent = total;
        }
        return total;
      };

      function getBudgetedIncome() {
        var totalSpendingBudgeted = 0;
        var totalExpectedIncome = 0;
        if ($scope.budget.categories) {
          $scope.budget.categories.forEach(function(c) {
            //only if it's a budget for debits
            if (c.type == 1) {
              totalSpendingBudgeted += c.budgetedAmount;
            }
            //credits
            if (c.type == 0) {
              totalExpectedIncome += c.budgetedAmount;
            }
          });
          $scope.income = {
            expected: totalExpectedIncome,
            budgeted: totalSpendingBudgeted,
            remaining: totalExpectedIncome - totalSpendingBudgeted
          };
          if ($scope.income.remaining < 0)
            $scope.remainingIncomeClass = "text-danger";
          else if ($scope.income.remaining > 0) {
            $scope.remainingIncomeClass = "text-warning";
          } else
            $scope.remainingIncomeClass = "text-success";
        }

        return totalSpendingBudgeted;
      };
      function refresh() {
        getCategories();
      };
      function endEdit(entity) {
        datacontext.saveEntity(entity)
          .fin(refreshView);
      };
      
      function addCategory(type) {
        var cat =
          datacontext.createDetachedEntity('BudgetCategory', {
            budgetId: $routeParams.id,
            type: type
          });
        datacontext.saveEntity(cat)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          var categories = type === 0 ? "incomeCategories" : "spendingCategories";
          if (type === 1) {
            var len = $scope[categories].length;
            cat.priority = len === 0 ?
              0 : $scope.spendingCategories[len - 1].priority + 1;
          }
          $scope[categories].push(cat);
        }

        function addFailed(error) {
          failed({ message: error.message });
        }
      };

      function removeCategory(category) {
        var categories = category.type == 0 ? "incomeCategories" : "spendingCategories";
        var index = $scope[categories].indexOf(category);
        $scope[categories].splice(index, 1);

        category.entityAspect.setDeleted();
        datacontext.saveEntity(category)
          .then(removeSucceeded)
          .fail(removeFailed)
          .fin(refreshView);

        function removeSucceeded() {
          
        }
        function removeFailed(error) {
          failed({ message: error.message });
        }
      };

      function addTransaction(initialValues) {
        initialValues.budgetId = $routeParams.id;
        initialValues.type = $scope.isIncome ? "0" : "1";
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
      };
      function setInitialTransactionValues(category) {
        if (category) {
          $scope.newTransaction.category = category.category;
          $scope.isIncome = category.type == 0 ? true : false;
        }
        $scope.newTransaction.date = new Date();
      };

      $scope.sortableOptions = {
        stop: $scope.saveSequence
      };

      var lastSortStart;

      function sortStart(e, ui) {
        lastSortStart = ui.item.index();
      };
      function sortEnd(e, ui) {
        var end = ui.item.index();

        var previous = $scope.spendingCategories.splice(lastSortStart, 1)[0];
        $scope.spendingCategories.splice(end, 0, previous);
        refreshView();
        saveSequence();
      };
      function saveSequence() {
        var categories = $scope.spendingCategories;
        for (var i = 0; i < categories.length; i++) {
          var cat = categories[i];
          cat.priority = i;
        }

        datacontext.saveChanges()
            .then(saveSequenceSucceeded)
            .fail(saveSequenceFailed)
            .fin(refreshView);
        
        function saveSequenceSucceeded() {
          $scope.spendingCategories = categories;
        }
        function saveSequenceFailed(error) {
          failed({ message: error.message });
        }
      };
      function createNewCategory(budgetCategory) {
        var category =
          datacontext.createEntity('Category', $scope.newCategory);
        datacontext.saveEntity(category)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          $scope.categories.push(category);
          budgetCategory.category = category;
          datacontext.saveEntity(budgetCategory);
          $scope.newCategory = {};
          budgetCategory.showCategoryCreator = false;
        }
        function addFailed(error) {
          failed({ message: error.message });
        }
      };

    }
  ]);