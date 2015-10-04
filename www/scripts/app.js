(function() {
  angular.module('myApp', ['ionic', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'ngMessages', 'ipCookie', 'textAngular', 'Devise']);

  angular.module('myApp').controller('AppController', [
    '$rootScope', '$scope', '$timeout', '$location', 'CONSTANTS', function($rootScope, $scope, $timeout, $location, CONSTANTS) {
      var timeout;
      $scope.CONSTANTS = CONSTANTS;
      $scope._ = _;
      $scope.current_user = null;
      $scope.alerts = [];
      timeout = null;
      $scope.closeAlert = function(index) {
        console.log("$scope.closeAlert");
        $scope.alerts.splice(index, 1);
        return $timeout.cancel(timeout);
      };
      $scope.addSuccessMessage = function(msg) {
        var message;
        console.log("$scope.addSuccessMessage");
        $scope.clearAlerts();
        message = {
          type: 'success',
          msg: msg
        };
        $scope.alerts.unshift(message);
        return timeout = $timeout(function() {
          return $scope.clearAlerts();
        }, 5000);
      };
      $scope.addErrorMessage = function(msg) {
        var message;
        console.log("$scope.addErrorMessage");
        $scope.clearAlerts();
        message = {
          type: 'danger',
          msg: msg
        };
        return $scope.alerts.unshift(message);
      };
      $scope.clearAlerts = function() {
        console.log("$scope.clearAlerts");
        $timeout.cancel(timeout);
        return $scope.alerts = [];
      };
      $scope.go = function(path) {
        console.log("$scope.go");
        return $location.path(path);
      };
      $scope.$on("update_required", function() {
        console.log("$scope.$on \"update_required\"");
        console.log("TESTING THE CONSOLE LOG");
        return $scope.reload_required = true;
      });
      $scope.$on("clear_alerts", function() {
        console.log("$scope.$on \"clear_alerts\"");
        return $scope.alerts = [];
      });
      $scope.$on('devise:login', function(event, response) {
        console.log("$scope.$on 'devise:login'");
        $scope.current_user = response.user;
        localStorage.setItem("access_token", response.access_token);
        return localStorage.setItem("email", response.user.email);
      });
      $scope.$on('devise:new-session', function(event, response) {
        console.log("$scope.$on 'devise:new-session'");
        $scope.current_user = response.user;
        localStorage.setItem("access_token", response.access_token);
        return localStorage.setItem("email", response.user.email);
      });
      $scope.$on('devise:logout', function(event, oldCurrentUser) {
        console.log("$scope.$on 'devise:logout'");
        localStorage.setItem("access_token", "");
        localStorage.setItem("email", "");
        if ($location.path() !== '/login') {
          return $location.path('/login');
        }
      });
      $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
        var previous_url;
        console.log("$scope.$on 'devise:unauthorized'");
        previous_url = $location.path();
        if ($location.path() !== '/login') {
          $location.path('login').search('pu', previous_url);
        }
        return deferred.reject(xhr);
      });
    }
  ]);

  angular.module('myApp').run([
    '$ionicPlatform', '$rootScope', '$location', 'ipCookie', 'Auth', 'SessionService', function($ionicPlatform, $rootScope, $location, ipCookie, Auth, SessionService) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
      $rootScope.$on('$stateChangeStart', function(event, next, current) {
        $rootScope.$broadcast("clear_alerts");
        return Auth.currentUser().then(function() {
          var authorizedRoles;
          if (next.data && next.data.authorizedRoles) {
            authorizedRoles = next.data.authorizedRoles;
            if (!SessionService.isAuthorized(authorizedRoles)) {
              $location.path('/');
              return false;
            }
          }
          return true;
        });
      });
      $rootScope.$on('$stateChangeError', function(event, current, previous, rejection) {
        $location.path('/');
        return false;
      });
    }
  ]);

}).call(this);
