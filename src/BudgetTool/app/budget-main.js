window.budget = angular.module('budget', ['ngRoute']);

budget.value('breeze', window.breeze)
    .value('Q', window.Q);
budget.config([
  '$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/',
      {
        templateUrl: '/app/budget.list.view.html',
        controller: 'BudgetsCtrl'
      })
      .when('/details/:id',
      {
        templateUrl: '/app/budget.detail.view.html',
        controller: 'BudgetCtrl'
      })
      .otherwise({ redirectTo: '/list' });
  }
]);

budget.directive('onBlur', function () {
  return {
    restrict: 'A',
    link: function (scope, elm, attrs) {
      elm.bind('blur', function () {
        scope.$apply(attrs.onBlur);
      });
    }
  };
});