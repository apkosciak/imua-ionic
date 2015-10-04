(function() {
  angular.module('myApp').controller('MilestoneController', [
    '$scope', '$stateParams', 'current_user', 'milestone_id', 'edit', 'MilestoneService', 'UsersService', 'OrganizationService', 'RoadmapService', 'ProgressService', function($scope, $stateParams, current_user, milestone_id, edit, MilestoneService, UsersService, OrganizationService, RoadmapService, ProgressService) {
      $scope.current_user = current_user;
      $scope.recalculateCompletion = (function(_this) {
        return function() {
          var partition;
          partition = _.partition($scope.users_total, function(u) {
            return u.user_milestones && u.user_milestones.length > 0;
          });
          $scope.users_complete = partition[0];
          $scope.users_incomplete = partition[1];
          $scope.percent_complete = 0;
          $scope.num_students_in_semester = $scope.users_total.length;
          if ($scope.users_total.length > 0) {
            $scope.percent_complete = (($scope.users_complete.length / $scope.users_total.length) * 100).toFixed(0);
          }
          if (current_user.is_mentor) {
            $scope.users_complete = _.filter($scope.users_complete, function(u) {
              return _.contains(current_user.assigned_users, u.id);
            });
            $scope.users_incomplete = _.filter($scope.users_incomplete, function(u) {
              return _.contains(current_user.assigned_users, u.id);
            });
            return $scope.num_students_in_semester = $scope.users_complete.length + $scope.users_incomplete.length;
          }
        };
      })(this);
      MilestoneService.getMilestoneStatus(milestone_id).success(function(data) {
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.users_total = $scope.organization.students;
        $scope.milestone = $scope.organization.milestones[0];
        $scope.milestone.editing = false;
        $scope.recalculateCompletion();
        return $scope.loaded_data = true;
      });
      $scope.userMilestonesAreEditable = function(milestone) {
        return milestone.submodule === "YesNo";
      };
      $scope.setUserMilestone = function(user) {
        return ProgressService.addUserMilestone(user, $scope.milestone.time_unit_id, $scope.milestone.id).success(function(data) {
          if (!user.user_milestones) {
            user.user_milestones = [];
          }
          user.user_milestones.push({});
          return $scope.recalculateCompletion();
        });
      };
      return $scope.unsetUserMilestone = function(user) {
        return ProgressService.deleteUserMilestone(user, $scope.milestone.time_unit_id, $scope.milestone.id).success(function(data) {
          user.user_milestones = [];
          return $scope.recalculateCompletion();
        });
      };
    }
  ]);

}).call(this);
