(function() {
  angular.module('myApp').controller('IncomingAssignmentsController', [
    '$scope', '$stateParams', 'current_user', 'user', 'AssignmentService', 'UsersService', 'OrganizationService', function($scope, $stateParams, current_user, user, AssignmentService, UsersService, OrganizationService) {
      $scope.today = new Date().getTime();
      $scope.two_days_from_now = $scope.today + (1000 * 60 * 60 * 24 * 2);
      $scope.current_user = current_user;
      $scope.user = user;
      $scope.incoming_assignments = [];
      $('input, textarea').placeholder();
      AssignmentService.collectUserAssignments($scope.user.id).success(function(data) {
        $scope.incoming_assignments = data.user_assignments;
        return $scope.loaded_incoming_assignments = true;
      });
      $scope.setUserAssignmentStatus = function(user_assignment, status) {
        var new_user_assignment;
        new_user_assignment = AssignmentService.newUserAssignment(user_assignment.user_id, user_assignment.assignment_id);
        new_user_assignment.id = user_assignment.id;
        new_user_assignment.status = status;
        return AssignmentService.saveUserAssignment(new_user_assignment).success(function(data) {
          user_assignment.status = data.user_assignment.status;
          return user_assignment.updated_at = data.user_assignment.updated_at;
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
      $scope.isDueSoon = function(user_assignment) {
        var due_date;
        if (user_assignment.due_datetime === null) {
          return false;
        }
        due_date = new Date(user_assignment.due_datetime).getTime();
        return !this.isPastDue(user_assignment) && due_date <= $scope.two_days_from_now;
      };
      $scope.sortIncompleteAssignments = function(user_assignment) {
        var dated, dated_order, final_order, not_dated, not_dated_order;
        not_dated = _.filter($scope.incoming_assignments, function(a) {
          return !a.due_datetime;
        });
        not_dated_order = _.sortBy(not_dated, function(a) {
          return a.created_at;
        }).reverse();
        dated = _.filter($scope.incoming_assignments, function(a) {
          return a.due_datetime;
        });
        dated_order = _.sortBy(dated, function(a) {
          return a.due_datetime;
        });
        final_order = dated_order.concat(not_dated_order);
        return _.indexOf(final_order, user_assignment);
      };
      return $scope.sortCompletedAssignments = function(user_assignment) {
        var final_order;
        final_order = _.sortBy($scope.incoming_assignments, function(a) {
          if (!a.due_datetime) {
            return a.updated_at;
          } else {
            return a.due_datetime;
          }
        }).reverse();
        return _.indexOf(final_order, user_assignment);
      };
    }
  ]);

}).call(this);
