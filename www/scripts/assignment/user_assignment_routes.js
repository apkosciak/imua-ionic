(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.user_assignment', {
        url: '/user_assignment/:user_assignment_id',
        views: {
          'menuContent': {
            templateUrl: 'assignment/user_assignment.html',
            controller: 'UserAssignmentController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              user_assignment: function($q, $stateParams, AssignmentService, OrganizationService) {
                var defer;
                defer = $q.defer();
                AssignmentService.collectUserAssignment($stateParams.user_assignment_id).success(function(data) {
                  var organization;
                  organization = OrganizationService.parseOrganizationWithUsers(data.organization);
                  return defer.resolve(organization.user_assignments[0]);
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
