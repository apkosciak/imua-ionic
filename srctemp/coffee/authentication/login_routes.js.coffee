angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
  $stateProvider.state 'login',
	url:  '/login',
    templateUrl: 'authentication/login.html',
    controller: 'LoginController'
]
