angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.profile',
    url:  '/profile/:user_id',
    views: 
      'menuContent':
        templateUrl: 'profile/profile.html',
        controller: 'ProfileController',
        resolve:
          current_user: (SessionService) ->
            SessionService.getCurrentUser()
            
          user_with_contacts: ($q, $stateParams, UsersService) ->
            defer = $q.defer()

            UsersService.getUserWithContacts($stateParams.user_id)
              .success (data) ->
                defer.resolve(data.user_with_contacts)

              .error (data) ->
                defer.reject()

            defer.promise
]
