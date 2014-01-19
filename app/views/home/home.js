'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {

        $stateProvider.state('master.home',{
            access: 'admin',
            url: 'home',
            views :{
                'body': {
                    controller: 'HomeCtrl',
                    templateUrl: 'views/home/home.html'
                }
            }
        });

    })

/**
 * And of course we define a controller for our route.
 */
    .controller('HomeCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
