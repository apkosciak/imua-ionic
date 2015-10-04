(function() {
  angular.module('myApp').directive('formDatepicker', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          date: '=',
          label: '@',
          form: '='
        },
        link: function(scope, elem, attrs) {
          return scope.open = function(event) {
            event.preventDefault();
            event.stopPropagation();
            return scope.opened = !scope.opened;
          };
        },
        templateUrl: 'common/form_datepicker.html'
      };
    }
  ]);

}).call(this);
