(function() {
  angular.module('myApp').service('UsersService', [
    '$http', 'CONSTANTS', function($http, CONSTANTS) {
      this.getUserWithContacts = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/user_with_contacts"));
      };
      this.getUser = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId));
      };
      this.addUser = function(user) {
        return $http.post(CONSTANTS.API.base_url + '/api/v1/users', {
          user: user
        });
      };
      this.updateUserInfoWithPicture = function(user, formData) {
        formData.append("user[email]", user.email);
        formData.append("user[first_name]", user.first_name);
        formData.append("user[last_name]", user.last_name);
        formData.append("user[phone]", user.phone);
        formData.append("user[class_of]", user.class_of);
        formData.append("user[time_unit_id]", user.time_unit_id);
        formData.append("user[title]", user.title);
        return $http.put(CONSTANTS.API.base_url + '/api/v1/users/' + user.id, formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': void 0
          }
        });
      };
      this.updateUserPassword = function(user, password) {
        user = {
          id: user.id,
          current_password: password.current,
          password: password["new"],
          password_confirmation: password.confirm
        };
        return $http.put(CONSTANTS.API.base_url + '/api/v1/users/' + user.id + '/update_password', {
          user: user
        });
      };
      this.resetPassword = function(user) {
        return $http.post(CONSTANTS.API.base_url + '/api/v1/users/password', {
          user: user
        });
      };
      this.getAssignedStudents = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/relationship/students"));
      };
      this.getAssignedStudentsForGroup = function(userIds) {
        return $http.get(CONSTANTS.API.base_url + "/api/v1/relationship/assigned_students_for_group", {
          params: {
            'user_ids[]': userIds
          }
        });
      };
      this.getAssignedMentors = function(userId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/users/" + userId + "/relationship/mentors"));
      };
      this.assign = function(mentorId, studentId) {
        return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + mentorId + "/relationship/" + studentId));
      };
      this.unassign = function(mentorId, studentId) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/users/" + mentorId + "/relationship/" + studentId));
      };
      this.saveParentGuardianContact = function(contact) {
        if (contact.id) {
          return $http.put(CONSTANTS.API.base_url + ("/api/v1/parent_guardian_contact/" + contact.id), {
            parent_guardian_contact: contact
          });
        } else {
          return $http.post(CONSTANTS.API.base_url + ("/api/v1/users/" + contact.user_id + "/parent_guardian_contact"), {
            parent_guardian_contact: contact
          });
        }
      };
      this.deleteParentGuardianContact = function(contact) {
        return $http["delete"](CONSTANTS.API.base_url + ("/api/v1/parent_guardian_contact/" + contact.id));
      };
      this.newOrgAdmin = function(orgId) {
        return {
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          role: CONSTANTS.USER_ROLES.org_admin,
          organization_id: orgId,
          is_org_admin: true,
          status: 0
        };
      };
      this.newMentor = function(orgId) {
        return {
          email: "",
          title: "",
          first_name: "",
          last_name: "",
          phone: "",
          role: CONSTANTS.USER_ROLES.mentor,
          organization_id: orgId,
          is_mentor: true,
          status: 0
        };
      };
      this.newStudent = function(orgId) {
        return {
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          role: CONSTANTS.USER_ROLES.student,
          organization_id: orgId,
          class_of: 0,
          is_student: true,
          status: 0
        };
      };
      this.newParentGuardianContact = function(userId) {
        return {
          id: null,
          user_id: userId,
          name: "",
          relationship: "",
          email: "",
          phone: ""
        };
      };
      this.determineEarnedMilestones = function(orgMilestones, userMilestones) {
        var i, len, om, um;
        for (i = 0, len = userMilestones.length; i < len; i++) {
          um = userMilestones[i];
          om = _.find(orgMilestones, function(om) {
            return om.id === um.milestone_id;
          });
          if (om) {
            om.earned = true;
          } else {
            console.log("Error: user_milestone has no matching org_milestone.", um, orgMilestones);
          }
        }
        return orgMilestones;
      };
      return this;
    }
  ]);

}).call(this);
