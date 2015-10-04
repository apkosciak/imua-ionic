(function() {
  angular.module('myApp').service('ProgressService', [
    '$http', '$q', 'CONSTANTS', function($http, $q, CONSTANTS) {
      this.getModules = function(user, time_unit_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/" + time_unit_id + "/progress"));
      };
      this.progressForModule = function(user, time_unit_id, module_title) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/" + time_unit_id + "/progress/" + module_title));
      };
      this.yesNoMilestones = function(user, time_unit_id, module_title) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/" + time_unit_id + "/milestones/" + module_title + "/yesno"));
      };
      this.addUserMilestone = function(user, time_unit_id, milestone_id) {
        return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/" + time_unit_id + "/milestones/" + milestone_id));
      };
      this.deleteUserMilestone = function(user, time_unit_id, milestone_id) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/" + time_unit_id + "/milestones/" + milestone_id));
      };
      this.nextSemester = function(user) {
        return $http.put(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/next"));
      };
      this.prevSemester = function(user) {
        return $http.put(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/time_unit/previous"));
      };
      this.getAllModulesProgress = function(student, semester_id) {
        var defer;
        defer = $q.defer();
        this.getModules(student, semester_id).success(function(data) {
          student.modules_progress = data.modules_progress;
          return defer.resolve(student);
        });
        return defer.promise;
      };
      this.getOverallProgress = function(student) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + student.id + "/progress"));
      };
      this.getUserProgress = function(student) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + student.id + "/progress_2"));
      };
      this.getUserProgressForTimeUnit = function(user_id, time_unit_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user_id + "/progress_2?time_unit_id=" + time_unit_id));
      };
      this.getUserProgressForModule = function(user_id, module_title) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user_id + "/progress_2?module=" + module_title));
      };
      this.getUserProgressForTimeUnitAndModule = function(user_id, time_unit_id, module_title) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user_id + "/progress_2?time_unit_id=" + time_unit_id + "&module=" + module_title));
      };
      this.getRecalculatedUserProgress = function(user_id, time_unit_id, module_title) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user_id + "/progress_2?time_unit_id=" + time_unit_id + "&module=" + module_title + "&recalculate=true"));
      };
      this.getRecalculatedModuleMilestones = function(user, time_unit_id, module_title) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/progress/recalculated_milestones/?user_id=" + user.id + "&time_unit_id=" + time_unit_id + "&module_title=" + module_title));
      };
      this.getRecalculatedMilestones = function(user, time_unit_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/progress/recalculated_milestones/?user_id=" + user.id + "&time_unit_id=" + time_unit_id));
      };
      this.getStudentDashboard = function(user_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user_id + "/student_dashboard"));
      };
      this.getStudentExpectations = function(user_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user_id + "/student_expectations"));
      };
      return this;
    }
  ]);

}).call(this);
