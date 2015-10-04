(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.mentor', {
        url: '/mentor/:id',
        views: {
          'menuContent': {
            templateUrl: 'mentor/mentor.html',
            controller: 'MentorController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              user: function($q, $stateParams, UsersService) {
                var defer;
                defer = $q.defer();
                UsersService.getUser($stateParams.id).success(function(data) {
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
