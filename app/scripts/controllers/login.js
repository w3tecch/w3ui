'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
    .config(function config($routeProvider) {

        /*var access = routingConfig.accessLevels;

         $stateProvider.state('login', {
         access: access.anon,
         url: '/login',
         views: {
         "main": {
         controller: 'LoginCtrl',
         templateUrl: 'login/login.tpl.html'
         }
         },
         data: {
         pageTitle: 'Login'
         }
         });*/
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('LoginCtrl', function ($scope, $location, Authentication, Noty) {
        $scope.server = configuration.get("APP_ENVIRONMENT");

        $scope.username = 'gery.hirschfeld@w3tec.ch';
        $scope.password = '1234';

        $scope.login = function () {
            console.log('login');

            Authentication.login({
                    username: $scope.username,
                    password: $scope.password,
                    server: $scope.server
                },
                function (res) {
                    Noty.show('Login erfolgreich','S');
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                    $location.path('/main');
                },
                function (err) {
                    Noty.show('Login fehlgeschlagen','E');

                }
            );


        }


    });
