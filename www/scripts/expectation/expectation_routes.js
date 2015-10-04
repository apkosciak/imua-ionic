(function() {
  angular.module('myApp').config([
    '$stateProvider', function($stateProvider) {
      return $stateProvider.state('home.expectation', {
        url: '/expectation/:expectation_id',
        views: {
          'menuContent': {
            templateUrl: 'expectation/expectation.html',
            controller: 'ExpectationController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              expectation_id: function($stateParams) {
                return parseInt($stateParams.expectation_id, 10);
              }
            }
          }
        }
      });
    }
  ]);

}).call(this);
