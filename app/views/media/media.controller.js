'use strict';

angular.module('w3ui')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.media',{
            access: 'authorized',
            url: 'media',
            data: {
                isNavi: true,
                title: 'Medien',
                icon: 'picture',
                subtitle: ''
            },
            views :{
                'body': {
                    controller: 'MediaCtrl',
                    templateUrl: 'views/media/media.view.html'
                },
                'content@master.media': {
                    controller: 'MediaListCtrl',
                    templateUrl: 'views/media/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('MediaCtrl', function ($scope, $rootScope) {
        $scope.subtitle = '';
        $rootScope.$on('$stateChangeStart', function(event, next) {
            $scope.subtitle = next.data.subtitle;
        });

    });
