budget.controller('CategoryCtrl',
  ['$scope', 'breeze', 'datacontext',
    function($scope, breeze, datacontext) {
      $scope.categories = [];
      $scope.error = "";
      $scope.getCategories = getCategories;
      $scope.addCategory = addCategory;
      $scope.endEdit = endEdit;
      $scope.deleteCategory = deleteCategory;

      $scope.getCategories();


      function getCategories() {

        datacontext.getUserCategories()
          .then(function(data) {
            $scope.categories = data;
          })
          .fail(failed)
          .fin(refreshView);
      };
      
      function addCategory(initialValues) {
        var category =
          datacontext.createDetachedEntity('Category', initialValues)
            .then(function() {
              $scope.categories.push(category);
            })
            .fail(function(error) {
              $scope.error = error.message;
            });
      };

      function endEdit(entity) {
        datacontext.saveEntity(entity)
          .fin(refreshView);
      };

      function deleteCategory(category) {
        var index = $scope.categories.indexOf(category);
        $scope.categories.splice(index, 1);
        category.entityAspect.setDeleted();
        datacontext.saveEntity(category)
          .fail(failed)
          .fin(refreshView);
      };


      function failed(error) {
        $scope.error = error.message;
      };
      function refreshView() {
        $scope.$apply();
      };
    }
  ]);