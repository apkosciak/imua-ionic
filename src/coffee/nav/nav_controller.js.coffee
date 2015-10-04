angular.module('myApp')
.controller 'NavController', ['$scope', 'Auth','SessionService',
	($scope, Auth, SessionService) ->
		$scope.current_user = SessionService._currentUser;
		$scope.logout = () ->
			Auth.logout()
]
