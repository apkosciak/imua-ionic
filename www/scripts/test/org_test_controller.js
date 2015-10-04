(function() {
  angular.module('myApp').controller('OrgTestController', [
    '$stateParams', '$scope', 'TestService', function($stateParams, $scope, TestService) {
      $scope.TestScoreTypes = ["Percent", "Raw Number", "Letter Grade"];
      $scope.user = $scope.current_user;
      $scope.orgId = $stateParams.id;
      $scope.orgTests = [];
      TestService.getOrgTests($scope.orgId).success(function(data) {
        var e, i, len, ref;
        $scope.orgTests = data.orgTests;
        ref = $scope.orgTests;
        for (i = 0, len = ref.length; i < len; i++) {
          e = ref[i];
          e.editing = false;
        }
        $scope.orgTests.editing = false;
        return $scope.loaded_orgTests = true;
      });
      $scope.editOrgTest = function(index) {
        $scope.orgTests[index].editing = true;
        $scope.orgTests[index].new_title = $scope.orgTests[index].title;
        return $scope.orgTests[index].new_score_type = $scope.orgTests[index].score_type;
      };
      $scope.cancelEditOrgTest = function(index) {
        if ($scope.orgTests[index].id) {
          $scope.orgTests[index].editing = false;
        } else {
          $scope.orgTests.splice(index, 1);
        }
        return $scope.orgTests.editing = false;
      };
      $scope.saveOrgTest = function(index) {
        var new_orgTest;
        new_orgTest = TestService.newOrgTest($scope.orgId);
        new_orgTest.id = $scope.orgTests[index].id;
        new_orgTest.title = $scope.orgTests[index].new_title;
        new_orgTest.score_type = $scope.orgTests[index].new_score_type;
        if (new_orgTest.id && (new_orgTest.title !== $scope.orgTests[index].title || new_orgTest.score_type !== $scope.orgTests[index].score_type)) {
          if (!window.confirm("This will update the test while maintaining any corresponding test entries for each student. Ok to continue?")) {
            return;
          }
        }
        return TestService.saveOrgTest(new_orgTest).success(function(data) {
          $scope.orgTests[index] = data.orgTest;
          $scope.orgTests[index].editing = false;
          return $scope.orgTests.editing = false;
        });
      };
      $scope.deleteOrgTest = function(index) {
        if (window.confirm("Are you sure you want to delete this test? This will remove any of the corresponding test entries for each student.")) {
          return TestService.deleteOrgTest($scope.orgTests[index]).success(function(data) {
            return $scope.orgTests.splice(index, 1);
          });
        }
      };
      return $scope.addOrgTest = function() {
        var blank_orgTest;
        $scope.orgTests.editing = true;
        blank_orgTest = TestService.newOrgTest($scope.orgId);
        blank_orgTest.editing = true;
        return $scope.orgTests.push(blank_orgTest);
      };
    }
  ]);

}).call(this);
