window.budget = angular.module('budget', []);

budget.value('breeze', window.breeze)
    .value('Q', window.Q);
budget.config(['routeProvider', function($routeProvider) {
    $routeProvider
        .when('/budget', { templateUrl: 'Scripts/Budget/budget.view.html', controller: 'BudgetController' });
}]);

budget.controller('BudgetController',
    ['$scope', 'breeze', 'datacontext', 'logger',
        function($scope, breeze, datacontext, logger) {
            logger.log("creating the budget controller");

            $scope.budgets = [];
            $scope.error = "";
            $scope.getBudgets = getBudgets;

            $scope.getBudgets();

            function getBudgets() {
                datacontext.getBudgets()
                    .then(getSucceeded).fail(failed)
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
        }
    ]);