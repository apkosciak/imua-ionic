(function() {
  angular.module('myApp').directive('historyLineChart', [
    function() {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          parentclass: '@',
          identifier: '@'
        },
        link: function(scope, element, attrs) {
          d3.select(element[0]).attr("id", 'line_chart');
          return setTimeout(function() {
            var chart;
            return chart = c3.generate({
              bindto: '#line_chart',
              data: {
                json: {
                  GPA: scope.data.values
                },
                types: {
                  GPA: 'area'
                }
              },
              axis: {
                x: {
                  type: 'category',
                  categories: scope.data.dates
                }
              }
            });
          }, 500);
        }
      };
    }
  ]);

}).call(this);
