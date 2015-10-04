(function() {
  angular.module('myApp').controller('TestingProgressController', [
    '$scope', 'TestService', 'ProgressService', function($scope, TestService, ProgressService) {
      var removeTest;
      $scope.userTests = [];
      $scope.orgTests = [];
      $scope.testErrors = [];
      $scope.testsEditor = false;
      $scope.formErrors = ['**Please fix the errors above**'];
      $scope.$watch('selected_semester', function() {
        $scope.numUserTests = 0;
        $scope.testsEditor = false;
        if ($scope.selected_semester) {
          $scope.loaded_data = false;
          return TestService.getOrgTests($scope.student.organization_id).success(function(data) {
            $scope.orgTests = data.orgTests;
            return TestService.getUserTests($scope.student.id, $scope.selected_semester.id).success(function(data) {
              var i, j, len, len1, ot, ref, ref1, ut;
              $scope.userTests = data.userTests;
              $scope.numUserTests = $scope.userTests.length;
              ref = $scope.userTests;
              for (i = 0, len = ref.length; i < len; i++) {
                ut = ref[i];
                ref1 = $scope.orgTests;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                  ot = ref1[j];
                  if (ot.id === ut.org_test_id) {
                    ut.orgTest = ot;
                    break;
                  }
                }
              }
              $scope.loaded_data = true;
              return $scope.$emit('loaded_module_milestones');
            });
          });
        }
      });
      $scope.editorClick = function() {
        return $scope.testsEditor = !$scope.testsEditor;
      };
      $scope.editUserTest = function(user_test) {
        $scope.userTests.editing = true;
        user_test.editing = true;
        user_test.new_orgTest = user_test.orgTest;
        user_test.new_date = user_test.date;
        return user_test.new_score = user_test.score;
      };
      $scope.cancelEditUserTest = function(user_test) {
        if (user_test.id) {
          user_test.editing = false;
        } else {
          $scope.userTests = removeTest($scope.userTests, user_test);
        }
        $scope.testErrors = [];
        return $scope.userTests.editing = false;
      };
      removeTest = function(tests, test_to_remove) {
        return _.without(tests, _.findWhere(tests, {
          id: test_to_remove.id
        }));
      };
      $scope.saveUserTest = function(user_test) {
        var new_userTest;
        new_userTest = TestService.newUserTest(user_test.user_id, user_test.time_unit_id);
        new_userTest.id = user_test.id;
        new_userTest.org_test_id = user_test.new_orgTest.id;
        new_userTest.date = user_test.new_date;
        new_userTest.score = user_test.new_score;
        return TestService.saveUserTest(new_userTest).success(function(data) {
          var i, len, ot, ref;
          user_test.editing = false;
          $scope.userTests.editing = false;
          user_test.id = data.userTest.id;
          user_test.user_id = data.userTest.user_id;
          user_test.org_test_id = data.userTest.org_test_id;
          user_test.time_unit_id = data.userTest.time_unit_id;
          user_test.date = data.userTest.date;
          user_test.score = data.userTest.score;
          $scope.numUserTests = $scope.userTests.length;
          ref = $scope.orgTests;
          for (i = 0, len = ref.length; i < len; i++) {
            ot = ref[i];
            if (ot.id === user_test.org_test_id) {
              user_test.orgTest = ot;
              break;
            }
          }
          $scope.refreshPoints();
          $scope.$emit('just_updated', 'Testing');
          return $scope.addSuccessMessage("Test saved successfully");
        });
      };
      $scope.deleteUserTest = function(user_test) {
        if (window.confirm("Are you sure you want to delete this test?")) {
          return TestService.deleteUserTest(user_test).success(function(data) {
            $scope.userTests = removeTest($scope.userTests, user_test);
            $scope.numUserTests = $scope.userTests.length;
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Testing');
            return $scope.addSuccessMessage("Test deleted successfully");
          });
        }
      };
      return $scope.addUserTest = function() {
        var blank_userTest;
        $scope.userTests.editing = true;
        blank_userTest = TestService.newUserTest($scope.student.id, $scope.selected_semester.id);
        blank_userTest.new_orgTest = null;
        blank_userTest.editing = true;
        return $scope.userTests.push(blank_userTest);
      };
    }
  ]);

}).call(this);
