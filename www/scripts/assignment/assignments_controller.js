(function() {
  angular.module('myApp').controller('AssignmentsController', [
    '$scope', '$stateParams', '$location', 'current_user', 'user', 'AssignmentService', 'UsersService', 'OrganizationService', function($scope, $stateParams, $location, current_user, user, AssignmentService, UsersService, OrganizationService) {
      $scope.today = new Date().getTime();
      $scope.two_days_from_now = $scope.today + (1000 * 60 * 60 * 24 * 2);
      $scope.current_user = current_user;
      $scope.user = user;
      $('input, textarea').placeholder();
      $scope.clone = function(obj, blacklist) {
        var add_blacklist, copy, given_blacklist, i, j, k, l, len, len1, len2, postObjs, ref;
        if (blacklist == null) {
          blacklist = [];
        }
        copy = null;
        if (obj === null || typeof obj !== "object") {
          return obj;
        }
        if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
        } else if (obj instanceof Array) {
          copy = [];
          add_blacklist = [];
          for (j = 0, len = obj.length; j < len; j++) {
            i = obj[j];
            given_blacklist = angular.copy(blacklist);
            copy.push($scope.clone(i, given_blacklist));
            add_blacklist += _.difference(given_blacklist, blacklist, add_blacklist);
          }
          blacklist += add_blacklist;
        } else if (obj instanceof Object) {
          copy = {};
          postObjs = [];
          ref = Object.keys(obj);
          for (k = 0, len1 = ref.length; k < len1; k++) {
            i = ref[k];
            if (obj[i] instanceof Array || obj[i] instanceof Object) {
              if (!_.contains(blacklist, i)) {
                blacklist.push(i);
                postObjs.push(i);
              }
            } else {
              copy[i] = obj[i];
            }
          }
          add_blacklist = [];
          for (l = 0, len2 = postObjs.length; l < len2; l++) {
            i = postObjs[l];
            given_blacklist = angular.copy(blacklist);
            copy[i] = $scope.clone(obj[i], given_blacklist);
            add_blacklist += _.difference(given_blacklist, blacklist, add_blacklist);
          }
          blacklist += add_blacklist;
        } else {
          throw new Error("Unable to copy - obj type isn't supported.");
        }
        return copy;
      };
      AssignmentService.getTaskAssignableUsersTasks($scope.user.id).success(function(data) {
        var selected_nav;
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.user = _.find($scope.organization.users, function(u) {
          return u.id === $scope.user.id;
        });
        $scope.assignments = $scope.organization.assignments;
        $scope.users_assignments = $scope.clone($scope.user.assignments);
        $scope.users_user_assignments = $scope.clone(_.filter($scope.assignments, function(a) {
          return _.contains(_.pluck($scope.user.user_assignments, 'assignment_id'), a.id);
        }));
        $scope.student_assignments = $scope.clone($scope.assignments);
        selected_nav = $location.search().selected_nav;
        if (selected_nav) {
          $scope.selectNav(selected_nav);
        } else {
          $scope.selectNav($scope.CONSTANTS.TASK_NAV.assigned_to_me);
        }
        return $scope.loaded_data = true;
      });
      $scope.viewTask = function(assignment) {
        var user_assignment;
        if ($scope.selected_task_list === $scope.CONSTANTS.TASK_NAV.assigned_to_me) {
          user_assignment = _.findWhere(assignment.user_assignments, {
            user_id: $scope.current_user.id
          });
          $location.path("/app/user_assignment/" + user_assignment.id);
          return $location.url($location.path());
        } else {
          $location.path("/app/assignment/" + assignment.id);
          return $location.url($location.path());
        }
      };
      $scope.markComplete = function(assignment) {
        var user_assignment;
        user_assignment = _.findWhere(assignment.user_assignments, {
          user_id: $scope.user.id
        });
        return AssignmentService.setUserAssignmentStatus(user_assignment, 1).then(function() {});
      };
      $scope.markIncomplete = function(assignment) {
        var user_assignment;
        user_assignment = _.findWhere(assignment.user_assignments, {
          user_id: $scope.user.id
        });
        return AssignmentService.setUserAssignmentStatus(user_assignment, 0).then(function() {});
      };
      $scope.incompleteAssignments = function() {
        var assignment, incomplete_list, j, len, ref;
        if (!$scope.list_assignments) {
          return;
        }
        incomplete_list = [];
        ref = $scope.list_assignments;
        for (j = 0, len = ref.length; j < len; j++) {
          assignment = ref[j];
          if (!$scope.isComplete(assignment)) {
            incomplete_list.push(assignment);
          }
        }
        return incomplete_list;
      };
      $scope.completedAssignments = function() {
        var assignment, complete_list, j, len, ref;
        if (!$scope.list_assignments) {
          return;
        }
        complete_list = [];
        ref = $scope.list_assignments;
        for (j = 0, len = ref.length; j < len; j++) {
          assignment = ref[j];
          if ($scope.isComplete(assignment)) {
            complete_list.push(assignment);
          }
        }
        return complete_list;
      };
      $scope.selectNav = function(task_list) {
        var assignments;
        $scope.selected_task_list = task_list;
        $location.search("selected_nav", task_list);
        switch (task_list) {
          case $scope.CONSTANTS.TASK_NAV.assigned_to_me:
            assignments = _.map($scope.users_user_assignments, function(a) {
              a.user_assignments = _.filter(a.user_assignments, function(ua) {
                return ua.user_id === $scope.user.id;
              });
              return a;
            });
            $scope.list_assignments = assignments;
            return $scope.selected_task_list_title = $scope.CONSTANTS.TASK_NAV.assigned_to_me;
          case $scope.CONSTANTS.TASK_NAV.assigned_by_me:
            $scope.list_assignments = $scope.users_assignments;
            return $scope.selected_task_list_title = $scope.CONSTANTS.TASK_NAV.assigned_by_me;
          case $scope.CONSTANTS.TASK_NAV.assigned_to_others:
            assignments = _.map($scope.student_assignments, function(a) {
              a.user_assignments = _.filter(a.user_assignments, function(ua) {
                return ua.user_id !== $scope.user.id;
              });
              return a;
            });
            $scope.list_assignments = _.filter(assignments, function(a) {
              return a.user_assignments.length > 0;
            });
            if ($scope.current_user.is_org_admin) {
              return $scope.selected_task_list_title = "All Tasks";
            } else {
              return $scope.selected_task_list_title = $scope.CONSTANTS.TASK_NAV.assigned_to_others;
            }
        }
      };
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
        not_dated = _.filter($scope.list_assignments, function(a) {
          return !a.due_datetime;
        });
        not_dated_order = _.sortBy(not_dated, function(a) {
          return a.created_at;
        }).reverse();
        dated = _.filter($scope.list_assignments, function(a) {
          return a.due_datetime;
        });
        dated_order = _.sortBy(dated, function(a) {
          return a.due_datetime;
        });
        final_order = dated_order.concat(not_dated_order);
        return _.indexOf(final_order, assignment);
      };
      $scope.sortCompletedAssignments = function(assignment) {
        var final_order;
        final_order = _.sortBy($scope.list_assignments, function(a) {
          if (!a.due_datetime) {
            return a.updated_at;
          } else {
            return a.due_datetime;
          }
        }).reverse();
        return _.indexOf(final_order, assignment);
      };
      return $scope.created_by_str = function(assignment) {
        var ret;
        ret = "Test";
        switch (assignment.assignment_owner_type) {
          case "User":
            ret = assignment.user.first_last_initial;
            if (assignment.assignment_owner_id === $scope.current_user.id) {
              ret = "Me";
            }
            break;
          case "Milestone":
            ret = "a Milestone";
        }
        return ret;
      };
    }
  ]);

}).call(this);
