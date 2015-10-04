(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.expectations', {
        url: '/expectations/:user_id',
        views: {
          'menuContent': {
            templateUrl: 'expectation/student_expectations.html',
            controller: 'StudentExpectationController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
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
