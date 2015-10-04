(function() {
  angular.module('myApp').service('CookieInterceptor', [
    '$rootScope', '$q', function($rootScope, $q) {
      this.request = function(request) {
        request.headers['X-API-EMAIL'] = localStorage.getItem("email");
        request.headers['X-API-TOKEN'] = localStorage.getItem("access_token");
        return request;
      };
      this.response = function(response) {
        return response;
      };
      return this;
    }
  ]);

}).call(this);
