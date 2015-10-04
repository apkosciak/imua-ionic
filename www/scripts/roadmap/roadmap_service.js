(function() {
  angular.module('myApp').service('RoadmapService', [
    '$http', '$q', 'CONSTANTS', function($http, $q, CONSTANTS) {
      this.newRoadmap = function(orgId, name) {
        return {
          name: name,
          organization_id: orgId
        };
      };
      this.getRoadmap = function(orgId) {
        var defer;
        defer = $q.defer();
        $http.get(CONSTANTS.API.base_url + '/api/v1/organization/' + orgId + '/roadmap').then(function(resp, status) {
          if (resp.data.success) {
            return defer.resolve(resp.data);
          } else {
            return defer.reject(resp.data);
          }
        });
        return defer.promise;
      };
      this.createRoadmap = function(orgId, name) {
        var defer, roadmap;
        roadmap = this.newRoadmap(orgId, name);
        defer = $q.defer();
        $http.post(CONSTANTS.API.base_url + '/api/v1/roadmap', {
          roadmap: roadmap
        }).then(function(resp, status) {
          if (resp.data.success) {
            return defer.resolve(resp.data);
          } else {
            return defer.reject(resp.data);
          }
        });
        return defer.promise;
      };
      this.updateRoadmapName = function(roadmap, newname) {
        roadmap.name = newname;
        return $http.put(CONSTANTS.API.base_url + '/api/v1/roadmap/' + roadmap.id, {
          roadmap: roadmap
        });
      };
      this.getEnabledModules = function(orgId) {
        return $http.get(CONSTANTS.API.base_url + '/api/v1/organization/' + orgId + '/modules');
      };
      this.addTimeUnit = function(orgId, rId, tu_obj) {
        var defer, time_unit;
        defer = $q.defer();
        time_unit = {
          organization_id: orgId,
          roadmap_id: rId,
          name: tu_obj.name
        };
        $http.post(CONSTANTS.API.base_url + '/api/v1/time_unit', {
          time_unit: time_unit
        }).then(function(resp, status) {
          if (resp.data.success) {
            return defer.resolve(resp.data);
          } else {
            return defer.reject(resp.data);
          }
        });
        return defer.promise;
      };
      this.updateTimeUnit = function(time_unit) {
        var defer;
        defer = $q.defer();
        $http.put(CONSTANTS.API.base_url + '/api/v1/time_unit/' + time_unit.id, {
          time_unit: time_unit
        }).then(function(resp, status) {
          if (resp.data.success) {
            return defer.resolve(resp.data);
          } else {
            return defer.reject(resp.data);
          }
        });
        return defer.promise;
      };
      this.deleteTimeUnit = function(time_unit_id) {
        var defer;
        defer = $q.defer();
        $http["delete"](CONSTANTS.API.base_url + '/api/v1/time_unit/' + time_unit_id).then(function(resp, status) {
          if (resp.data.success) {
            return defer.resolve(resp.data);
          } else {
            return defer.reject(resp.data);
          }
        });
        return defer.promise;
      };
      this.addMilestone = function(milestone) {
        return $http.post(CONSTANTS.API.base_url + '/api/v1/milestone', {
          milestone: milestone
        });
      };
      this.updateMilestone = function(milestone) {
        return $http.put(CONSTANTS.API.base_url + '/api/v1/milestone/' + milestone.id, {
          milestone: milestone
        });
      };
      this.deleteMilestone = function(milestoneId) {
        return $http["delete"](CONSTANTS.API.base_url + '/api/v1/milestone/' + milestoneId);
      };
      this.validateMilestone = function(timeUnit, milestone) {
        var errors, i, len, m, ref;
        errors = [];
        ref = timeUnit.milestones;
        for (i = 0, len = ref.length; i < len; i++) {
          m = ref[i];
          if (m.id !== milestone.id && m.module === milestone.module && m.submodule === milestone.submodule && m.value === milestone.value) {
            errors.push("A milestone of the same type and value already exists in " + timeUnit.name);
            break;
          }
        }
        return errors;
      };
      return this;
    }
  ]);

}).call(this);
