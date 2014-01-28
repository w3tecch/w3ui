'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections.edit',{
            access: 'admin',
            url: '/edit/{sectionId}',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Bearbeiten',
                icon: 'pencil',
                parent: 'master.sections'
            },
            views :{
                'content': {
                    controller: 'SectionsEditCtrl',
                    templateUrl: 'views/sections/create/create.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsEditCtrl', function ($scope, $stateParams, Ajax, Noty, Progressbar) {

        console.log($stateParams);


    });