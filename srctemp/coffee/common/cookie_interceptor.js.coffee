angular.module('myApp')
.service 'CookieInterceptor', ['$rootScope', '$q', ($rootScope, $q) ->

  @request = (request) ->
    request.headers['X-API-EMAIL'] = localStorage.getItem("email")
    request.headers['X-API-TOKEN'] = localStorage.getItem("access_token")
    request
  
  @response = (response) ->
    #console.log(response.headers)
    response

  @
]
