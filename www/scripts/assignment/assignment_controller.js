(function() {
  angular.module('myApp').controller('AssignmentController', [
    '$scope', '$stateParams', 'current_user', 'assignment', 'edit', 'AssignmentService', 'UsersService', 'OrganizationService', function($scope, $stateParams, current_user, assignment, edit, AssignmentService, UsersService, OrganizationService) {
      $scope.today = new Date().getTime();
      $scope.two_days_from_now = $scope.today + (1000 * 60 * 60 * 24 * 2);
      $scope.current_user = current_user;
      $scope.user_assignments_total = [];
      $scope.user_assignments_completed = [];
      $scope.user_assignments_incomplete = [];
      $scope.recalculateCompletion = (function(_this) {
        return function() {
          var assignable_user_ids;
          $scope.user_assignments_total = $scope.assignment.user_assignments;
          $scope.user_assignments_completed = _.where($scope.user_assignments_total, {
            status: 1
          });
          $scope.user_assignments_incomplete = _.where($scope.user_assignments_total, {
            status: 0
          });
          $scope.percent_complete = 0;
          if ($scope.user_assignments_total.length > 0) {
            $scope.percent_complete = (($scope.user_assignments_completed.length / $scope.user_assignments_total.length) * 100).toFixed(0);
          }
          if (current_user.is_mentor) {
            assignable_user_ids = $scope.current_user.assigned_users.concat([$scope.current_user.id]);
            $scope.user_assignments_completed = _.filter($scope.user_assignments_completed, function(ua) {
              return _.contains(assignable_user_ids, ua.user.id);
            });
            return $scope.user_assignments_incomplete = _.filter($scope.user_assignments_incomplete, function(ua) {
              return _.contains(assignable_user_ids, ua.user.id);
            });
          }
        };
      })(this);
      if (!assignment) {
        $scope.assignment = AssignmentService.newAssignment($scope.current_user.id);
        $scope.assignment.editing = true;
        $scope.user = $scope.current_user;
      } else {
        $scope.assignment = assignment;
        $scope.assignment.editing = edit;
        $scope.user = $scope.assignment.user;
        $scope.recalculateCompletion();
      }
      if ($scope.assignment.editing) {
        $scope.assignment.new_title = $scope.assignment.title;
        $scope.assignment.new_description = $scope.assignment.description;
        $scope.assignment.new_due_datetime = $scope.assignment.due_datetime;
      }
      $scope.assignment.assignees = [];
      $scope.assignable_users = [];
      $('input, textarea').placeholder();
      if ($scope.current_user.id === $scope.user.id) {
        AssignmentService.getTaskAssignableUsers($scope.user.id).success(function(data) {
          $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
          $scope.assignable_users = $scope.organization.users;
          $scope.assignable_user_groups = [];
          $scope.assignable_user_groups.push({
            group_name: "Org Admins",
            group_users: $scope.organization.orgAdmins
          });
          $scope.assignable_user_groups.push({
            group_name: "Mentors",
            group_users: $scope.organization.mentors
          });
          $scope.assignable_user_groups.push({
            group_name: "Students",
            group_users: $scope.organization.students
          });
          return $scope.loaded_assignable_users = true;
        });
      } else {
        $scope.loaded_assignable_users = true;
      }
      $scope.editAssignment = function() {
        $scope.assignment.editing = true;
        $scope.assignment.new_title = $scope.assignment.title;
        $scope.assignment.new_description = $scope.assignment.description;
        return $scope.assignment.new_due_datetime = $scope.assignment.due_datetime;
      };
      $scope.cancelEditAssignment = function() {
        if (!$scope.assignment.id) {
          return window.location.href = "#/app/assignments/" + $scope.user.id;
        } else {
          return $scope.assignment.editing = false;
        }
      };
      $scope.saveAssignment = function(index) {
        var new_assignment;
        new_assignment = AssignmentService.newAssignment($scope.user.id);
        new_assignment.id = $scope.assignment.id;
        new_assignment.user_id = $scope.assignment.user_id;
        new_assignment.title = $scope.assignment.new_title;
        new_assignment.description = $scope.assignment.new_description;
        new_assignment.due_datetime = $scope.assignment.new_due_datetime;
        new_assignment.assignees = $scope.assignment.assignees;
        return AssignmentService.broadcastAssignment(new_assignment, _.map(new_assignment.assignees, function(assignee) {
          return assignee.id;
        })).success(function(data) {
          var organization, saved_assignment;
          organization = OrganizationService.parseOrganizationWithUsers(data.organization);
          saved_assignment = organization.assignments[0];
          saved_assignment.assignees = [];
          $scope.assignment = saved_assignment;
          $scope.assignment.editing = false;
          return $scope.recalculateCompletion();
        });
      };
      $scope.deleteAssignment = function() {
        if (window.confirm("Are you sure you want to delete this task?")) {
          return AssignmentService.deleteAssignment($scope.assignment.id).success(function(data) {
            $scope.assignment.editing = false;
            $scope.assignment = null;
            return window.location.href = "#/app/assignments/" + $scope.user.id;
          });
        }
      };
      $scope.assignAllAssignableUsers = function(assignment) {
        var all_assignable_user_ids;
        all_assignable_user_ids = _.difference(_.pluck($scope.assignable_users, 'id'), _.pluck($scope.assignment.user_assignments, 'user_id'));
        return assignment.assignees = _.filter($scope.assignable_users, function(user) {
          return _.contains(all_assignable_user_ids, user.id);
        });
      };
      $scope.assignAssignee = function(user, assignment) {
        return assignment.assignees.push(user);
      };
      $scope.unassignAssignee = function(user, assignment) {
        return assignment.assignees = _.without(assignment.assignees, user);
      };
      $scope.setUserAssignmentStatus = function(user_assignment, status) {
        return AssignmentService.setUserAssignmentStatus(user_assignment, status).then(function() {
          return $scope.recalculateCompletion();
        });
      };
      $scope.deleteUserAssignment = function(assignment, user_assignment) {
        if (window.confirm("Are you sure you want to delete this user's assignment?")) {
          return AssignmentService.deleteUserAssignment(user_assignment.id).success(function(data) {
            assignment.user_assignments = _.without(assignment.user_assignments, user_assignment);
            return $scope.recalculateCompletion();
          });
        }
      };
      $scope.deleteUserFromAssignment = function(assignment, user) {
        var user_assignment;
        user_assignment = _.find(assignment.user_assignments, function(ua) {
          return ua.user_id === user.id;
        });
        return this.deleteUserAssignment(assignment, user_assignment);
      };
      $scope.isPendingAssignment = function(assignment, user) {
        return _.contains(_.pluck(assignment.assignees, 'id'), user.id);
      };
      $scope.isAssigned = function(assignment, user) {
        return _.contains(_.pluck(assignment.user_assignments, 'user_id'), user.id);
      };
      $scope.isUnassigned = function(assignment, user) {
        return !this.isPendingAssignment(assignment, user) && !this.isAssigned(assignment, user);
      };
      $scope.isPastDue = function(assignment) {
        var due_date, due_datetime;
        due_datetime = assignment.editing ? assignment.new_due_datetime : assignment.due_datetime;
        if (!due_datetime) {
          return false;
        }
        due_date = new Date(due_datetime).getTime();
        return due_date < $scope.today;
      };
      $scope.isDueSoon = function(assignment) {
        var due_date, due_datetime;
        due_datetime = assignment.editing ? assignment.new_due_datetime : assignment.due_datetime;
        if (!due_datetime) {
          return false;
        }
        due_date = new Date(due_datetime).getTime();
        return !this.isPastDue(assignment) && due_date <= $scope.two_days_from_now;
      };
      return $scope.isComplete = function(assignment) {
        return $scope.user_assignments_incomplete.length === 0;
      };
    }
  ]);

}).call(this);
