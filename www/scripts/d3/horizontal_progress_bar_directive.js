(function() {
  angular.module('myApp').directive('horizontalProgressBar', [
    function() {
      return {
        restrict: 'EA',
        scope: {
          student: '=',
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
          svg = d3.select(element[0]).attr("id", scope.student.id + "_" + scope.identifier).append("svg").attr("width", w).attr("height", h).attr("viewBox", "0 0 " + w + " " + h).attr("preserveAspectRatio", "xMidYMin").attr("id", "bar_" + scope.student.id + "_" + scope.identifier).append("g");
          scope.render = function(student) {
            var color, groups, j, len, module, progressData, progress_to_make, rects, ref, stack, total_points, user_points, xScale;
            svg.selectAll("g").remove();
            progressData = [];
            user_points = 0;
            total_points = 0;
            ref = student.modules_progress;
            for (j = 0, len = ref.length; j < len; j++) {
              module = ref[j];
              progressData.push([
                {
                  x: 0,
                  y: module.points.user
                }
              ]);
              user_points += module.points.user;
              total_points += module.points.total;
            }
            if (total_points === 0) {
              progress_to_make = 1;
            } else {
              progress_to_make = total_points - user_points;
            }
            progressData[5] = [
              {
                x: 0,
                y: progress_to_make
              }
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
            color = d3.scale.ordinal().range(['#41e6b2', '#e8be28', '#ef6629', '#27aae1', '#9665aa', '#808080']);
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
          scope.$watch('student', function() {
            return scope.render(scope.student);
          }, true);
          chartSelect = $("#bar_" + scope.student.id + "_" + scope.identifier);
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
