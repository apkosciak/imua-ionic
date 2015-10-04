(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module('myApp').filter('underscoresToSpaces', function() {
    return function(str) {
      if (typeof str !== "string") {
        return str;
      }
      return str.replace(/_/g, ' ');
    };
  });

  angular.module('myApp').filter('printMilestone', function() {
    return function(milestone) {
      if (milestone) {
        if (milestone.submodule === 'YesNo') {
          return milestone.value;
        }
        return milestone.description + " " + milestone.value;
      }
    };
  });

  angular.module('myApp').filter('existsInArray', function() {
    return function(element, array) {
      return indexOf.call(array, element) >= 0;
    };
  });

  angular.module('myApp').filter('parseFloat', function() {
    return function(num) {
      return parseFloat(num);
    };
  });

  angular.module('myApp').filter('addUnderscoreIfFirstCharIsNum', function() {
    return function(str) {
      if (/^\d+/.test(str)) {
        return "_" + str;
      }
      return str;
    };
  });

}).call(this);
