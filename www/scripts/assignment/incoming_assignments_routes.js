(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.user_assignments', {
        url: '/user_assignments/:user_id',
        views: {
          'menuContent': {
            templateUrl: 'assignment/incoming_assignments.html',
            controller: 'IncomingAssignmentsController',
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
