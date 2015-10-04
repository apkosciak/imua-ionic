(function() {
  angular.module('myApp').directive('waitToLoad', [
    function() {
      return {
        restrict: 'A',
        transclude: true,
        scope: {},
        link: function(scope, elem, attrs) {
          return attrs.$observe('waitToLoad', function(value) {
            return scope.watchedObject = value;
          });
        },
        templateUrl: 'common/loading_animation.html'
      };
    }
  ]);

}).call(this);
