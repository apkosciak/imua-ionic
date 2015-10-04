angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.expectations',
    url:  '/expectations/:user_id',
    views: 
      'menuContent':
        templateUrl: 'expectation/student_expectations.html',
        controller: 'StudentExpectationController',
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
