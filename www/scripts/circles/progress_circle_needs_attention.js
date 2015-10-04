(function() {
  angular.module('myApp').directive('progressCircleNeedsAttention', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'circles/progress_circle_needs_attention.html'
      };
    }
  ]);

}).call(this);
