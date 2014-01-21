'use strict';

angular.module('w3uiFrontendApp')

/**
 * And of course we define a controller for our route.
 */
    .controller('HeaderCtrl', function ($scope, Authentication) {
        $scope.username = 'Gery Hirschfeld'; //Authentication.get('user').username;




    });