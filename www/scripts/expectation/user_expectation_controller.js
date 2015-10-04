(function() {
  angular.module('myApp').controller('UserExpectationController', [
    '$scope', 'current_user', 'student', 'user_expectation', 'ExpectationService', function($scope, current_user, student, user_expectation, ExpectationService) {
      $scope.current_user = current_user;
      $scope.student = student;
      $scope.user_expectation = user_expectation;
      $scope.user_expectation_history = null;
      $scope.editing = false;
      $scope.old_status = null;
      $scope.user_expectation.new_comment = null;
      $scope.original_expectaton_status = null;
      ExpectationService.getUserExpectationHistory($scope.user_expectation.id).success(function(data) {
        return $scope.user_expectation_history = data.user_expectation_history;
      });
      $scope.editExpectation = function() {
        $scope.editing = true;
        $scope.old_status = angular.copy($scope.user_expectation);
        if ($scope.old_status.modified_by_name === null) {
          return $scope.old_status.modified_by_name = $scope.current_user.full_name;
        }
      };
      $scope.cancelEditing = function() {
        $scope.editing = false;
        $scope.user_expectation.status = $scope.old_status.status;
        return $scope.user_expectation.new_comment = null;
      };
      $scope.editComment = function() {
        $scope.edit_comment = true;
        return $scope.user_expectation.edit_comment = $scope.user_expectation.comment;
      };
      $scope.cancelCommentEdit = function() {
        return $scope.edit_comment = false;
      };
      $scope.updateComment = function() {
        $scope.user_expectation.comment = $scope.user_expectation.edit_comment;
        ExpectationService.updateUserExpectationComment($scope.user_expectation).success(function(data) {
          return $scope.user_expectation = data.user_expectation;
        });
        return $scope.edit_comment = false;
      };
      $scope.updateExpectation = function() {
        $scope.user_expectation.comment = $scope.user_expectation.new_comment;
        return ExpectationService.updateUserExpectation($scope.user_expectation).success(function(data) {
          if (!!$scope.old_status) {
            $scope.user_expectation_history.unshift($scope.old_status);
          }
          $scope.user_expectation = data.user_expectation;
          $scope.editing = false;
          return $scope.user_expectation.new_comment = null;
        });
      };
      $scope.getHistoryColor = function(status) {
        switch (status) {
          case $scope.CONSTANTS.EXPECTATION_STATUS.meeting:
            return "good";
          case $scope.CONSTANTS.EXPECTATION_STATUS.needs_work:
            return "warn";
          case $scope.CONSTANTS.EXPECTATION_STATUS.not_meeting:
            return "alert";
        }
      };
      return $scope.getStatusText = function(status) {
        switch (status) {
          case $scope.CONSTANTS.EXPECTATION_STATUS.meeting:
            return "Meeting";
          case $scope.CONSTANTS.EXPECTATION_STATUS.needs_work:
            return "Needs Work";
          case $scope.CONSTANTS.EXPECTATION_STATUS.not_meeting:
            return "Not Meeting";
        }
      };
    }
  ]);

}).call(this);
