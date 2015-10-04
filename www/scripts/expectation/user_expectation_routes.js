(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.userexpectation', {
        url: '/user/:user_id/user_expectation/:user_expectation_id',
        views: {
          'menuContent': {
            templateUrl: 'expectation/user_expectation.html',
            controller: 'UserExpectationController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              user_expectation: function($q, $stateParams, ExpectationService) {
                var defer;
                defer = $q.defer();
                ExpectationService.getUserExpectation($stateParams.user_expectation_id).success(function(data) {
                  return defer.resolve(data.user_expectation);
                }).error(function(data) {
                  return defer.reject();
                });
                return defer.promise;
              },
              student: function($q, $stateParams, UsersService) {
                var defer;
                defer = $q.defer();
                UsersService.getUser($stateParams.user_id).success(function(data) {
                  return defer.resolve(data.user);
                }).error(function(data) {
                  return defer.reject();
                });
                return defer.promise;
              }
            }
          }
        }
      });
    }
  ]);

}).call(this);
