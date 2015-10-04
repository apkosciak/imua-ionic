(function() {
  angular.module('myApp').directive('orgSetupEditor', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return scope.$watch('current_user', function(current_user) {
            if (current_user) {
              if (current_user.role > scope.CONSTANTS.USER_ROLES.org_admin) {
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
