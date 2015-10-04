(function() {
  angular.module('myApp').controller("MentorDashboardController", [
    "$scope", "$modal", "UsersService", "ProgressService", "ExpectationService", "OrganizationService", function($scope, $modal, UsersService, ProgressService, ExpectationService, OrganizationService) {
      $scope.assigned_students = [];
      $scope.attention_students = [];
      $scope.mentor = $scope.user;
      UsersService.getAssignedStudents($scope.mentor.id).success(function(data) {
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.assigned_students = $scope.organization.students;
        $scope.attention_students = _.where($scope.organization.students, {
          needs_attention: true
        });
        return $scope.loaded_users = true;
      });
      return $scope.addAssignment = function() {
        var modalInstance;
        return modalInstance = $modal.open({
          templateUrl: 'assignment/add_assignment_modal.html',
          controller: 'AddAssignmentModalController',
          backdrop: 'static',
          size: 'sm',
          resolve: {
            user: function() {
              return $scope.user;
            },
            assignees: function() {
              return $scope.assigned_students;
            }
          }
        });
      };
    }
  ]);

}).call(this);
