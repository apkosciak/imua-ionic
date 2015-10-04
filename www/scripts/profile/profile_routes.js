(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.profile', {
        url: '/profile/:user_id',
        views: {
          'menuContent': {
            templateUrl: 'profile/profile.html',
            controller: 'ProfileController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              user_with_contacts: function($q, $stateParams, UsersService) {
                var defer;
                defer = $q.defer();
                UsersService.getUserWithContacts($stateParams.user_id).success(function(data) {
                  return defer.resolve(data.user_with_contacts);
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
