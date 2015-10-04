(function() {
  angular.module('myApp').service('AssignmentService', [
    '$http', '$q', 'CONSTANTS', function($http, $q, CONSTANTS) {
      var self;
      self = this;
      this.setUserAssignmentStatus = function(user_assignment, status) {
        var defer, new_user_assignment;
        new_user_assignment = this.newUserAssignment(user_assignment.user_id, user_assignment.assignment_id);
        new_user_assignment.id = user_assignment.id;
        new_user_assignment.status = status;
        defer = $q.defer();
        this.saveUserAssignment(new_user_assignment).success(function(data) {
          user_assignment.status = data.user_assignment.status;
          user_assignment.updated_at = data.user_assignment.updated_at;
          return defer.resolve(user_assignment);
        });
        return defer.promise;
      };
      this.getAssignmentCollection = function(assignmentId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/assignment/" + assignmentId + "/collection"));
      };
      this.getTaskAssignableUsers = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/get_task_assignable_users"));
      };
      this.getTaskAssignableUsersTasks = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/get_task_assignable_users_tasks"));
      };
      this.broadcastAssignment = function(assignment, userIds) {
        var user_assignments;
        user_assignments = _.map(userIds, function(userId) {
          return self.newUserAssignment(userId, assignment.id);
        });
        if (assignment.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/assignment/" + assignment.id + "/broadcast"), {
            assignment: assignment,
            user_assignments: user_assignments
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + assignment.user_id + "/create_assignment_broadcast"), {
            assignment: assignment,
            user_assignments: user_assignments
          });
        }
      };
      this.collectUserAssignment = function(userAssignmentId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/user_assignment/" + userAssignmentId + "/collect"));
      };
      this.collectUserAssignments = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/user_assignment/collect"));
      };
      this.newAssignment = function(userId) {
        return {
          user_id: userId,
          title: "",
          description: "",
          due_datetime: null
        };
      };
      this.getAssignment = function(assignmentId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/assignment/" + assignmentId));
      };
      this.getAssignments = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/assignments"));
      };
      this.saveAssignment = function(assignment) {
        if (assignment.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/assignment/" + assignment.id), {
            assignment: assignment
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + assignment.user_id + "/assignment"), {
            assignment: assignment
          });
        }
      };
      this.deleteAssignment = function(assignmentId) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/assignment/" + assignmentId));
      };
      this.newUserAssignment = function(userId, assignmentId) {
        return {
          user_id: userId,
          assignment_id: assignmentId,
          status: 0
        };
      };
      this.getUserAssignments = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/user_assignment"));
      };
      this.saveUserAssignment = function(userAssignment) {
        if (userAssignment.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/user_assignment/" + userAssignment.id), {
            user_assignment: userAssignment
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + userAssignment.user_id + "/user_assignment"), {
            user_assignment: userAssignment
          });
        }
      };
      this.deleteUserAssignment = function(userAssignmentId) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/user_assignment/" + userAssignmentId));
      };
      return this;
    }
  ]);

}).call(this);
