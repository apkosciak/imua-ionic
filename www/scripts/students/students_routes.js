(function() {
  angular.module('myApp').config([
    '$stateProvider', 'CONSTANTS', function($stateProvider, CONSTANTS) {
      return $stateProvider.state('home.students', {
        url: '/students/:id',
        views: {
          'menuContent': {
            templateUrl: 'students/students.html',
            controller: 'StudentsCtrl',
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
