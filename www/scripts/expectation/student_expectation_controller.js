(function() {
  angular.module('myApp').controller('StudentExpectationController', [
    '$stateParams', '$scope', '$location', 'student', 'current_user', 'ExpectationService', 'ProgressService', 'OrganizationService', function($stateParams, $scope, $location, student, current_user, ExpectationService, ProgressService, OrganizationService) {
      $scope.current_user = current_user;
      $scope.student = student;
      $scope.orgId = $scope.student.organization_id;
      $scope.studentId = $scope.student.id;
      $scope.meetingExpectations = true;
      $scope.expectations = [];
      ProgressService.getStudentExpectations($scope.student.id).success(function(data) {
        var expectation, i, len, ref, user_expectation;
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.student = $scope.organization.students[0];
        $scope.student_with_modules_progress = $scope.student;
        $scope.expectations = $scope.organization.expectations;
        ref = $scope.expectations;
        for (i = 0, len = ref.length; i < len; i++) {
          expectation = ref[i];
          user_expectation = _.find($scope.student.user_expectations, function(ue) {
            return ue.expectation_id === expectation.id;
          });
          if (user_expectation !== void 0) {
            expectation.user_expectation = user_expectation;
          }
        }
        $scope.recalculateMeetingExpectations();
        return $scope.loaded_data = true;
      });
      $scope.hideExpectationHistory = function(expectation) {
        return expectation.user_expectation.showHistory = false;
      };
      $scope.recalculateMeetingExpectations = function() {
        var expectation, i, len, ref;
        ref = $scope.expectations;
        for (i = 0, len = ref.length; i < len; i++) {
          expectation = ref[i];
          if (expectation.user_expectation.status > 0) {
            $scope.meetingExpectations = false;
            return;
          }
        }
        return $scope.meetingExpectations = true;
      };
      return $scope.viewExpectation = function(user_expectation_id) {
        return $location.path("/app/user/" + student.id + "/user_expectation/" + user_expectation_id);
      };
    }
  ]);

}).call(this);
