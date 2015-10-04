angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'dashboard',
	  url:  '/dashboard/:user_id',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController',
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
