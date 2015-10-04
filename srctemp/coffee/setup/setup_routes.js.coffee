angular.module('myApp')
.config ['$stateProvider', 'CONSTANTS', ($stateProvider, CONSTANTS) ->
    $stateProvider.state 'setup',
	    url:  '/setup/:id',
      templateUrl: 'setup/setup.html',
      controller: 'SetupController',
      reloadOnSearch: false,
      resolve:
        current_user: (SessionService) ->
          SessionService.getCurrentUser()
      data:
        authorizedRoles: [CONSTANTS.USER_ROLES.super_admin, CONSTANTS.USER_ROLES.org_admin, CONSTANTS.USER_ROLES.mentor]
]
