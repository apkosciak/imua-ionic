(function() {
  angular.module('myApp').controller('ProfileController', [
    '$scope', 'user_with_contacts', 'UsersService', 'current_user', 'LoadingService', function($scope, user_with_contacts, UsersService, current_user, LoadingService) {
      var clearPasswordFields;
      $scope.current_user = current_user;
      $scope.user = user_with_contacts.user;
      $scope.contacts = user_with_contacts.contacts;
      $scope.time_units = user_with_contacts.time_units;
      $scope.origUser = angular.copy($scope.user);
      $scope.editingInfo = false;
      $scope.editingPassword = false;
      $scope.editingParentGuardianContacts = false;
      $scope.password = {
        current: "",
        "new": "",
        confirm: ""
      };
      $scope.student_mentors = [];
      $scope.errors = ['**Please fix the errors above**'];
      $scope.editing = function() {
        return $scope.editingInfo || $scope.editingPassword;
      };
      $scope.editable = function() {
        return $scope.current_user.role !== $scope.CONSTANTS.USER_ROLES.student || $scope.current_user.id === $scope.user.id;
      };
      $scope.editablePassword = function() {
        return $scope.current_user.id === $scope.user.id;
      };
      $scope.editUserInfo = function() {
        return $scope.editingInfo = true;
      };
      $scope.cancelUpdateUserInfo = function() {
        $scope.files = null;
        $('.js-upload')[0].value = "";
        $scope.user = angular.copy($scope.origUser);
        $scope.editingInfo = false;
        return $scope.errors = ['**Please fix the errors above**'];
      };
      $scope.updateUserInfo = function($event) {
        var fd, laddaElement;
        if ($scope.user.title === null) {
          $scope.user.title = '';
        }
        fd = new FormData();
        angular.forEach($scope.files, function(file) {
          return fd.append('user[avatar]', file);
        });
        laddaElement = $(".ladda-button").get(0);
        LoadingService.buttonStart(laddaElement);
        return UsersService.updateUserInfoWithPicture($scope.user, fd).success(function(data) {
          $scope.user = data.user;
          $scope.files = null;
          $('.js-upload')[0].value = "";
          $scope.editingInfo = false;
          $scope.origUser = angular.copy($scope.user);
          return $scope.addSuccessMessage("Profile info updated successfully!");
        }).error(function(data) {
          $scope.errors = data.info;
          $scope.profileForm.$invalid = true;
          $scope.profileForm.$submitted = true;
          return $scope.addErrorMessage("Profile info was not updated");
        })["finally"](function() {
          return LoadingService.buttonStop();
        });
      };
      $scope.editUserPassword = function() {
        $scope.errors = [];
        return $scope.editingPassword = true;
      };
      $scope.cancelUpdatePassword = function() {
        $scope.editingPassword = false;
        return clearPasswordFields();
      };
      $scope.updateUserPassword = function($event) {
        $scope.errors = [];
        if (!$scope.password.current || !$scope.password["new"] || !$scope.password.confirm) {
          $scope.errors.push("You must fill in all fields.");
          return;
        }
        LoadingService.buttonStart($event.currentTarget);
        return UsersService.updateUserPassword($scope.user, $scope.password).success(function(data) {
          clearPasswordFields();
          return $scope.editingPassword = false;
        }).error(function(data) {
          $scope.errors = [];
          return $scope.errors = data.info;
        })["finally"](function() {
          return LoadingService.buttonStop();
        });
      };
      clearPasswordFields = function() {
        $scope.password = {};
        return $scope.errors = [];
      };
      $scope.editParentGuardianContact = function(index) {
        $scope.contacts[index].editing = true;
        $scope.editingParentGuardianContacts = true;
        $scope.contacts[index].new_name = $scope.contacts[index].name;
        $scope.contacts[index].new_relationship = $scope.contacts[index].relationship;
        $scope.contacts[index].new_email = $scope.contacts[index].email;
        return $scope.contacts[index].new_phone = $scope.contacts[index].phone;
      };
      $scope.cancelEditParentGuardianContact = function(index) {
        if ($scope.contacts[index].id) {
          $scope.contacts[index].editing = false;
        } else {
          $scope.contacts.splice(index, 1);
        }
        return $scope.editingParentGuardianContacts = false;
      };
      $scope.saveParentGuardianContact = function(index) {
        var new_parentGuardianContact;
        new_parentGuardianContact = UsersService.newParentGuardianContact($scope.user.id);
        new_parentGuardianContact.id = $scope.contacts[index].id;
        new_parentGuardianContact.user_id = $scope.contacts[index].user_id;
        new_parentGuardianContact.name = $scope.contacts[index].new_name;
        new_parentGuardianContact.relationship = $scope.contacts[index].new_relationship;
        new_parentGuardianContact.email = $scope.contacts[index].new_email;
        new_parentGuardianContact.phone = $scope.contacts[index].new_phone;
        return UsersService.saveParentGuardianContact(new_parentGuardianContact).success(function(data) {
          $scope.contacts[index] = data.parent_guardian_contact;
          $scope.contacts[index].editing = false;
          return $scope.editingParentGuardianContacts = false;
        });
      };
      $scope.deleteParentGuardianContact = function(index) {
        if (window.confirm("Are you sure you want to delete this contact?")) {
          return UsersService.deleteParentGuardianContact($scope.contacts[index]).success(function(data) {
            return $scope.contacts.splice(index, 1);
          });
        }
      };
      $scope.addParentGuardianContact = function() {
        var blank_contact;
        $scope.editingParentGuardianContacts = true;
        blank_contact = UsersService.newParentGuardianContact($scope.user.id);
        blank_contact.editing = true;
        return $scope.contacts.push(blank_contact);
      };
      $scope.loaded_student_mentors = false;
      return UsersService.getAssignedMentors($scope.user.id).success(function(data) {
        $scope.student_mentors = data.mentors;
        return $scope.loaded_student_mentors = true;
      });
    }
  ]);

}).call(this);
