(function() {
  angular.module('myApp').config([
    '$stateProvider', 'CONSTANTS', function($stateProvider, CONSTANTS) {
      return $stateProvider.state('home.setup', {
        url: '/setup/:id',
        views: {
          'menuContent': {
            templateUrl: 'setup/setup.html',
            controller: 'SetupController',
            reloadOnSearch: false,
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              }
            },
            data: {
              authorizedRoles: [CONSTANTS.USER_ROLES.super_admin, CONSTANTS.USER_ROLES.org_admin, CONSTANTS.USER_ROLES.mentor]
            }
          }
        }
      });
    }
  ]);

}).call(this);
