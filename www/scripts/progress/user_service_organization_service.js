(function() {
  angular.module("myApp").service("UserServiceOrganizationService", [
    '$http', function($http) {
      this.all = function(userId, time_unit_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/user_service_organization?time_unit_id=" + time_unit_id));
      };
      this.otherOrganization = function(user, time_unit_id, service_organization_id) {
        return {
          name: "Other",
          description: "",
          user_id: user.id,
          hours: [
            {
              name: "",
              user_service_organization_id: service_organization_id,
              hours: "",
              date: "",
              time_unit_id: time_unit_id,
              user_id: user.id,
              description: ""
            }
          ]
        };
      };
      this.newServiceOrganization = function(user) {
        return {
          name: "",
          description: "",
          user_id: user.id,
          hours: [],
          non_current_hours: []
        };
      };
      this.newServiceHour = function(user, time_unit_id, service_organization_id) {
        return {
          name: "",
          user_service_organization_id: service_organization_id,
          hours: null,
          date: "",
          time_unit_id: time_unit_id,
          user_id: user.id,
          description: ""
        };
      };
      this.saveServiceOrganization = function(user_service_organization) {
        if (user_service_organization.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_service_organization/" + user_service_organization.id), {
            user_service_organization: user_service_organization
          });
        }
      };
      this.saveNewServiceOrganization = function(new_service_organization) {
        return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + new_service_organization.user_id + "/user_service_organization"), {
          user_service_organization: new_service_organization,
          user_service_hour: new_service_organization.hours[0]
        });
      };
      this.saveServiceHour = function(user_service_hour) {
        if (user_service_hour.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_service_hour/" + user_service_hour.id), {
            user_service_hour: user_service_hour
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + user_service_hour.user_id + "/user_service_hour"), {
            user_service_hour: user_service_hour
          });
        }
      };
      this.deleteServiceOrganization = function(user_service_organization, time_unit_id) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/user_service_organization/" + user_service_organization.id + "?time_unit_id=" + time_unit_id));
      };
      this.deleteServiceHour = function(user_service_hour) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/user_service_hour/" + user_service_hour.id));
      };
      return this;
    }
  ]);

}).call(this);
