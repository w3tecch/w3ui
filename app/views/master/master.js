'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {

        /*$stateProvider.state('master', {
            access: 'admin',
            url: '/',
            views: {
                'body': {
                    controller: 'RestCtrl',
                    templateUrl: 'views/rest/rest.html'
                },
                'navigation': {
                    controller: 'NavigationCtrl',
                    templateUrl: 'views/navigation/navigation.html'
                }
            }
        });*/

    })

/**
 * And of course we define a controller for our route.
 */
    .controller('MasterCtrl', function ($scope) {

    });
