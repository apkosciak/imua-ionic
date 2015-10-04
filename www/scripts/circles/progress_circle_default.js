(function() {
  angular.module('myApp').directive('progressCircleDefault', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'circles/progress_circle_default.html'
      };
    }
  ]);

}).call(this);
