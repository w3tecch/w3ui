'use strict';

angular.module('w3ui')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.section',{
            access: 'authorized',
            url: 'section',
            data: {
                isNavi: true,
                title: 'Sektionen',
                icon: 'leaf',
                subtitle: ''
            },
            views :{
                'body': {
                    controller: 'SectionCtrl',
                    templateUrl: 'views/section/section.view.html'
                },
                'content@master.section': {
                    controller: 'SectionListCtrl',
                    templateUrl: 'views/section/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionCtrl', function ($scope, $rootScope) {
        $scope.subtitle = '';
        $rootScope.$on('$stateChangeStart', function(event, next) {
            $scope.subtitle = next.data.subtitle;
        });

    });
