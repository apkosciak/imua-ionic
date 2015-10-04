(function() {
  angular.module('myApp').service('TestService', [
    '$http', 'CONSTANTS', function($http, CONSTANTS) {
      this.newOrgTest = function(orgId) {
        return {
          organization_id: orgId,
          title: "",
          score_type: "",
          description: ""
        };
      };
      this.getOrgTests = function(orgId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/organization/" + orgId + "/tests"));
      };
      this.saveOrgTest = function(orgTest) {
        if (orgTest.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/org_test/" + orgTest.id), {
            orgTest: orgTest
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + "/api/v1/org_test", {
            orgTest: orgTest
          });
        }
      };
      this.deleteOrgTest = function(orgTest) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/org_test/" + orgTest.id));
      };
      this.newUserTest = function(userId, timeUnitId) {
        return {
          user_id: userId,
          org_test_id: "",
          time_unit_id: timeUnitId,
          date: "",
          score: "",
          description: ""
        };
      };
      this.getUserTests = function(userId, timeUnitId) {
        if (timeUnitId == null) {
          timeUnitId = null;
        }
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/tests?time_unit_id=" + timeUnitId));
      };
      this.saveUserTest = function(userTest) {
        if (userTest.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_test/" + userTest.id), {
            userTest: userTest
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + "/api/v1/user_test", {
            userTest: userTest
          });
        }
      };
      this.deleteUserTest = function(userTest) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/user_test/" + userTest.id));
      };
      return this;
    }
  ]);

}).call(this);
