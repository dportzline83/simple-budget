budget.controller('BudgetCtrl',
  ['$scope', 'breeze', 'datacontext', '$routeParams',
    function($scope, breeze, datacontext, $routeParams) {
      $scope.categories = [];
      $scope.error = "";
      $scope.getCategories = getCategories;
      $scope.addCategory = addCategory;
      $scope.refresh = refresh;
      $scope.endEdit = endEdit;

      $scope.getCategories();

      function getCategories() {
        datacontext.getCategories()
          .then(getSucceeded).fail(failed)
          .fin(refreshView);
      }
      function refresh() {
        getCategories();
      }
      function endEdit(entity) {
        datacontext.saveEntity(entity)
          .fin(refreshView);
      }
      function getSucceeded(data) {
        $scope.categories = data;
      }
      function failed(error) {
        $scope.error = error.message;
      }
      function refreshView() {
        $scope.$apply();
      }

      function addCategory() {
        var cat = datacontext.createCategory();
        datacontext.saveEntity(cat)
          .then(addSucceeded)
          .fail(addFailed)
          .fin(refreshView);

        function addSucceeded() {
          $scope.categories.unshift(cat);
        }

        function addFailed(error) {
          failed({ message: error.message });
        }
      }
    }
  ]);