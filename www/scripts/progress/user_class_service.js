(function() {
  angular.module("myApp").service("UserClassService", [
    '$http', 'CONSTANTS', function($http, CONSTANTS) {
      this.all = function(userId, time_unit_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/user_class?time_unit=" + time_unit_id));
      };
      this["new"] = function(user, time_unit_id) {
        return {
          name: "",
          grade_value: null,
          gpa: 0,
          period: null,
          room: null,
          credit_hours: 1,
          level: CONSTANTS.CLASS_LEVELS.regular,
          subject: "",
          time_unit_id: time_unit_id,
          user_id: user.id,
          editing: true
        };
      };
      this.save = function(user_class) {
        if (user_class.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_class/" + user_class.id), {
            user_class: user_class
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + user_class.user_id + "/user_class"), {
            user_class: user_class
          });
        }
      };
      this["delete"] = function(user_class) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/user_class/" + user_class.id));
      };
      return this;
    }
  ]);

}).call(this);
