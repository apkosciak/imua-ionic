(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.assignments', {
        url: '/assignments/:user_id',
        views: {
          'menuContent': {
            templateUrl: 'assignment/assignments.html',
            controller: 'AssignmentsController',
            reloadOnSearch: false,
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              user: function($q, $stateParams, UsersService) {
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
