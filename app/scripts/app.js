'use strict';

angular.module('w3uiFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])

/**
 * Config Application
  */
.config(function ($routeProvider) {


    $routeProvider
        .when('/', {
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });


})

/**
 * Run Application
  */
.run(['$rootScope', '$http', '$location', 'Authentication',
    function ($rootScope, $http, $location, Authentication) {

    $rootScope.$on('$stateChangeStart', function(event, next, current) {
        console.log('$stateChangeStart',event, next, current);
    });



}]);
