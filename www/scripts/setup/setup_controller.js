(function() {
  angular.module('myApp').controller('SetupController', [
    '$scope', '$modal', '$stateParams', '$location', 'current_user', 'CONSTANTS', 'RoadmapService', 'OrganizationService', 'UsersService', function($scope, $modal, $stateParams, $location, current_user, CONSTANTS, RoadmapService, OrganizationService, UsersService) {
      var orgId;
      $scope.current_user = current_user;
      $scope.selected_widget = null;
      $scope.selected_year = null;
      $scope.selected_semester = null;
      $scope.loading = true;
      $scope.is_admin = current_user.role <= CONSTANTS.USER_ROLES.org_admin;
      $scope.view_obj = {
        setup_widget_title: $scope.is_admin ? "Setup" : "Organization"
      };
      $scope.sub_nav_items = [
        {
          group: "Setup",
          title: "Organization Admins",
          widget: "admins"
        }, {
          for_mentors: true,
          group: "Setup",
          title: "Student Expectations",
          widget: "expectations"
        }, {
          group: "Setup",
          title: "Tests",
          widget: "tests"
        }, {
          for_mentors: true,
          group: "Roadmap",
          title: "Roadmap",
          widget: "roadmap"
        }
      ];
      $scope.nav_items_for_setup = function() {
        return $scope._.where($scope.sub_nav_items, {
          group: 'Setup'
        });
      };
      orgId = $stateParams.id;
      RoadmapService.getEnabledModules(orgId).success(function(data) {
        return $scope.enabled_modules = data.enabled_modules;
      });
      OrganizationService.getOrganizationWithRoadmap(orgId).then(function(data) {
        var selected_nav, selected_sem, selected_year;
        $scope.organization = data.data.organization;
        $scope.roadmap = data.data.roadmap;
        $scope.roadmap.years = [
          {
            name: "Year 1",
            id: 1,
            semesters: [
              {
                name: "Semester 1",
                id: 1,
                semester: $scope.roadmap.time_units[0]
              }, {
                name: "Semester 2",
                id: 2,
                semester: $scope.roadmap.time_units[1]
              }
            ]
          }, {
            name: "Year 2",
            id: 2,
            semesters: [
              {
                name: "Semester 1",
                id: 1,
                semester: $scope.roadmap.time_units[2]
              }, {
                name: "Semester 2",
                id: 2,
                semester: $scope.roadmap.time_units[3]
              }
            ]
          }, {
            name: "Year 3",
            id: 3,
            semesters: [
              {
                name: "Semester 1",
                id: 1,
                semester: $scope.roadmap.time_units[4]
              }, {
                name: "Semester 2",
                id: 2,
                semester: $scope.roadmap.time_units[5]
              }
            ]
          }, {
            name: "Year 4",
            id: 4,
            semesters: [
              {
                name: "Semester 1",
                id: 1,
                semester: $scope.roadmap.time_units[6]
              }, {
                name: "Semester 2",
                id: 2,
                semester: $scope.roadmap.time_units[7]
              }
            ]
          }
        ];
        selected_nav = $location.search().selected_nav;
        selected_year = $location.search().year;
        selected_sem = $location.search().semester;
        if (selected_nav) {
          $scope.selectWidget(selected_nav, {
            year: selected_year,
            semester: selected_sem
          });
        } else {
          if (current_user.is_org_admin) {
            $scope.selectWidget("admins");
          } else {
            $scope.selectWidget("expectations");
          }
        }
        return $scope.loading = false;
      }, function(data) {});
      $scope.selectWidget = function(widget, opts) {
        if (opts == null) {
          opts = {};
        }
        $scope.selected_widget = widget;
        if (widget === "roadmap") {
          $scope.selected_year = opts.year;
          $scope.selected_semester = opts.semester;
        } else {
          $scope.selected_year = null;
          $scope.selected_semester = null;
        }
        return $location.search({
          selected_nav: widget,
          year: opts.year,
          semester: opts.semester
        });
      };
      $scope.getWidgetTemplate = function(widgetTitle) {
        if (widgetTitle) {
          return 'setup/widgets/orgsetup_' + widgetTitle.toLowerCase() + '.html';
        }
      };
      return $scope.addOrgAdmin = function() {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: 'organization/add_user_modal.html',
          controller: 'AddUserModalController',
          backdrop: 'static',
          size: 'sm',
          resolve: {
            current_user: function() {
              return $scope.current_user;
            },
            organization: function() {
              return $scope.organization;
            },
            new_user: function() {
              return UsersService.newOrgAdmin($scope.organization.id);
            }
          }
        });
        return modalInstance.result.then(function(user) {
          return $scope.organization.orgAdmins.push(user);
        });
      };
    }
  ]);

}).call(this);
