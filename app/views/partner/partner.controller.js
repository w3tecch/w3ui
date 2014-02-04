'use strict';

angular.module('w3ui')

/**
 * Each partner or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.partner',{
            access: 'authorized',
            url: 'partner',
            data: {
                isNavi: true,
                title: 'Partner',
                icon: 'user',
                subtitle: ''
            },
            views :{
                'body': {
                    controller: 'PartnerCtrl',
                    templateUrl: 'views/partner/partner.view.html'
                },
                'content@master.partner': {
                    controller: 'PartnerListCtrl',
                    templateUrl: 'views/partner/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PartnerCtrl', function ($scope, $rootScope) {
        $scope.subtitle = '';
        $rootScope.$on('$stateChangeStart', function(event, next) {
            $scope.subtitle = next.data.subtitle;
        });

    });
