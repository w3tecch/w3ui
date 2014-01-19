'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.<%- state %>',{
            access: 'admin',
            url: '<%- url %>',
            views :{
                '<%- uiview %>': {
                    controller: '<%- title %>Ctrl',
                    templateUrl: 'views/<%- url %>/<%- name %>.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('<%- title %>Ctrl', function ($scope, Ajax, Noty, Progressbar) {

    });