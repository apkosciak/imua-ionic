(function() {
  angular.module('myApp').controller('AddUserModalController', [
    '$scope', '$modalInstance', 'current_user', 'organization', 'new_user', 'UsersService', 'LoadingService', function($scope, $modalInstance, current_user, organization, new_user, UsersService, LoadingService) {
      $scope.formErrors = ['**Please fix the errors above**'];
      $scope.current_user = current_user;
      $scope.user = new_user;
      $scope.organization = organization;
      $scope.add = function() {
        var laddaElement;
        $scope.formErrors = [];
        laddaElement = $(".ladda-button").get(0);
        if ($scope.formErrors.length === 0) {
          LoadingService.buttonStart(laddaElement);
          return UsersService.addUser($scope.user).success(function(data) {
            return $modalInstance.close(data.user);
          }).error(function(data) {
            $scope.formErrors.push(data.info);
            $scope.newUserForm.$invalid = true;
            return $scope.newUserForm.$submitted = true;
          })["finally"](function() {
            return LoadingService.buttonStop();
          });
        }
      };
      return $scope.cancel = function() {
        return $modalInstance.dismiss('cancel');
      };
    }
  ]);

}).call(this);
