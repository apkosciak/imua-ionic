(function() {
  angular.module('myApp').directive('taskEditor', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return scope.$watch('assignment', function(assignment) {
            if (assignment) {
              if (scope.current_user.id !== scope.assignment.user_id && !scope.current_user.is_org_admin) {
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
