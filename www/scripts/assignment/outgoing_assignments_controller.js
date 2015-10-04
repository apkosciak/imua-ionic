(function() {
  angular.module('myApp').controller('OutgoingAssignmentsController', [
    '$scope', '$stateParams', 'current_user', 'user', 'AssignmentService', 'UsersService', 'OrganizationService', function($scope, $stateParams, current_user, user, AssignmentService, UsersService, OrganizationService) {
      $scope.today = new Date().getTime();
      $scope.two_days_from_now = $scope.today + (1000 * 60 * 60 * 24 * 2);
      $scope.current_user = current_user;
      $scope.user = user;
      $scope.outgoing_assignments = [];
      $('input, textarea').placeholder();
      AssignmentService.getTaskAssignableUsersTasks($scope.user.id).success(function(data) {
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.outgoing_assignments = $scope.organization.assignments;
        return $scope.loaded_outgoing_assignments = true;
      });
      $scope.isComplete = function(assignment) {
        return _.every(assignment.user_assignments, function(a) {
          return a.status === 1;
        });
      };
      $scope.isPastDue = function(assignment) {
        var due_date;
        if (!assignment.due_datetime) {
          return false;
        }
        due_date = new Date(assignment.due_datetime).getTime();
        return due_date < $scope.today;
      };
      $scope.isDueSoon = function(assignment) {
        var due_date;
        if (!assignment.due_datetime) {
          return false;
        }
        due_date = new Date(assignment.due_datetime).getTime();
        return !this.isPastDue(assignment) && due_date <= $scope.two_days_from_now;
      };
      $scope.sortIncompleteAssignments = function(assignment) {
        var dated, dated_order, final_order, not_dated, not_dated_order;
        not_dated = _.filter($scope.outgoing_assignments, function(a) {
          return !a.due_datetime;
        });
        not_dated_order = _.sortBy(not_dated, function(a) {
          return a.created_at;
        }).reverse();
        dated = _.filter($scope.outgoing_assignments, function(a) {
          return a.due_datetime;
        });
        dated_order = _.sortBy(dated, function(a) {
          return a.due_datetime;
        });
        final_order = dated_order.concat(not_dated_order);
        return _.indexOf(final_order, assignment);
      };
      return $scope.sortCompletedAssignments = function(assignment) {
        var final_order;
        final_order = _.sortBy($scope.outgoing_assignments, function(a) {
          if (!a.due_datetime) {
            return a.updated_at;
          } else {
            return a.due_datetime;
          }
        }).reverse();
        return _.indexOf(final_order, assignment);
      };
    }
  ]);

}).call(this);
