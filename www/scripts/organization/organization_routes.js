(function() {
  angular.module('myApp').config([
    '$stateProvider', 'CONSTANTS', function($stateProvider, CONSTANTS) {
      return $stateProvider.state('home.organization', {
        url: '/organization/:id',
        views: {
          'menuContent': {
            templateUrl: 'organization/organization.html',
            controller: 'OrganizationCtrl',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              }
            },
            data: {
              authorizedRoles: [CONSTANTS.USER_ROLES.super_admin, CONSTANTS.USER_ROLES.org_admin]
            }
          }
        }
      });
    }
  ]);

}).call(this);
