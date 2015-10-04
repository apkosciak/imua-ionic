(function() {
  angular.module('myApp').directive('progressCircleMentorattention', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'circles/progress_circle_mentorattention.html'
      };
    }
  ]);

}).call(this);
