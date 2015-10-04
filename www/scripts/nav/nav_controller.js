(function() {
  angular.module('myApp').controller('NavController', [
    '$scope', 'Auth', 'SessionService', function($scope, Auth, SessionService) {
      $scope.current_user = SessionService._currentUser;
      return $scope.logout = function() {
        return Auth.logout();
      };
    }
  ]);

}).call(this);
