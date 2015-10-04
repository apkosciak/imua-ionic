(function() {
  angular.module('myApp').service('AppVersionInterceptor', [
    '$rootScope', '$q', function($rootScope, $q) {
      var _appVersion;
      _appVersion = $('meta[name=version]').attr("content");
      this.request = function(config) {
        config.headers['AppVersion'] = _appVersion;
        return config;
      };
      this.response = function(response) {
        _appVersion = response.config.headers.AppVersion;
        return response;
      };
      this.responseError = function(response) {
        var defer;
        defer = $q.defer();
        if (response.status === 426) {
          $rootScope.$broadcast("update_required");
          return defer.promise;
        }
        response;
        return $q.reject(response);
      };
      return this;
    }
  ]);

}).call(this);
