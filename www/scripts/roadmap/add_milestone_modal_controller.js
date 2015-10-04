(function() {
  angular.module('myApp').controller('AddMilestoneModalController', [
    '$scope', '$modalInstance', 'timeUnit', 'enabledModules', 'RoadmapService', function($scope, $modalInstance, timeUnit, enabledModules, RoadmapService) {
      $scope.selected = {};
      $scope.errors = [];
      $scope.showAdvanced = false;
      $scope.advancedPrefix = "Show";
      $scope.modules = enabledModules;
      $scope.selected.module = $scope.modules[0];
      $scope.selectModule = function(module) {
        $scope.selected.module = module;
        return $scope.selected.submodule = null;
      };
      $scope.selectSubmodule = function(submodule) {
        return $scope.selected.submodule = submodule;
      };
      $scope.clearSubmoduleSelection = function() {
        return $scope.selected.submodule = null;
      };
      $scope.toggleAdvanced = function() {
        $scope.showAdvanced = !$scope.showAdvanced;
        if ($scope.showAdvanced) {
          return $scope.advancedPrefix = "Hide";
        } else {
          return $scope.advancedPrefix = "Show";
        }
      };
      $scope.add = function() {
        var new_milestone;
        $scope.errors = [];
        new_milestone = $scope.selected.submodule;
        new_milestone.is_default = false;
        new_milestone.time_unit_id = timeUnit.id;
        $scope.errors = RoadmapService.validateMilestone(timeUnit, new_milestone);
        if ($scope.errors.length === 0) {
          return $modalInstance.close($scope.selected.submodule);
        }
      };
      return $scope.cancel = function() {
        return $modalInstance.dismiss('cancel');
      };
    }
  ]);

}).call(this);
