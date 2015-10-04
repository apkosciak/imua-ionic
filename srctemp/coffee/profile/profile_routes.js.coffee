angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'profile',
	  url:  '/profile/:user_id',
    templateUrl: 'profile/profile.html',
    controller: 'ProfileController',
    resolve:
      user_with_contacts: ($q, $stateParams, UsersService) ->
        defer = $q.defer()

        UsersService.getUserWithContacts($stateParams.user_id)
          .success (data) ->
            defer.resolve(data.user_with_contacts)

          .error (data) ->
            defer.reject()

        defer.promise
]
