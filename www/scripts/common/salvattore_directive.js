(function() {
  angular.module('myApp').directive('salvattore', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return salvattore.register_grid($(elem).get(0));
        }
      };
    }
  ]);

}).call(this);
