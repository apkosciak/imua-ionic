(function() {
  angular.module('myApp').service('ExpectationService', [
    '$http', 'CONSTANTS', function($http, CONSTANTS) {
      this.saveExpectationStatus = function(expectationId, assignees, comment) {
        var refined_assignees;
        refined_assignees = _.map(assignees, function(a) {
          return {
            user_expectation_id: a.user.user_expectations[0].id,
            status: a.status
          };
        });
        return $http.put(CONSTANTS.API.base_url + ("/api/v1/expectation/" + expectationId + "/status"), {
          assignees: refined_assignees,
          comment: comment
        });
      };
      this.getExpectationStatus = function(expectationId) {
        return $http.get(CONSTANTS.API.base_url + ("api/v1/expectation/" + expectationId + "/status"));
      };
      this.newExpectation = function(orgId) {
        return {
          organization_id: orgId,
          title: "",
          description: "",
          rank: 0
        };
      };
      this.getExpectations = function(orgId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/organization/" + orgId + "/expectations"));
      };
      this.saveExpectation = function(expectation) {
        if (expectation.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/organization/" + expectation.organization_id + "/expectations/" + expectation.id), {
            expectation: expectation
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/organization/" + expectation.organization_id + "/expectations"), {
            expectation: expectation
          });
        }
      };
      this.deleteExpectation = function(expectation) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/organization/" + expectation.organization_id + "/expectations/" + expectation.id));
      };
      this.getUserExpectations = function(user) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + user.id + "/user_expectation"));
      };
      this.getUserExpectation = function(user_expectation_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/user_expectation/" + user_expectation_id));
      };
      this.updateUserExpectation = function(user_expectation) {
        return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_expectation/" + user_expectation.id), {
          userExpectation: user_expectation
        });
      };
      this.getUserExpectationHistory = function(user_expectation_id) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/user_expectation/" + user_expectation_id + "/history"));
      };
      this.updateUserExpectationComment = function(user_expectation) {
        return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_expectation/" + user_expectation.id + "/comment"), {
          userExpectation: user_expectation
        });
      };
      return this;
    }
  ]);

}).call(this);
