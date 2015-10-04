angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'home.userexpectation',
    url: '/user/:user_id/user_expectation/:user_expectation_id',
    views: 
      'menuContent':
        templateUrl: 'expectation/user_expectation.html',
        controller: 'UserExpectationController',
        resolve:
          current_user: (SessionService) ->
            SessionService.getCurrentUser()

          user_expectation: ($q, $stateParams, ExpectationService) ->
            defer = $q.defer()

            ExpectationService.getUserExpectation($stateParams.user_expectation_id)
              .success (data) ->
                defer.resolve(data.user_expectation)

              .error (data) ->
                defer.reject()

            defer.promise

          student: ($q, $stateParams, UsersService) ->
            defer = $q.defer()

            UsersService.getUser($stateParams.user_id)
              .success (data) ->
                defer.resolve(data.user)

              .error (data) ->
                defer.reject()

            defer.promise
]
