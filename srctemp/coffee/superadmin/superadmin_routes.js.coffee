angular.module('myApp')
.config ['$stateProvider', 'CONSTANTS', ($stateProvider, CONSTANTS) ->
	$stateProvider.state 'superadmin.organizations',
		url: '/sa/organizations',
		templateUrl: 'superadmin/organizations.html'
		controller: 'SuperAdminOrganizationsCtrl'
		data:
			authorizedRoles: [CONSTANTS.USER_ROLES.super_admin]
]
