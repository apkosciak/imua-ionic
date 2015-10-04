angular.module('myApp')
.config ['$stateProvider', ($stateProvider) ->
	$stateProvider.state 'home.expectation',
		url:  '/expectation/:expectation_id',
		views: 
			'menuContent':
				templateUrl: 'expectation/expectation.html',
				controller: 'ExpectationController',
				resolve:
					current_user: (SessionService) ->
						SessionService.getCurrentUser()

					expectation_id: ($stateParams) ->
						parseInt($stateParams.expectation_id, 10)
]
