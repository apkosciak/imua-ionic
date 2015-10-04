angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'mentor',
	  url:  '/mentor/:id',
    templateUrl: 'mentor/mentor.html',
    controller: 'MentorController',
    resolve:
      current_user: (SessionService) ->
        SessionService.getCurrentUser();

      user: ($q, $stateParams, UsersService) ->
        defer = $q.defer()

        UsersService.getUser($stateParams.id)
          .success (data) ->
            defer.resolve(data.user)

          .error (data) ->
            defer.reject()

        defer.promise
]
