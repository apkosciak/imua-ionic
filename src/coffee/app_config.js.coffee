angular.module('myApp')
.config ['$stateProvider', '$urlRouterProvider','$httpProvider', 'AuthProvider', 'AuthInterceptProvider','CONSTANTS',
($stateProvider, $urlRouterProvider, $httpProvider, AuthProvider, AuthInterceptProvider, CONSTANTS) ->
  $stateProvider.state 'home',
    url:  '/app',
    abstract: true,
    templateUrl: 'common/menu.html',
    controller: 'AppController',
  .state 'home.dashboard',
    url:  '/dashboard',
    views: 
      'menuContent':
        templateUrl: "dashboard/dashboard.html",
        controller: 'DashboardController',
        resolve:
          current_user: (SessionService) ->
            SessionService.getCurrentUser();
          user: () -> null

  $urlRouterProvider.otherwise('/app/dashboard')

  ######### INTERCEPTORS #########
  # Install all interceptors here
  ################################
  $httpProvider.interceptors.push('AppVersionInterceptor')
  $httpProvider.interceptors.push('CookieInterceptor')

  # Custom paths to update the base url
  AuthProvider.loginMethod('POST')
  AuthProvider.loginPath(CONSTANTS.API.base_url+'/users/sign_in.json')

  AuthProvider.logoutMethod('DELETE')
  AuthProvider.logoutPath(CONSTANTS.API.base_url+'/users/sign_out.json')

  AuthProvider.registerMethod('POST')
  AuthProvider.registerPath(CONSTANTS.API.base_url+'/users.json')

  AuthInterceptProvider.interceptAuth(true)

  return
]
