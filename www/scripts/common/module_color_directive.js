(function() {
  angular.module('myApp').directive('modulecolor', [
    'CONSTANTS', function(CONSTANTS) {
      return {
        link: function(scope, element, attrs) {
          return attrs.$observe('modulecolor', function(value) {
            var colorClass, moduleTitle;
            moduleTitle = value;
            colorClass = "color--" + moduleTitle.toLowerCase();
            $(element).removeClass(function(index, css) {
              return ((css.match(/\bcolor--\S+/g)) || []).join(' ');
            });
            return $(element).addClass(colorClass);
          });
        }
      };
    }
  ]);

}).call(this);
