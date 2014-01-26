'use strict';

angular.module('w3uiFrontendApp')

/**
 * And of course we define a controller for our route.
 */
    .controller('BreadcrumbCtrl', function ($scope, $rootScope) {

        /**
         * Defines the startpage
         *
         * @type {string}
         */
        $scope.breadcrumbTitle = 'Home';
        $scope.breadcrumbIcon = 'imac';
        $scope.breadcrumbSubTitle = '';

        /**
         * Updates the breadcrumb when state is going to change
         */
        $rootScope.$on('$stateChangeStart', function(event, next) {
            $scope.breadcrumbTitle = next.data.title;
            $scope.breadcrumbIcon = next.data.icon;
            $scope.breadcrumbSubTitle = '';
        });


    });