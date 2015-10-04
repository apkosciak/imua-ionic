(function() {
  angular.module('myApp').controller('ProgressController', [
    '$state', '$scope', 'current_user', 'student', 'OrganizationService', 'ProgressService', 'ExpectationService', 'UsersService', function($state, $scope, current_user, student, OrganizationService, ProgressService, ExpectationService, UsersService) {
      var modulePointsWithLastUpdated, refreshOverallProgress, setWidth;
      $scope.modules_progress = [];
      $scope.selected_module = null;
      $scope.semesters = [];
      $scope.selected_semester = null;
      $scope.current_user = current_user;
      $scope.student = student;
      $scope.needs_attention = false;
      $scope.just_updated = '';
      $scope.loaded_milestones = false;
      $scope.loaded_module_milestones = false;
      $scope.loaded_milestones = false;
      $scope.$on('just_updated', function(event, module) {
        $scope.just_updated = module;
        return _.findWhere($scope.modules_progress, {
          module_title: module
        }).last_updated = new Date();
      });
      $scope.$on('loaded_module_milestones', function() {
        return $scope.loaded_module_milestones = true;
      });
      $scope.$watch('loaded_module_milestones', function() {
        if ($scope.loaded_module_milestones && $scope.loaded_milestones) {
          return $scope.loaded_milestones = true;
        }
      });
      $scope.$watch('loaded_milestones', function() {
        if ($scope.loaded_module_milestones && $scope.loaded_milestones) {
          return $scope.loaded_milestones = true;
        }
      });
      setWidth = function() {
        var contentWidth, sideNavWidth, windowWidth;
        windowWidth = $(window).outerWidth();
        contentWidth = $('.js-circles').outerWidth();
        sideNavWidth = $('.js-module-data-side-nav').outerWidth();
        if (contentWidth >= windowWidth) {
          return $('.js-module-data-content-container').width(contentWidth - sideNavWidth - 220);
        } else {
          return $('.js-module-data-content-container').width(windowWidth - sideNavWidth - 220);
        }
      };
      $(window).resize(function(event) {
        return setWidth();
      });
      modulePointsWithLastUpdated = function(student_with_modules_progress, modules_progress) {
        var i, len, module, sorted_module, total_points, user_points;
        user_points = 0;
        total_points = 0;
        for (i = 0, len = modules_progress.length; i < len; i++) {
          module = modules_progress[i];
          user_points += module.points.user;
          total_points += module.points.total;
          switch (module.module_title) {
            case "Academics":
              if (!_.isEmpty(student_with_modules_progress.user_classes)) {
                sorted_module = _.sortBy(student_with_modules_progress.user_classes, function(u) {
                  return u.updated_at;
                });
                module.last_updated = _.last(sorted_module).updated_at;
              }
              break;
            case "Service":
              if (!_.isEmpty(student_with_modules_progress.user_service_hours)) {
                sorted_module = _.sortBy(student_with_modules_progress.user_service_hours, function(u) {
                  return u.updated_at;
                });
                module.last_updated = _.last(sorted_module).updated_at;
              }
              break;
            case "Extracurricular":
              if (!_.isEmpty(student_with_modules_progress.user_extracurricular_activity_details)) {
                sorted_module = _.sortBy(student_with_modules_progress.user_extracurricular_activity_details, function(u) {
                  return u.updated_at;
                });
                module.last_updated = _.last(sorted_module).updated_at;
              }
              break;
            case "College_Prep":
              module.last_updated = null;
              break;
            case "Testing":
              if (!_.isEmpty(student_with_modules_progress.user_tests)) {
                sorted_module = _.sortBy(student_with_modules_progress.user_tests, function(u) {
                  return u.updated_at;
                });
                module.last_updated = _.last(sorted_module).updated_at;
              }
          }
        }
        $scope.points_earned = user_points;
        return $scope.total_points = total_points;
      };
      ProgressService.getUserProgressForTimeUnit($scope.student.id, $scope.student.time_unit_id).success(function(data) {
        var i, len, ref, results, tu;
        $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
        $scope.student_with_modules_progress = $scope.organization.students[0];
        $scope.modules_progress = $scope.student_with_modules_progress.modules_progress;
        modulePointsWithLastUpdated($scope.student_with_modules_progress, $scope.modules_progress);
        $scope.semesters = [];
        ref = $scope.organization.time_units;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          tu = ref[i];
          $scope.semesters.push(tu);
          if (tu.id === $scope.student.time_unit_id) {
            tu.name = "This Semester";
            $scope.selected_semester = $scope.semesters[$scope.semesters.length - 1];
            results.push($scope.new_selected_semester = $scope.selected_semester);
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
      ExpectationService.getUserExpectations($scope.student).success(function(data) {
        var i, len, ref, results, ue;
        ref = data.user_expectations;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          ue = ref[i];
          if (ue.status >= 2) {
            $scope.needs_attention = true;
            break;
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
      $scope.$watch('selected_semester', function() {
        var module_org_milestones, module_title, module_user_milestones, time_unit_id;
        if ($scope.selected_semester && $scope.selected_module && !$scope.loaded_milestones) {
          time_unit_id = $scope.selected_semester.id;
          module_title = $scope.selected_module.module_title;
          module_org_milestones = _.filter($scope.organization.milestones, function(m) {
            return m.time_unit_id === time_unit_id && m.module === module_title;
          });
          module_user_milestones = _.filter($scope.student_with_modules_progress.user_milestones, function(m) {
            return m.time_unit_id === time_unit_id && m.module === module_title;
          });
          $scope.milestones = UsersService.determineEarnedMilestones(module_org_milestones, module_user_milestones);
          $scope.loaded_milestones = true;
          return $scope.new_selected_semester = $scope.selected_semester;
        }
      });
      $scope.$watch('selected_module', function() {
        var module_org_milestones, module_title, module_user_milestones, time_unit_id;
        if ($scope.selected_semester && $scope.selected_module && !$scope.loaded_milestones) {
          time_unit_id = $scope.selected_semester.id;
          module_title = $scope.selected_module.module_title;
          module_org_milestones = _.filter($scope.organization.milestones, function(m) {
            return m.time_unit_id === time_unit_id && m.module === module_title;
          });
          module_user_milestones = _.filter($scope.student_with_modules_progress.user_milestones, function(m) {
            return m.time_unit_id === time_unit_id && m.module === module_title;
          });
          $scope.milestones = UsersService.determineEarnedMilestones(module_org_milestones, module_user_milestones);
          return $scope.loaded_milestones = true;
        }
      }, true);
      $scope.toggleYesNoMilestone = function(milestone) {
        if (milestone.earned) {
          return ProgressService.addUserMilestone($scope.student, $scope.selected_semester.id, milestone.id).success(function(data) {
            return $scope.refreshPoints();
          });
        } else {
          return ProgressService.deleteUserMilestone($scope.student, $scope.selected_semester.id, milestone.id).success(function(data) {
            return $scope.refreshPoints();
          });
        }
      };
      $scope.refreshPoints = function() {
        var module_title, time_unit_id;
        time_unit_id = $scope.selected_semester.id;
        module_title = $scope.selected_module.module_title;
        return ProgressService.getRecalculatedUserProgress($scope.student.id, time_unit_id, module_title).success(function(data) {
          var i, j, len, len1, mod, module_org_milestones, module_user_milestones, ref, ref1, results, selected_mod_progress;
          $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization, time_unit_id);
          $scope.student_with_modules_progress = $scope.organization.students[0];
          module_org_milestones = _.filter($scope.organization.milestones, function(m) {
            return m.time_unit_id === time_unit_id && m.module === module_title;
          });
          module_user_milestones = _.filter($scope.student_with_modules_progress.user_milestones, function(m) {
            return m.time_unit_id === time_unit_id && m.module === module_title;
          });
          $scope.milestones = UsersService.determineEarnedMilestones(module_org_milestones, module_user_milestones);
          selected_mod_progress = null;
          ref = $scope.modules_progress;
          for (i = 0, len = ref.length; i < len; i++) {
            mod = ref[i];
            if (mod.module_title === $scope.selected_module.module_title) {
              selected_mod_progress = mod;
            }
          }
          ref1 = $scope.student_with_modules_progress.modules_progress;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            mod = ref1[j];
            if (mod.module_title === $scope.selected_module.module_title) {
              results.push(selected_mod_progress.points = mod.points);
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      };
      refreshOverallProgress = function() {
        return ProgressService.getOverallProgress($scope.student).success(function(data) {
          return $scope.overall_points = data.overall_progress;
        });
      };
      $scope.selectModule = function(mod) {
        if ($scope.selected_module !== mod) {
          $scope.loaded_milestones = false;
          $scope.loaded_module_milestones = false;
          $scope.loaded_milestones = false;
          return $scope.selected_module = mod;
        }
      };
      $scope.selectSemester = function(sem) {
        $scope.loaded_milestones = false;
        $scope.loaded_module_milestones = false;
        $scope.loaded_milestones = false;
        return ProgressService.getUserProgressForTimeUnit($scope.student.id, sem.id).success(function(data) {
          var i, len, mod, ref, results;
          $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization, sem.id);
          $scope.student_with_modules_progress = $scope.organization.students[0];
          $scope.modules_progress = $scope.student_with_modules_progress.modules_progress;
          modulePointsWithLastUpdated($scope.student_with_modules_progress, $scope.modules_progress);
          $scope.selected_semester = sem;
          ref = $scope.modules_progress;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            mod = ref[i];
            if ($scope.selected_module && mod.module_title === $scope.selected_module.module_title) {
              results.push($scope.selected_module = mod);
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      };
      $scope.getModuleTemplate = function(modTitle) {
        if ($scope.organization.name === "OneGoal") {
          return 'progress/college_prep_progress.html';
        } else {
          if (modTitle) {
            return 'progress/' + modTitle.toLowerCase() + '_progress.html';
          }
        }
      };
      $scope.editable = function(user, semester) {
        return user.role !== $scope.CONSTANTS.USER_ROLES.student || user.time_unit_id === semester.id;
      };
      $scope.nextSemester = function() {
        return ProgressService.nextSemester($scope.student).success(function(data) {
          return $state.reload();
        });
      };
      return $scope.prevSemester = function() {
        return ProgressService.prevSemester($scope.student).success(function(data) {
          return $state.reload();
        });
      };
    }
  ]);

}).call(this);
