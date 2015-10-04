(function() {
  angular.module('myApp').directive('focusMe', [
    function() {
      return {
        restrict: 'A',
        scope: {
          trigger: '=focusMe'
        },
        link: function(scope, elem, attrs) {
          return scope.$watch('trigger', function(val) {
            if (val === true) {
              elem[0].focus();
              return scope.trigger = false;
            }
          });
        }
      };
    }
  ]);

}).call(this);
