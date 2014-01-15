'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config() {

    })

/**
 * And of course we define a controller for our route.
 */
    .controller('NavigationCtrl', function ($scope, Authentication) {
        $scope.username = Authentication.get('user').username;


    });

