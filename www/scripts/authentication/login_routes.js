(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'authentication/login.html',
        controller: 'LoginController'
      });
    }
  ]);

}).call(this);
