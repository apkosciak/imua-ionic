(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.progress', {
        url: '/progress/:user_id',
        views: {
          'menuContent': {
            templateUrl: 'progress/progress.html',
            controller: 'ProgressController',
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
