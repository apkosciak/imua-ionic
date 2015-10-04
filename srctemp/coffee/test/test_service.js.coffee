angular.module('myApp')
.service 'TestService', ['$http', 'CONSTANTS', ($http, CONSTANTS) ->

  #####################################
  ########### ORGANIZATION ############
  #####################################

  @newOrgTest = (orgId) ->
    organization_id: orgId,
    title:           "",
    score_type:      "",
    description:     ""

  @getOrgTests = (orgId) ->
    $http.get CONSTANTS.API.base_url+"/api/v1/organization/#{orgId}/tests"

  @saveOrgTest = (orgTest) ->
    if orgTest.id
      $http.put CONSTANTS.API.base_url+"/api/v1/org_test/#{orgTest.id}", {orgTest: orgTest}
    else
      $http.post CONSTANTS.API.base_url+"/api/v1/org_test", {orgTest: orgTest}

  @deleteOrgTest = (orgTest) ->
    $http.delete CONSTANTS.API.base_url+"/api/v1/org_test/#{orgTest.id}"

  #################################
  ############# USER ##############
  #################################

  @newUserTest = (userId, timeUnitId) ->
    user_id:      userId,
    org_test_id:  "",
    time_unit_id: timeUnitId,
    date:         "",
    score:        "",
    description:  ""

  @getUserTests = (userId, timeUnitId = null) ->
    $http.get CONSTANTS.API.base_url+"/api/v1/users/#{userId}/tests?time_unit_id=#{timeUnitId}"

  @saveUserTest = (userTest) ->
    if userTest.id
      $http.put CONSTANTS.API.base_url+"/api/v1/user_test/#{userTest.id}", {userTest: userTest}
    else
      $http.post CONSTANTS.API.base_url+"/api/v1/user_test", {userTest: userTest}

  @deleteUserTest = (userTest) ->
    $http.delete CONSTANTS.API.base_url+"/api/v1/user_test/#{userTest.id}"

  @
]
