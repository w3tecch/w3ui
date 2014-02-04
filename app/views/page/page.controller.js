'use strict';

angular.module('w3ui')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.page',{
            access: 'authorized',
            url: 'page',
            data: {
                isNavi: true,
                title: 'Seiten',
                subtitle: '',
                icon: 'file'
            },
            views :{
                '': {
                    controller: 'PagerCtrl',
                    templateUrl: 'views/page/page.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PagerCtrl', function ($scope, Ajax, Noty, Progressbar) {

    });