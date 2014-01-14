'use strict';

angular.module('w3uiFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router'
])

/**
 * Config Application
  */
.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    /*
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
    */



})

/**
 * Run Application
  */
.run(['$rootScope', '$location', 'Authentication',
    function ($rootScope,  $location, Authentication) {

        //$location.path('/login');

        $rootScope.$on('$stateChangeStart', function(event, next, current) {
            //console.log('$stateChangeStart',event, next, current);
        });



}]);
