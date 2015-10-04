(function() {
  angular.module("myApp").service("UserExtracurricularActivityService", [
    '$http', 'CONSTANTS', function($http, CONSTANTS) {
      this.all = function(userId, time_unit_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/user_extracurricular_activity?time_unit_id=" + time_unit_id));
      };
      this.otherActivity = function(student, time_unit_id, extracurricularActivityId) {
        return {
          name: "Other",
          user_id: student.id,
          details: [
            {
              name: "",
              user_extracurricular_activity_id: extracurricularActivityId,
              time_unit_id: time_unit_id,
              user_id: student.id,
              leadership: "",
              description: ""
            }
          ]
        };
      };
      this.newExtracurricularActivity = function(student) {
        return {
          name: "",
          user_id: student.id,
          editing: true,
          details: [],
          non_current_details: []
        };
      };
      this.newExtracurricularDetail = function(student, time_unit_id, extracurricularActivityId) {
        return {
          name: "",
          user_extracurricular_activity_id: extracurricularActivityId,
          time_unit_id: time_unit_id,
          user_id: student.id,
          leadership: "",
          description: "",
          editing: true
        };
      };
      this.saveExtracurricularActivity = function(user_extracurricular_activity) {
        return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_extracurricular_activity/" + user_extracurricular_activity.id), {
          user_extracurricular_activity: user_extracurricular_activity,
          user_extracurricular_detail: user_extracurricular_activity.details[0]
        });
      };
      this.saveNewExtracurricularActivity = function(new_extracurricular_activity) {
        return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + new_extracurricular_activity.user_id + "/user_extracurricular_activity"), {
          user_extracurricular_activity: new_extracurricular_activity,
          user_extracurricular_detail: new_extracurricular_activity.details[0]
        });
      };
      this.saveExtracurricularDetail = function(user_extracurricular_detail) {
        if (user_extracurricular_detail.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_extracurricular_activity_detail/" + user_extracurricular_detail.id), {
            user_extracurricular_detail: user_extracurricular_detail
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + user_extracurricular_detail.user_id + "/user_extracurricular_activity_detail"), {
            user_extracurricular_detail: user_extracurricular_detail
          });
        }
      };
      this.deleteExtracurricularActivity = function(user_extracurricular_activity, time_unit_id) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/user_extracurricular_activity/" + user_extracurricular_activity.id + "?time_unit_id=" + time_unit_id));
      };
      return this;
    }
  ]);

}).call(this);
