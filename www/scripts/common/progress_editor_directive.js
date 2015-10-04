(function() {
  angular.module('myApp').directive('progressEditor', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return scope.$watch('selected_semester', function(sem) {
            if (sem) {
              if (scope.current_user.is_student && (scope.current_user.id !== scope.student.id || scope.current_user.time_unit_id !== sem.id)) {
                return $(elem).hide();
              } else {
                return $(elem).show();
              }
            }
          });
        }
      };
    }
  ]);

}).call(this);
