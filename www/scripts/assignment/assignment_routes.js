(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.assignment', {
        url: '/assignment/:assignment_id',
        views: {
          'menuContent': {
            templateUrl: 'assignment/assignment.html',
            controller: 'AssignmentController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              assignment: function($q, $stateParams, AssignmentService, OrganizationService) {
                var defer;
                defer = $q.defer();
                if (parseInt($stateParams.assignment_id, 10) === -1) {
                  defer.resolve(null);
                } else {
                  AssignmentService.getAssignmentCollection($stateParams.assignment_id).success(function(data) {
                    var organization;
                    organization = OrganizationService.parseOrganizationWithUsers(data.organization);
                    return defer.resolve(organization.assignments[0]);
                  }).error(function(data) {
                    return defer.reject();
                  });
                }
                return defer.promise;
              },
              edit: function($stateParams) {
                return $stateParams.edit;
              }
            }
          }
        }
      });
    }
  ]);

}).call(this);
