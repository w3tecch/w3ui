'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sectionsCreate',{
            access: 'admin',
            url: '/sections/create',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Erstellen',
                icon: 'leaf'
            },
            views :{
                '': {
                    controller: 'SectionsCreateCtrl',
                    templateUrl: 'views/sections/create/create.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsCreateCtrl', function ($scope, Ajax, Noty, Progressbar) {



    });