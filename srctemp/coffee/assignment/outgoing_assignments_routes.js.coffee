angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'old_assignments',
	  url:  '/old_assignments/:user_id',
    templateUrl: 'assignment/outgoing_assignments.html',
    controller: 'OutgoingAssignmentsController',
    resolve:
      current_user: (SessionService) ->
        SessionService.getCurrentUser()

      user: ($q, $stateParams, UsersService) ->
        defer = $q.defer()

        UsersService.getUser($stateParams.user_id)
          .success (data) ->
            defer.resolve(data.user)

          .error (data) ->
            defer.reject()

        defer.promise
]
