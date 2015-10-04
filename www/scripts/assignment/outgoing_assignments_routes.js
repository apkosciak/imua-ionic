(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.old_assignments', {
        url: '/old_assignments/:user_id',
        views: {
          'menuContent': {
            templateUrl: 'assignment/outgoing_assignments.html',
            controller: 'OutgoingAssignmentsController',
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
