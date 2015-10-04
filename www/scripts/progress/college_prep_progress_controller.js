(function() {
  angular.module('myApp').controller('CollegePrepProgressController', [
    '$scope', 'ProgressService', function($scope, ProgressService) {
      return $scope.$watch('selected_semester', function() {
        if ($scope.selected_semester) {
          return $scope.$emit('loaded_module_milestones');
        }
      });
    }
  ]);

}).call(this);
