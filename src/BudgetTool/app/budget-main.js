window.budget = angular.module('budget', []);

budget.value('breeze', window.breeze)
    .value('Q', window.Q);
budget.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/app/budget.view.html', controller: 'BudgetCtrl' });
    //.otherwise({ redirectTo: '/home/budget' });
}]);

