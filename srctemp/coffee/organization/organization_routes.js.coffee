angular.module('myApp')
.config ['$stateProvider', 'CONSTANTS', ($stateProvider, CONSTANTS) ->
	$stateProvider.state 'organization',
		url:  '/organization/:id',
		templateUrl: 'organization/organization.html',
		controller: 'OrganizationCtrl',
		resolve:
			current_user: (SessionService) ->
				SessionService.getCurrentUser()
		data:
			authorizedRoles: [CONSTANTS.USER_ROLES.super_admin, CONSTANTS.USER_ROLES.org_admin]

]
