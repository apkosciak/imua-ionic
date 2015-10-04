(function() {
  angular.module('myApp').controller('OrganizationExpectationController', [
    '$stateParams', '$scope', 'ExpectationService', function($stateParams, $scope, ExpectationService) {
      $scope.formErrors = ['** Please fix the errors above **'];
      $scope.user = $scope.current_user;
      $scope.orgId = $stateParams.id;
      $scope.expectations = [];
      ExpectationService.getExpectations($scope.orgId).success(function(data) {
        var e, i, len, ref;
        $scope.expectations = data.expectations;
        ref = $scope.expectations;
        for (i = 0, len = ref.length; i < len; i++) {
          e = ref[i];
          e.editing = false;
        }
        $scope.expectations.editing = false;
        return $scope.loaded_expectations = true;
      });
      $scope.editExpectation = function(index) {
        $scope.expectations[index].editing = true;
        $scope.expectations[index].new_title = $scope.expectations[index].title;
        return $scope.expectations[index].new_description = $scope.expectations[index].description;
      };
      $scope.cancelEditExpectation = function(index) {
        if ($scope.expectations[index].id) {
          $scope.expectations[index].editing = false;
        } else {
          $scope.expectations.splice(index, 1);
        }
        return $scope.expectations.editing = false;
      };
      $scope.saveExpectation = function(index) {
        var new_expectation;
        new_expectation = ExpectationService.newExpectation($scope.orgId);
        new_expectation.id = $scope.expectations[index].id;
        new_expectation.title = $scope.expectations[index].new_title;
        new_expectation.description = $scope.expectations[index].new_description;
        if (new_expectation.id && new_expectation.title !== $scope.expectations[index].title) {
          if (!window.confirm("This will rename the expectation while maintaining each student's corresponding expectation status. Ok to continue?")) {
            return;
          }
        }
        return ExpectationService.saveExpectation(new_expectation).success(function(data) {
          $scope.expectations[index] = data.expectation;
          $scope.expectations[index].editing = false;
          return $scope.expectations.editing = false;
        });
      };
      $scope.deleteExpectation = function(index) {
        if (window.confirm("Are you sure you want to delete this expectation? This will remove the corresponding expectation status at each student.")) {
          return ExpectationService.deleteExpectation($scope.expectations[index]).success(function(data) {
            return $scope.expectations.splice(index, 1);
          });
        }
      };
      return $scope.addExpectation = function() {
        var blank_expectation;
        $scope.expectations.editing = true;
        blank_expectation = ExpectationService.newExpectation($scope.orgId);
        blank_expectation.editing = true;
        return $scope.expectations.push(blank_expectation);
      };
    }
  ]);

}).call(this);
