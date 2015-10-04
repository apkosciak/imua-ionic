(function() {
  angular.module('myApp').directive('horizontalModuleProgressBar', [
    function() {
      return {
        restrict: 'EA',
        scope: {
          module: '=',
          width: '=',
          height: '=',
          parentclass: '@',
          identifier: '@'
        },
        link: function(scope, element, attrs) {
          var chartSelect, h, resizeParent, svg, w;
          if (scope.parentclass) {
            w = $('.' + scope.parentclass).outerWidth();
            h = $('.' + scope.parentclass).outerHeight();
          } else {
            w = scope.width;
            h = scope.height;
          }
          svg = d3.select(element[0]).append("svg").attr("width", w).attr("height", h).attr("viewBox", "0 0 " + w + " " + h).attr("preserveAspectRatio", "xMidYMin").attr("id", 'bar_' + scope.module.module_title).append("g");
          scope.render = function(module) {
            var color, groups, moduleColor, moduleColorBg, modulePoints, module_value, progressData, rects, remaining_value, stack, totalPoints, xScale;
            svg.selectAll("g").remove();
            switch (module.module_title) {
              case 'Academics':
                moduleColor = '#41e6b2';
                moduleColorBg = '#172924';
                break;
              case 'Service':
                moduleColor = '#e8be28';
                moduleColorBg = '#2a271b';
                break;
              case 'Extracurricular':
                moduleColor = '#ef6629';
                moduleColorBg = '#291b16';
                break;
              case 'College_Prep':
                moduleColor = '#27aae1';
                moduleColorBg = '#142229';
                break;
              case 'Testing':
                moduleColor = '#9665aa';
                moduleColorBg = '#221b2a';
                break;
              case '2-year':
                moduleColor = '#41e6b2';
                moduleColorBg = '#172924';
                break;
              case '4-year':
                moduleColor = '#e8be28';
                moduleColorBg = '#2a271b';
                break;
              case 'Assignments':
                moduleColor = '#ef6629';
                moduleColorBg = '#291b16';
                break;
              case 'Financial':
                moduleColor = '#27aae1';
                moduleColorBg = '#142229';
                break;
              case 'Campus_Connections':
                moduleColor = '#9665aa';
                moduleColorBg = '#221b2a';
            }
            modulePoints = module.points.user;
            totalPoints = module.points.total;
            if (totalPoints === 0) {
              module_value = 1;
              remaining_value = 0;
            } else {
              module_value = modulePoints;
              remaining_value = totalPoints - modulePoints;
            }
            progressData = [
              [
                {
                  x: 0,
                  y: module_value
                }
              ], [
                {
                  x: 0,
                  y: remaining_value
                }
              ]
            ];
            stack = d3.layout.stack();
            stack(progressData);
            xScale = d3.scale.linear().domain([
              0, d3.max(progressData, function(d) {
                return d3.max(d, function(d) {
                  return d.y0 + d.y;
                });
              })
            ]).range([0, w]);
            color = d3.scale.ordinal().range([moduleColor, moduleColorBg]);
            groups = svg.selectAll("g").data(progressData).enter().append("g").style("fill", function(d, i) {
              return color(i);
            });
            return rects = groups.selectAll("rect").data(function(d) {
              return d;
            }).enter().append("rect").attr("x", function(d) {
              return xScale(d.y0);
            }).attr("height", h).attr("width", function(d) {
              return xScale(d.y);
            });
          };
          scope.$watch('module', function() {
            return scope.render(scope.module);
          }, true);
          chartSelect = $("#bar_" + scope.module.module_title);
          resizeParent = function() {
            var onChangeWidth;
            if (scope.parentclass) {
              onChangeWidth = $('.' + scope.parentclass).outerWidth();
              chartSelect.attr("width", onChangeWidth);
              return chartSelect.attr("height", onChangeWidth);
            }
          };
          return $(window).resize(function(event) {
            return resizeParent();
          });
        }
      };
    }
  ]);

}).call(this);
