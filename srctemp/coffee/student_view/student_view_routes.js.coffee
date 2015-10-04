angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'studentview',
	  url:  '/student_view/:user_id',
    templateUrl: 'student_view/student_view.html',
    controller: 'StudentViewController',
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
