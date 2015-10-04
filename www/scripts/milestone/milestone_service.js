(function() {
  angular.module('myApp').service('MilestoneService', [
    '$http', 'CONSTANTS', function($http, CONSTANTS) {
      var self;
      self = this;
      this.newMilestone = function(_organization_id, _time_unit_id, _module, _submodule, _title, _description, _icon) {
        return {
          organization_id: _organization_id,
          time_unit_id: _time_unit_id,
          module: _module,
          submodule: _submodule,
          title: _title,
          description: _description,
          icon: _icon
        };
      };
      this.getMilestoneStatus = function(milestoneId) {
        return $http.get(CONSTANTS.API.base_url + ("/api/v1/milestone/" + milestoneId + "/status"));
      };
      return this;
    }
  ]);

}).call(this);
