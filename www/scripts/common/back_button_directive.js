(function() {
  angular.module('myApp').directive("backButton", [
    "$window", function($window) {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return $(elem).on('click', function() {
            return $window.history.back();
          });
        }
      };
    }
  ]);

}).call(this);
