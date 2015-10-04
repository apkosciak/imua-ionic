(function() {
  angular.module('myApp').directive('progressBarDefault', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'circles/progress_bar_default.html'
      };
    }
  ]);

}).call(this);
