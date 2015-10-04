(function() {
  angular.module('myApp').directive('labelWithErrors', [
    function() {
      return {
        restrict: 'E',
        scope: {
          formfield: '=',
          form: '=',
          label: '@'
        },
        templateUrl: 'common/label_with_errors.html'
      };
    }
  ]);

}).call(this);
