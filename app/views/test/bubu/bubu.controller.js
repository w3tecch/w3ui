'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.test.bubu',{
            access: 'admin',
            url: 'test/bubu',
            views :{
                'bubu': {
                    controller: 'BubuCtrl',
                    templateUrl: 'views/test/bubu/bubu.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('BubuCtrl', function ($scope, Ajax, Noty, Progressbar) {

    });