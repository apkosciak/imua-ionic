(function() {
  angular.module('myApp').controller('RoadmapController', [
    '$scope', '$modal', '$stateParams', 'RoadmapService', 'LoadingService', 'OrganizationService', 'UsersService', function($scope, $modal, $stateParams, RoadmapService, LoadingService, OrganizationService, UsersService) {
      $scope.updateRoadmapName = function(roadmap) {
        if (!roadmap.newname) {
          return;
        }
        return RoadmapService.updateRoadmapName(roadmap, roadmap.newname).success(function(data) {
          $scope.roadmap.name = data.roadmap.name;
          return roadmap.editing = false;
        }).error(function(data) {
          return roadmap.editing = false;
        });
      };
      $scope.addTimeUnit = function(timeUnit) {
        var newTimeUnit;
        $scope.addingTimeUnit = true;
        if (timeUnit && timeUnit.id) {
          timeUnit.original = angular.copy(timeUnit);
          return timeUnit.editing = true;
        } else {
          newTimeUnit = {
            name: "",
            editing: true
          };
          return $scope.roadmap.time_units.push(newTimeUnit);
        }
      };
      $scope.saveAddTimeUnit = function(timeUnit) {
        if (!timeUnit.name) {
          return;
        }
        if (timeUnit.id) {
          return RoadmapService.updateTimeUnit(timeUnit).then(function(data) {
            timeUnit.editing = false;
            return $scope.addingTimeUnit = false;
          });
        } else {
          return RoadmapService.addTimeUnit(-1, $scope.roadmap.id, timeUnit).then(function(data) {
            $scope.roadmap.time_units.pop();
            $scope.roadmap.time_units.push(data.time_unit);
            return $scope.addingTimeUnit = false;
          }, function(data) {});
        }
      };
      $scope.cancelAddTimeUnit = function(timeUnit) {
        if (timeUnit.id) {
          timeUnit.editing = false;
          timeUnit.name = timeUnit.original.name;
        } else {
          $scope.roadmap.time_units.pop();
        }
        return $scope.addingTimeUnit = false;
      };
      $scope.deleteTimeUnit = function(index) {
        if (window.confirm("Are you sure? Deleting this will delete all milestones within it also.")) {
          return RoadmapService.deleteTimeUnit($scope.roadmap.time_units[index].id).then(function(data) {
            $scope.roadmap.time_units.splice(index, 1);
            return $scope.addingTimeUnit = false;
          });
        }
      };
      $scope.addMilestone = function(timeUnit, selected_module) {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: 'roadmap/add_milestone_modal.html',
          controller: 'AddMilestoneModalController',
          backdrop: 'static',
          resolve: {
            timeUnit: function() {
              return timeUnit;
            },
            enabledModules: function() {
              return [selected_module];
            }
          }
        });
        return modalInstance.result.then(function(milestone) {
          return RoadmapService.addMilestone(milestone).success(function(data) {
            return timeUnit.milestones.push(data.milestone);
          });
        });
      };
      $scope.viewMilestone = function(timeUnit, milestone) {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: 'roadmap/edit_milestone_modal.html',
          controller: 'EditMilestoneModalController',
          backdrop: 'static',
          resolve: {
            selectedMilestone: function() {
              return milestone;
            },
            timeUnit: function() {
              return timeUnit;
            }
          }
        });
        return modalInstance.result.then(function() {});
      };
      $scope.viewMilestoneStatus = function(milestone) {
        return window.location.href = "#/app/milestone/" + milestone.id;
      };
      return $scope.deleteMilestone = function(tu, milestone) {
        var i, index, len, m, ref, results;
        if (window.confirm("Are you sure you want to delete this milestone?")) {
          ref = tu.milestones;
          results = [];
          for (index = i = 0, len = ref.length; i < len; index = ++i) {
            m = ref[index];
            if (m.id === milestone.id) {
              RoadmapService.deleteMilestone(tu.milestones[index].id).success(function(data) {
                return tu.milestones.splice(index, 1);
              });
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };
    }
  ]);

}).call(this);
