angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.user_assignment',
    url:  '/user_assignment/:user_assignment_id',
    views: 
      'menuContent':
        templateUrl: 'assignment/user_assignment.html',
        controller: 'UserAssignmentController',
        resolve:
          current_user: (SessionService) ->
            SessionService.getCurrentUser()

          user_assignment: ($q, $stateParams, AssignmentService, OrganizationService) ->
            defer = $q.defer()
            AssignmentService.collectUserAssignment($stateParams.user_assignment_id)
              .success (data) ->
                organization = OrganizationService.parseOrganizationWithUsers(data.organization)
                defer.resolve(organization.user_assignments[0])
              .error (data) ->
                defer.reject()
            defer.promise
]
