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

    $urlRouterProvider.otherwise("/main");


})

/**
 * Run Application
  */
.run(['$rootScope', '$state', 'Authentication',
    function ($rootScope,  $state, Authentication) {

        $rootScope.$on('$stateChangeStart', function(event, next) {

            //Check if state is open for public
            if( next.access !== 'public' ){

                //Check if somebody is logged in
                if(!Authentication.isLoggedIn()){
                    event.preventDefault();
                    $state.go('login');

                }else{
                    var user = Authentication.get('user');
                    if( user.role !== next.access ){
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            }

        });

}]);
