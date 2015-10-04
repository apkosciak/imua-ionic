(function() {
  angular.module('myApp').filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    };
  });

  angular.module('myApp').filter('formatMDY', function() {
    return function(date, format) {
      if (moment(date).isValid()) {
        return moment(date).format('MM/DD/YYYY');
      }
    };
  });

}).call(this);
