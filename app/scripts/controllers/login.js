'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        //access: access.anon,

        $stateProvider.state('login', {
            url: '/login',
            views: {
                'main': {
                    controller: 'LoginCtrl',
                    templateUrl: 'views/login.html'
                }
            }
        });

    })

/**
 * And of course we define a controller for our route.
 */
    .controller('LoginCtrl', function ($scope, $location, Authentication, Noty) {
        $scope.server = configuration.get('APP_ENVIRONMENT');

        $scope.username = 'gery.hirschfeld@w3tec.ch';
        $scope.password = '1234';

        $scope.login = function () {
            console.log('login');

            Authentication.login({
                    username: $scope.username,
                    password: $scope.password,
                    server: $scope.server
                },
                function (user, message, status) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                    $location.path('/main');

                    Noty.show( message, status );
                },
                function (err) {


                }
            );


        };


    });
