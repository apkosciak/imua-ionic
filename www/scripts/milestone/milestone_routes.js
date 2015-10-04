(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.milestone', {
        url: '/milestone/:milestone_id',
        views: {
          'menuContent': {
            templateUrl: 'milestone/milestone.html',
            controller: 'MilestoneController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              milestone_id: function($stateParams) {
                return parseInt($stateParams.milestone_id, 10);
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
