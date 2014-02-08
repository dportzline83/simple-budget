window.budget = angular.module('budget', ['ngRoute']);

budget.value('breeze', window.breeze)
    .value('Q', window.Q);
budget.config([
  '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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

    //$locationProvider.html5Mode(true);
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

budget.directive('onChange', function () {
  return {
    restrict: 'A',
    link: function (scope, elm, attrs) {
      elm.bind('change', function () {
        scope.$apply(attrs.onChange);
      });
    }
  };
});