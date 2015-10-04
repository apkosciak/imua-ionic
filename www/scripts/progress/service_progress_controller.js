(function() {
  angular.module('myApp').controller('ServiceProgressController', [
    '$scope', 'UserServiceOrganizationService', 'ProgressService', function($scope, UserServiceOrganizationService, ProgressService) {
      $scope.user_service_organizations = [];
      $scope.semester_service_hours = 0;
      $scope.selected_org = null;
      $scope.serviceEditor = false;
      $scope.loaded_data = false;
      $scope.formErrors = ['**Please fix the errors above**'];
      $scope.resetNewServiceEntry = function() {
        if ($scope.selected_semester) {
          $scope.new_service_organization = UserServiceOrganizationService.newServiceOrganization($scope.student);
          $scope.new_service_organization.hours.push(UserServiceOrganizationService.newServiceHour($scope.student, $scope.selected_semester.id, null));
          return $scope.new_service_organization.editing = false;
        }
      };
      $scope.editNewServiceEntry = function() {
        return $scope.new_service_organization.editing = true;
      };
      $scope.resetNewServiceEntry();
      $scope.$watch('user_service_organizations', function() {
        var hour, i, j, len, len1, organization, ref, ref1;
        $scope.loaded_semester_service_hours = false;
        $scope.semester_service_hours = 0;
        ref = $scope.user_service_organizations;
        for (i = 0, len = ref.length; i < len; i++) {
          organization = ref[i];
          if (organization.hours) {
            ref1 = organization.hours;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              hour = ref1[j];
              if (hour.hours) {
                $scope.semester_service_hours += parseFloat(hour.hours);
              }
            }
          }
        }
        return $scope.loaded_semester_service_hours = true;
      }, true);
      $scope.$watch('selected_semester', function() {
        $scope.serviceEditor = false;
        if ($scope.selected_semester) {
          $scope.resetNewServiceEntry();
          $scope.loaded_data = false;
          return UserServiceOrganizationService.all($scope.student.id, $scope.selected_semester.id).success(function(data) {
            var i, j, len, len1, ref, ref1, user_service_hour, user_service_organization;
            $scope.org_current_organization_list = data.org_service_organization_titles;
            $scope.user_service_organizations = data.user_service_organizations;
            ref = $scope.user_service_organizations;
            for (i = 0, len = ref.length; i < len; i++) {
              user_service_organization = ref[i];
              user_service_organization.hours = [];
              user_service_organization.non_current_hours = [];
              ref1 = data.user_service_hours;
              for (j = 0, len1 = ref1.length; j < len1; j++) {
                user_service_hour = ref1[j];
                if (user_service_organization.id === user_service_hour.user_service_organization_id) {
                  if (user_service_hour.time_unit_id === $scope.selected_semester.id) {
                    user_service_organization.hours.push(user_service_hour);
                  } else {
                    user_service_organization.non_current_hours.push(user_service_hour);
                  }
                }
              }
            }
            $scope.loaded_data = true;
            return $scope.$emit('loaded_module_milestones');
          });
        }
      });
      $scope.editorClick = function() {
        return $scope.serviceEditor = !$scope.serviceEditor;
      };
      $scope.getServiceOrganizationTotalHours = function(service_organization) {
        var total_hours;
        total_hours = 0;
        _.each(service_organization.hours, function(h) {
          if (h.hours !== null) {
            return total_hours += parseFloat(h.hours);
          }
        });
        return total_hours;
      };
      $scope.serviceOrganizationIsSavable = function(service_organization) {
        return service_organization.name;
      };
      $scope.serviceHourIsSavable = function(service_hour) {
        return service_hour.description && service_hour.hours && service_hour.date;
      };
      $scope.newServiceEntryIsSavable = function() {
        return $scope.serviceOrganizationIsSavable($scope.new_service_organization) && $scope.serviceHourIsSavable($scope.new_service_organization.hours[0]);
      };
      $scope.applicableServiceOrganizations = function() {
        return _.filter($scope.user_service_organizations, function(o) {
          return o.hours.length > 0;
        });
      };
      $scope.saveNewServiceEntry = function() {
        var existing_organization;
        if (!$scope.newServiceEntryIsSavable()) {
          return;
        }
        if (_.contains(_.pluck($scope.user_service_organizations, 'name'), $scope.new_service_organization.name)) {
          existing_organization = _.find($scope.user_service_organizations, function(o) {
            return o.name === $scope.new_service_organization.name;
          });
          $scope.new_service_organization.hours[0].user_service_organization_id = existing_organization.id;
          return UserServiceOrganizationService.saveServiceHour($scope.new_service_organization.hours[0]).success(function(data) {
            existing_organization.hours.push(data.user_service_hour);
            $scope.resetNewServiceEntry();
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Service');
            return $scope.addSuccessMessage("Successfully added new hours to " + existing_organization.name);
          });
        } else {
          return UserServiceOrganizationService.saveNewServiceOrganization($scope.new_service_organization).success(function(data) {
            data.user_service_organization.hours = [];
            data.user_service_organization.non_current_hours = [];
            data.user_service_organization.hours.push(data.user_service_hour);
            $scope.user_service_organizations.push(data.user_service_organization);
            $scope.org_current_organization_list.push(data.user_service_organization.name);
            $scope.resetNewServiceEntry();
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Service');
            return $scope.addSuccessMessage("Successfully added " + data.user_service_organization.name);
          });
        }
      };
      $scope.editOrganization = function(service_organization) {
        service_organization.editing = true;
        service_organization.new_name = service_organization.name;
        return false;
      };
      $scope.cancelEditOrganization = function(service_organization) {
        service_organization.editing = false;
        return false;
      };
      $scope.saveOrganization = function(service_organization) {
        var new_service_organization;
        if (!$scope.serviceOrganizationIsSavable(service_organization)) {
          return;
        }
        new_service_organization = UserServiceOrganizationService.newServiceOrganization($scope.student);
        new_service_organization.id = service_organization.id;
        new_service_organization.name = service_organization.new_name;
        UserServiceOrganizationService.saveServiceOrganization(new_service_organization).success(function(data) {
          service_organization.id = data.user_service_organization.id;
          service_organization.name = data.user_service_organization.name;
          service_organization.editing = false;
          if (!_.contains($scope.org_current_organization_list, service_organization.name)) {
            $scope.org_current_organization_list.push(service_organization.name);
          }
          $scope.refreshPoints();
          $scope.$emit('just_updated', 'Service');
          return $scope.addSuccessMessage("Successfully updated " + service_organization.name);
        });
        return false;
      };
      $scope.deleteOrganization = function(service_organization) {
        if (window.confirm("Are you sure you want to delete this organization?")) {
          UserServiceOrganizationService.deleteServiceOrganization(service_organization, $scope.selected_semester.id).success(function(data) {
            service_organization.hours = [];
            if (service_organization.non_current_hours.length === 0) {
              $scope.user_service_organizations.splice(_.indexOf($scope.user_service_organizations, service_organization), 1);
            }
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Service');
            return $scope.addSuccessMessage("Successfully deleted organization and all associated hours");
          });
        }
        return false;
      };
      $scope.addHour = function(service_organization) {
        var service_hour;
        service_hour = UserServiceOrganizationService.newServiceHour($scope.student, $scope.selected_semester.id, service_organization.id);
        service_hour.editing = true;
        service_hour.remove_delete = true;
        return service_organization.hours.push(service_hour);
      };
      $scope.saveHour = function(service_hour) {
        var new_service_hour;
        new_service_hour = UserServiceOrganizationService.newServiceHour($scope.student, $scope.selected_semester.id, service_hour.user_service_organization_id);
        new_service_hour.id = service_hour.id;
        new_service_hour.description = service_hour.new_description;
        new_service_hour.hours = service_hour.new_hours;
        new_service_hour.date = service_hour.new_date;
        if (!$scope.serviceHourIsSavable(new_service_hour)) {
          return;
        }
        return UserServiceOrganizationService.saveServiceHour(new_service_hour).success(function(data) {
          service_hour.id = data.user_service_hour.id;
          service_hour.description = data.user_service_hour.description;
          service_hour.hours = data.user_service_hour.hours;
          service_hour.date = data.user_service_hour.date;
          service_hour.editing = false;
          $scope.refreshPoints();
          $scope.$emit('just_updated', 'Service');
          return $scope.addSuccessMessage("Successfully added/updated service hour entry");
        });
      };
      $scope.editHour = function(service_hour) {
        service_hour.editing = true;
        service_hour.new_description = service_hour.description;
        service_hour.new_hours = service_hour.hours;
        return service_hour.new_date = service_hour.date;
      };
      $scope.cancelEditHour = function(service_organization, service_hour) {
        if (!service_hour.id) {
          return service_organization.hours.splice(_.indexOf(service_organization.hours, service_hour), 1);
        } else {
          service_hour.editing = false;
          return service_hour.remove_delete = false;
        }
      };
      $scope.deleteHour = function(service_organization, service_hour) {
        if (window.confirm("Are you sure you want to delete this hour?")) {
          return UserServiceOrganizationService.deleteServiceHour(service_hour).success(function(data) {
            service_organization.hours.splice(_.indexOf(service_organization.hours, service_hour), 1);
            if (service_organization.hours.length === 0 && service_organization.non_current_hours.length === 0) {
              $scope.user_service_organizations.splice(_.indexOf($scope.user_service_organizations, service_organization), 1);
            }
            $scope.refreshPoints();
            $scope.$emit('just_updated', 'Service');
            return $scope.addSuccessMessage("Successfully deleted service hour entry");
          });
        }
      };
      $scope.editingServices = function() {
        return _.some($scope.user_service_organizations, function(o) {
          return o.editing === true;
        }) || $scope.new_service_organization.editing === true;
      };
      $scope.editingServiceOrganization = function(service_organization) {
        return _.some(service_organization.hours, function(h) {
          return h.editing === true;
        }) || service_organization.editing === true;
      };
      return $scope.editing = function() {
        var all_orgs, editing_org, i, len, org;
        all_orgs = $scope.applicableServiceOrganizations();
        editing_org = false;
        for (i = 0, len = all_orgs.length; i < len; i++) {
          org = all_orgs[i];
          editing_org = $scope.editingServiceOrganization(org);
          if (editing_org) {
            break;
          }
        }
        return $scope.new_service_organization.editing || editing_org;
      };
    }
  ]);

}).call(this);
