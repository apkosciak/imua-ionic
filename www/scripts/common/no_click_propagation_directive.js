(function() {
  angular.module('myApp').directive('noClickPropagation', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return elem.on('click', function(event) {
            return event.stopPropagation();
          });
        }
      };
    }
  ]);

}).call(this);
