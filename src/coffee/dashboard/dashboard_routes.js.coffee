angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.dashboarduser',
    url:  '/dashboard/:user_id',
    views: 
      'menuContent':
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
