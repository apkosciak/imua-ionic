(function() {
  angular.module('myApp').controller('LoginController', [
    '$rootScope', '$scope', '$location', 'Auth', 'UsersService', function($rootScope, $scope, $location, Auth, UsersService) {
      $rootScope.hide_nav = true;
      $scope.forgot_password = false;
      Auth.logout();
      $scope.forgotPassword = function() {
        return $scope.forgot_password = true;
      };
      $scope.backToLogin = function() {
        return $scope.forgot_password = false;
      };
      $scope.login = function(user) {
        return Auth.login(user).then(function(user) {
          var previous_url;
          $rootScope.hide_nav = false;
          previous_url = $location.search().pu;
          if (previous_url) {
            $location.path(previous_url);
            return $location.url($location.path());
          } else {
            return $location.path('/');
          }
        }, function(error) {
          return $scope.addErrorMessage(error.data.error);
        });
      };
      return $scope.resetPassword = function(user) {
        return UsersService.resetPassword(user).then(function(response) {
          $scope.forgot_password = false;
          return $scope.addSuccessMessage(response.data.message);
        }, function(response) {
          return $scope.addErrorMessage(response.data.message);
        });
      };
    }
  ]);

}).call(this);
