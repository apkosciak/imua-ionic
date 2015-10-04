angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'progress',
	  url:  '/progress/:user_id',
    templateUrl: 'progress/progress.html',
    controller: 'ProgressController',
    resolve:
      current_user: (SessionService) ->
        SessionService.getCurrentUser()

      student: ($q, $stateParams, UsersService) ->
        defer = $q.defer()

        UsersService.getUser($stateParams.user_id)
          .success (data) ->
            defer.resolve(data.user)

          .error (data) ->
            defer.reject()

        defer.promise
]
