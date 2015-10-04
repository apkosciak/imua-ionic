(function() {
  angular.module('myApp').directive('progressCircleAssigned', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'circles/progress_circle_assigned.html'
      };
    }
  ]);

}).call(this);
