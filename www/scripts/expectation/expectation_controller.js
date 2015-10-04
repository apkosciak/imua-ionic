(function() {
  angular.module('myApp').controller('ExpectationController', [
    '$scope', '$stateParams', 'current_user', 'expectation_id', 'ExpectationService', 'UsersService', 'OrganizationService', 'RoadmapService', 'ProgressService', function($scope, $stateParams, current_user, expectation_id, ExpectationService, UsersService, OrganizationService, RoadmapService, ProgressService) {
      $scope.current_user = current_user;
      $scope.recalculateCompletion = (function(_this) {
        return function() {
          var partition, partition_2;
          partition = _.partition($scope.users_total, function(u) {
            return !u.user_expectations || u.user_expectations[0].status === $scope.CONSTANTS.EXPECTATION_STATUS.meeting;
          });
          $scope.users_meeting = partition[0];
          partition_2 = _.partition(partition[1], function(u) {
            return u.user_expectations[0].status === $scope.CONSTANTS.EXPECTATION_STATUS.needs_work;
          });
          $scope.users_need_work = partition_2[0];
          $scope.users_not_meeting = partition_2[1];
          $scope.percent_meeting = 0;
          $scope.percent_need_work = 0;
          $scope.percent_not_meeting = 0;
          if ($scope.users_total.length > 0) {
            $scope.percent_meeting = (($scope.users_meeting.length / $scope.users_total.length) * 100).toFixed(0);
            $scope.percent_need_work = (($scope.users_need_work.length / $scope.users_total.length) * 100).toFixed(0);
            $scope.percent_not_meeting = (($scope.users_not_meeting.length / $scope.users_total.length) * 100).toFixed(0);
          }
          if (current_user.is_mentor) {
            $scope.users_meeting = _.filter($scope.users_meeting, function(u) {
              return _.contains(current_user.assigned_users, u.id);
            });
            $scope.users_need_work = _.filter($scope.users_need_work, function(u) {
              return _.contains(current_user.assigned_users, u.id);
            });
            return $scope.users_not_meeting = _.filter($scope.users_not_meeting, function(u) {
              return _.contains(current_user.assigned_users, u.id);
            });
          }
        };
      })(this);
      ExpectationService.getExpectationStatus(expectation_id).success(function(data) {
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.users_total = $scope.organization.students;
        $scope.expectation = $scope.organization.expectations[0];
        $scope.recalculateCompletion();
        $scope.expectation.new_comment = "";
        $scope.expectation.assignees = [];
        return $scope.loaded_data = true;
      });
      $scope.setExpectationStatus = function() {
        return $scope.expectation.assigning = true;
      };
      $scope.cancelSetExpectationStatus = function() {
        $scope.expectation.new_comment = "";
        $scope.expectation.assignees = [];
        return $scope.expectation.assigning = false;
      };
      $scope.saveExpectationStatus = function() {
        return ExpectationService.saveExpectationStatus(expectation_id, $scope.expectation.assignees, $scope.expectation.new_comment).success(function(data) {
          $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
          $scope.users_total = $scope.organization.students;
          $scope.expectation = $scope.organization.expectations[0];
          $scope.recalculateCompletion();
          $scope.expectation.new_comment = "";
          $scope.expectation.assignees = [];
          return $scope.expectation.assigning = false;
        });
      };
      $scope.assignUserExpectationStatus = function(user, status) {
        var assignment;
        assignment = _.find($scope.expectation.assignees, function(a) {
          return a.user.id === user.id;
        });
        $scope.expectation.assignees = _.reject($scope.expectation.assignees, function(a) {
          return a.user.id === user.id;
        });
        if (assignment === void 0 || assignment.status !== status) {
          return $scope.expectation.assignees.push({
            user: user,
            status: status
          });
        }
      };
      $scope.isAssignedMeeting = function(user) {
        var assignment;
        assignment = _.find($scope.expectation.assignees, function(a) {
          return a.user.id === user.id;
        });
        return assignment !== void 0 && assignment.status === $scope.CONSTANTS.EXPECTATION_STATUS.meeting;
      };
      $scope.isAssignedNeedsWork = function(user) {
        var assignment;
        assignment = _.find($scope.expectation.assignees, function(a) {
          return a.user.id === user.id;
        });
        return assignment !== void 0 && assignment.status === $scope.CONSTANTS.EXPECTATION_STATUS.needs_work;
      };
      return $scope.isAssignedNotMeeting = function(user) {
        var assignment;
        assignment = _.find($scope.expectation.assignees, function(a) {
          return a.user.id === user.id;
        });
        return assignment !== void 0 && assignment.status === $scope.CONSTANTS.EXPECTATION_STATUS.not_meeting;
      };
    }
  ]);

}).call(this);
