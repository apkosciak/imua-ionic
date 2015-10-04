(function() {
  angular.module('myApp').controller('EditMilestoneModalController', [
    '$scope', '$modalInstance', 'RoadmapService', 'selectedMilestone', 'timeUnit', function($scope, $modalInstance, RoadmapService, selectedMilestone, timeUnit) {
      $scope.errors = [];
      $scope.milestone = angular.copy(selectedMilestone);
      $scope.showAdvanced = false;
      $scope.advancedPrefix = "Show";
      $scope.toggleAdvanced = function() {
        $scope.showAdvanced = !$scope.showAdvanced;
        if ($scope.showAdvanced) {
          return $scope.advancedPrefix = "Hide";
        } else {
          return $scope.advancedPrefix = "Show";
        }
      };
      $scope.save = function() {
        $scope.errors = [];
        $scope.errors = RoadmapService.validateMilestone(timeUnit, $scope.milestone);
        if ($scope.errors.length === 0) {
          return RoadmapService.updateMilestone($scope.milestone).success(function(data) {
            angular.copy(data.milestone, selectedMilestone);
            return $modalInstance.close();
          });
        }
      };
      $scope.cancel = function() {
        return $modalInstance.dismiss('cancel');
      };
      return $scope["delete"] = function() {
        if (window.confirm("Are you sure you want to delete this milestone?")) {
          return RoadmapService.deleteMilestone($scope.milestone.id).success(function(data) {
            $.each(timeUnit.milestones, function(index, val) {
              if (this.id === $scope.milestone.id) {
                timeUnit.milestones.splice(index, 1);
                return false;
              }
            });
            return $modalInstance.close();
          });
        }
      };
    }
  ]);

}).call(this);
