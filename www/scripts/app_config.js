(function() {
  angular.module('myApp').config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider', 'AuthProvider', 'AuthInterceptProvider', 'CONSTANTS', function($stateProvider, $urlRouterProvider, $httpProvider, AuthProvider, AuthInterceptProvider, CONSTANTS) {
      $stateProvider.state('home', {
        url: '/app',
        abstract: true,
        templateUrl: 'common/menu.html',
        controller: 'AppController'
      }).state('home.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: "dashboard/dashboard.html",
            controller: 'DashboardController',
            resolve: {
              current_user: function(SessionService) {
                return SessionService.getCurrentUser();
              },
              user: function() {
                return null;
              }
            }
          }
        }
      });
      $urlRouterProvider.otherwise('/app/dashboard');
      $httpProvider.interceptors.push('AppVersionInterceptor');
      $httpProvider.interceptors.push('CookieInterceptor');
      AuthProvider.loginMethod('POST');
      AuthProvider.loginPath(CONSTANTS.API.base_url + '/users/sign_in.json');
      AuthProvider.logoutMethod('DELETE');
      AuthProvider.logoutPath(CONSTANTS.API.base_url + '/users/sign_out.json');
      AuthProvider.registerMethod('POST');
      AuthProvider.registerPath(CONSTANTS.API.base_url + '/users.json');
      AuthInterceptProvider.interceptAuth(true);
    }
  ]);

}).call(this);
