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
      .when('/transactions/:id',
      {
        templateUrl: '/app/budget.transaction.view.html',
        controller: 'TransactionCtrl'
      })
      .otherwise({ redirectTo: '/' });

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

budget.directive('onEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.onEnter);
        });

        event.preventDefault();
      }
    });
  };
});

budget.directive('sortable', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.sortable()
    }

  };
});