(function() {
  angular.module('myApp').controller('UserAssignmentController', [
    '$scope', '$stateParams', 'current_user', 'user_assignment', 'AssignmentService', 'UsersService', 'OrganizationService', function($scope, $stateParams, current_user, user_assignment, AssignmentService, UsersService, OrganizationService) {
      $scope.today = new Date().getTime();
      $scope.two_days_from_now = $scope.today + (1000 * 60 * 60 * 24 * 2);
      $scope.current_user = current_user;
      $scope.user_assignment = user_assignment;
      $scope.assigner = $scope.user_assignment.assigner;
      $scope.loaded = true;
      $('input, textarea').placeholder();
      $scope.setUserAssignmentStatus = function(user_assignment, status) {
        var new_user_assignment;
        new_user_assignment = AssignmentService.newUserAssignment(user_assignment.user_id, user_assignment.assignment_id);
        new_user_assignment.id = user_assignment.id;
        new_user_assignment.status = status;
        return AssignmentService.saveUserAssignment(new_user_assignment).success(function(data) {
          user_assignment.status = data.user_assignment.status;
          return user_assignment.updated_at = new Date();
        });
      };
      $scope.isComplete = function(user_assignment) {
        return user_assignment.status === 1;
      };
      $scope.isPastDue = function(user_assignment) {
        var due_date;
        if (user_assignment.due_datetime === null) {
          return false;
        }
        due_date = new Date(user_assignment.due_datetime).getTime();
        return due_date < $scope.today;
      };
      return $scope.isDueSoon = function(user_assignment) {
        var due_date;
        if (user_assignment.due_datetime === null) {
          return false;
        }
        due_date = new Date(user_assignment.due_datetime).getTime();
        return !this.isPastDue(user_assignment) && due_date <= $scope.two_days_from_now;
      };
    }
  ]);

}).call(this);
