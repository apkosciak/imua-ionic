angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.assignments',
    url: '/assignments/:user_id',
    views: 
      'menuContent':
        templateUrl: 'assignment/assignments.html',
        controller: 'AssignmentsController',
        reloadOnSearch: false,
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
