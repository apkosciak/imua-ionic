angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'assignment',
    url: '/assignment/:assignment_id',
    templateUrl: 'assignment/assignment.html',
    controller: 'AssignmentController',
    resolve:
      current_user: (SessionService) ->
        SessionService.getCurrentUser()

      assignment: ($q, $stateParams, AssignmentService, OrganizationService) ->
        defer = $q.defer()
        if parseInt($stateParams.assignment_id, 10) == -1
          defer.resolve(null)
        else
          AssignmentService.getAssignmentCollection($stateParams.assignment_id)
            .success (data) ->
              organization = OrganizationService.parseOrganizationWithUsers(data.organization)
              defer.resolve(organization.assignments[0])
            .error (data) ->
              defer.reject()
        defer.promise

      edit: ($stateParams) ->
        $stateParams.edit
]
