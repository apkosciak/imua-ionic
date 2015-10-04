angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.milestone',
    url:  '/milestone/:milestone_id',
    views: 
      'menuContent':
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
