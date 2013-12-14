budget.controller('BudgetCtrl',
    ['$scope', 'breeze', 'datacontext',
        function ($scope, breeze, datacontext) {
            //logger.log("creating the budget controller");

            $scope.budgets = [];
            $scope.error = "";
            $scope.getBudgets = getBudgets;
            $scope.addBudget = addBudget;
            $scope.refresh = refresh;
            $scope.endEdit = endEdit;

            $scope.getBudgets();

            function getBudgets() {
                datacontext.getBudgets()
                    .then(getSucceeded).fail(failed)
                    .fin(refreshView);
            }

            function refresh() {
                getBudgets();
            }

            function endEdit(entity) {
                datacontext.saveEntity(entity).fin(refreshView);
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
                    $scope.budgets.unshift(budget);
                }
                function addFailed(error) {
                    failed({ message: "Saving the budget failed!" });
                }
            }
        }
    ]);