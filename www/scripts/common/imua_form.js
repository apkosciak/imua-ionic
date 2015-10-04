(function() {
  angular.module('myApp').directive('imuaForm', [
    '$parse', function($parse) {
      return {
        require: 'form',
        link: function(scope, elem, attrs, form) {
          var submitFunction;
          form.$submitted = false;
          submitFunction = $parse(attrs.imuaForm);
          return elem.on('submit', function(event) {
            scope.$apply(function() {
              return form.$submitted = true;
            });
            if (form.$valid) {
              submitFunction(scope, {
                $event: event
              });
              return form.$submitted = false;
            }
          });
        }
      };
    }
  ]);

}).call(this);
