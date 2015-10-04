(function() {
  angular.module('myApp').directive('accordionHeader', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          var clicks, delay, timer;
          delay = 150;
          clicks = 0;
          timer = null;
          return $(elem).click(function() {
            clicks++;
            if (clicks === 1) {
              return timer = setTimeout(function() {
                var all_bodies, my_body, this_accordion;
                this_accordion = $(elem).closest('div[imua-accordion]');
                all_bodies = this_accordion.find('div[accordion-body]');
                my_body = $(elem).nextAll('div[accordion-body]');
                scope.show = !my_body.is(":visible");
                all_bodies.hide();
                if (scope.show) {
                  my_body.show();
                }
                return clicks = 0;
              }, delay);
            } else {
              clearTimeout(timer);
              return clicks = 0;
            }
          });
        }
      };
    }
  ]);

  angular.module('myApp').directive('accordionBody', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return $(elem).hide();
        }
      };
    }
  ]);

  angular.module('myApp').directive('collapseAccordion', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          return $(elem).click(function() {
            var accordion_id;
            accordion_id = "#" + attrs.collapseAccordion;
            return $(accordion_id).find('div[accordion-body]').hide();
          });
        }
      };
    }
  ]);

}).call(this);
