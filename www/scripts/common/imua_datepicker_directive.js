(function() {
  angular.module('myApp').directive('imuaDatepicker', [
    function() {
      return {
        restrict: 'E',
        scope: {
          date: '='
        },
        link: function(scope, elem, attrs) {
          return scope.open = function(event) {
            event.preventDefault();
            event.stopPropagation();
            return scope.opened = !scope.opened;
          };
        },
        templateUrl: 'common/imua_datepicker.html'
      };
    }
  ]);

}).call(this);
