angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'milestone',
	  url:  '/milestone/:milestone_id',
    templateUrl: 'milestone/milestone.html',
    controller: 'MilestoneController',
    resolve:
      current_user: (SessionService) ->
        SessionService.getCurrentUser()

      milestone_id: ($stateParams) ->
        parseInt($stateParams.milestone_id, 10)

      edit: ($stateParams) ->
        $stateParams.edit
]
