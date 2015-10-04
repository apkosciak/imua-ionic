(function() {
  angular.module('myApp').controller('ExtracurricularProgressController', [
    '$scope', 'UserExtracurricularActivityService', 'ProgressService', function($scope, UserExtracurricularActivityService, ProgressService) {
      var current_activities, other_activity;
      $scope.semester_activities = 0;
      $scope.user_extracurricular_activities = [];
      $scope.activities = {};
      $scope.ecEditor = false;
      $scope.activities.editing = false;
      $scope.previous_activity_list = [];
      current_activities = [];
      other_activity = {};
      $scope.formErrors = ['**Please fix the errors above**'];
      $scope.resetNewActivityEntry = function() {
        if ($scope.selected_semester) {
          $scope.new_activity = UserExtracurricularActivityService.newExtracurricularActivity($scope.student);
          $scope.new_activity.details.push(UserExtracurricularActivityService.newExtracurricularDetail($scope.student, $scope.selected_semester.id, null));
          return $scope.new_activity.editing = false;
        }
      };
      $scope.editNewActivityEntry = function() {
        return $scope.new_activity.editing = true;
      };
      $scope.resetNewActivityEntry();
      $scope.$watch('user_extracurricular_activities', function() {
        $scope.loaded_semester_activities = false;
        $scope.semester_activities = _.filter($scope.user_extracurricular_activities, function(a) {
          return a.details && a.details.length > 0;
        }).length;
        return $scope.loaded_semester_activities = true;
      }, true);
      $scope.$watch('selected_semester', function() {
        $scope.ecEditor = false;
        if ($scope.selected_semester) {
          $scope.resetNewActivityEntry();
          $scope.loaded_data = false;
          return UserExtracurricularActivityService.all($scope.student.id, $scope.selected_semester.id).success(function(data) {
            var detail, i, j, len, len1, ref, ref1, user_extracurricular_activity;
            $scope.org_current_activity_list = data.org_extracurricular_activity_titles;
            $scope.user_extracurricular_activities = data.user_extracurricular_activities;
            ref = $scope.user_extracurricular_activities;
            for (i = 0, len = ref.length; i < len; i++) {
              user_extracurricular_activity = ref[i];
              user_extracurricular_activity.details = [];
              user_extracurricular_activity.non_current_details = [];
              ref1 = data.user_extracurricular_details;
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                detail = ref1[j];
                if (user_extracurricular_activity.id === detail.user_extracurricular_activity_id) {
                  if (detail.time_unit_id === $scope.selected_semester.id) {
                    user_extracurricular_activity.details.push(detail);
                  } else {
                    user_extracurricular_activity.non_current_details.push(detail);
                  }
                }
              }
            }
            $scope.loaded_data = true;
            return $scope.$emit('loaded_module_milestones');
          });
        }
      });
      $scope.editorClick = function() {
        return $scope.ecEditor = !$scope.ecEditor;
      };
      $scope.activityIsSavable = function(activity) {
        return activity.name;
      };
      $scope.activityDetailIsSavable = function(detail) {
        return true;
      };
      $scope.newActivityEntryIsSavable = function() {
        return $scope.activityIsSavable($scope.new_activity) && $scope.activityDetailIsSavable($scope.new_activity.details[0]);
      };
      $scope.applicableActivities = function() {
        return _.filter($scope.user_extracurricular_activities, function(a) {
          return a.details.length > 0;
        });
      };
      $scope.saveNewActivity = function() {
        var existing_activity;
        if (!$scope.newActivityEntryIsSavable()) {
          return;
        }
        if (_.contains(_.pluck($scope.user_extracurricular_activities, 'name'), $scope.new_activity.name)) {
          existing_activity = _.find($scope.user_extracurricular_activities, function(o) {
            return o.name === $scope.new_activity.name;
          });
          $scope.new_activity.details[0].user_extracurricular_activity_id = existing_activity.id;
          return UserExtracurricularActivityService.saveExtracurricularDetail($scope.new_activity.details[0]).success(function(data) {
            existing_activity.details.push(data.user_extracurricular_detail);
            $scope.resetNewActivityEntry();
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Extracurricular');
            return $scope.addSuccessMessage("Extracurricular activity saved successfully");
          });
        } else {
          return UserExtracurricularActivityService.saveNewExtracurricularActivity($scope.new_activity).success(function(data) {
            data.user_extracurricular_activity.details = [];
            data.user_extracurricular_activity.non_current_details = [];
            data.user_extracurricular_activity.details.push(data.user_extracurricular_detail);
            $scope.user_extracurricular_activities.push(data.user_extracurricular_activity);
            $scope.org_current_activity_list.push(data.user_extracurricular_activity.name);
            $scope.resetNewActivityEntry();
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Extracurricular');
            return $scope.addSuccessMessage("Extracurricular activity saved successfully");
          });
        }
      };
      $scope.editActivity = function(activity) {
        activity.editing = true;
        activity.new_name = activity.name;
        activity.details[0].new_leadership = activity.details[0].leadership;
        return activity.details[0].new_description = activity.details[0].description;
      };
      $scope.cancelEditActivity = function(activity) {
        return activity.editing = false;
      };
      $scope.saveActivity = function(activity) {
        var new_activity;
        if (!$scope.activityIsSavable(activity)) {
          return;
        }
        new_activity = UserExtracurricularActivityService.newExtracurricularActivity($scope.student);
        new_activity.id = activity.id;
        new_activity.name = activity.new_name;
        new_activity.details.push(UserExtracurricularActivityService.newExtracurricularDetail($scope.student, $scope.selected_semester.id, activity.id));
        new_activity.details[0].id = activity.details[0].id;
        new_activity.details[0].leadership = activity.details[0].new_leadership;
        new_activity.details[0].leadership = activity.details[0].new_leadership;
        new_activity.details[0].description = activity.details[0].new_description;
        return UserExtracurricularActivityService.saveExtracurricularActivity(new_activity).success(function(data) {
          activity.id = data.user_extracurricular_activity.id;
          activity.name = data.user_extracurricular_activity.name;
          activity.details[0] = data.user_extracurricular_detail;
          activity.editing = false;
          if (!_.contains($scope.org_current_activity_list, activity.name)) {
            $scope.org_current_activity_list.push(activity.name);
          }
          $scope.refreshPoints();
          $scope.$emit('just_updated', 'Extracurricular');
          return $scope.addSuccessMessage("Extracurricular activity saved successfully");
        });
      };
      $scope.deleteActivity = function(activity) {
        if (window.confirm("Are you sure you want to delete this activity?")) {
          UserExtracurricularActivityService.deleteExtracurricularActivity(activity, $scope.selected_semester.id).success(function(data) {
            activity.details = [];
            if (activity.non_current_details.length === 0) {
              $scope.user_extracurricular_activities.splice(_.indexOf($scope.user_extracurricular_activities, activity), 1);
            }
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Extracurricular');
            return $scope.addSuccessMessage("Extracurricular activity deleted successfully");
          });
        }
        return false;
      };
      $scope.editingActivities = function() {
        return _.some($scope.user_extracurricular_activities, function(a) {
          return a.editing === true;
        }) || $scope.new_activity.editing === true;
      };
      return $scope.lastUpdated = function(activity) {
        if (activity.updated_at > activity.details[0].updated_at) {
          return activity.updated_at;
        } else {
          return activity.details[0].updated_at;
        }
      };
    }
  ]);

}).call(this);
