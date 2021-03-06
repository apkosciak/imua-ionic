angular.module 'myApp', ['ionic','myApp.directives', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'ngMessages','ipCookie', 'textAngular', 'Devise']

angular.module('myApp')
.controller 'AppController', ['$rootScope','$scope', '$timeout', '$location', 'CONSTANTS',
($rootScope, $scope, $timeout, $location, CONSTANTS) ->
  $scope.CONSTANTS = CONSTANTS
  $scope._ = _
  $scope.current_user = null

  $scope.alerts = []

  timeout = null

  $scope.closeAlert = (index) ->
    $scope.alerts.splice(index, 1)
    $timeout.cancel(timeout)

  $scope.addSuccessMessage = (msg) ->
    $scope.clearAlerts()
    message = { type: 'success', msg: msg}
    $scope.alerts.unshift(message)

    timeout = $timeout () ->
      $scope.clearAlerts()
    , 5000

  $scope.addErrorMessage = (msg) ->
    $scope.clearAlerts()
    message = { type: 'danger', msg: msg}
    $scope.alerts.unshift(message)

  $scope.clearAlerts = () ->
    $timeout.cancel(timeout)
    $scope.alerts = []

  $scope.go = (path) ->
    $location.path(path)

  $scope.$on "update_required", () ->
    console.log("TESTING THE CONSOLE LOG")
    $scope.reload_required = true

  $scope.$on "clear_alerts", () ->
    $scope.alerts = []

  $scope.$on 'devise:login', (event, response) ->
    $scope.current_user = response.user
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("email", response.user.email)

  $scope.$on 'devise:new-session', (event, response) ->
    $scope.current_user = response.user
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("email", response.user.email)

  $scope.$on 'devise:logout', (event, oldCurrentUser) ->
    localStorage.setItem("access_token", "")
    localStorage.setItem("email", "")

    if $location.path() != '/login'
      $location.path('/login')

  $scope.$on 'devise:unauthorized', (event, xhr, deferred) ->
    previous_url = $location.path()
    if $location.path() != '/login'
      $location.path('login').search('pu', previous_url)

    deferred.reject(xhr)
]

angular.module('myApp')
.run ['$ionicPlatform','$rootScope', '$location', 'ipCookie', 'Auth', 'SessionService',
($ionicPlatform,$rootScope, $location, ipCookie, Auth, SessionService) ->

  $ionicPlatform.ready () ->
    if window.cordova && window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    if window.StatusBar
      StatusBar.styleDefault()
    return

  $rootScope.$on '$stateChangeStart', (event, next, current) ->

    # Clear messages
    $rootScope.$broadcast("clear_alerts")

    # Always calling getCurrentUser on every change/refresh to make sure current_user is set
    Auth.currentUser()
      .then () ->
        # If no authorized roles than the route is authorized for everyone
        if next.data and next.data.authorizedRoles
          authorizedRoles = next.data.authorizedRoles

          if !SessionService.isAuthorized(authorizedRoles)
            $location.path('/')
            return false

        return true

  $rootScope.$on '$stateChangeError', (event, current, previous, rejection) ->
    $location.path('/')
    return false

  @
]
