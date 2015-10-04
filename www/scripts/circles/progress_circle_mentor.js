(function() {
  angular.module('myApp').directive('progressCircleMentor', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'circles/progress_circle_mentor.html'
      };
    }
  ]);

}).call(this);
