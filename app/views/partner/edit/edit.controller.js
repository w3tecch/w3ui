'use strict';

angular.module('w3ui')

/**
 * Each partner or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.partner.edit', {
            access: 'authorized',
            url: '/edit/{partnerId}',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Bearbeiten',
                icon: 'pencil',
                parent: 'master.partner'
            },
            views: {
                'content': {
                    controller: 'PartnerEditCtrl',
                    templateUrl: 'views/partner/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PartnerEditCtrl', function ($scope, $rootScope, $state, $stateParams, Partners, Authentication, Ajax, Noty, Progressbar) {
        $rootScope.searchBarVisible = false;

        console.log($stateParams);
        Progressbar.show(2, 'Lade Partner Daten');


        /**
         * Get Data
         *
         * @param id
         */
        $scope.getData = function (id) {
            Authentication.setHttpHeaders();
            $scope.Partner = Partners.get({Id: id}, function () {
                $scope.getContent(id);

                console.log($scope.Partner);
            });
        };

        /**
         * Get HTML content
         *
         * @param id
         */
        $scope.getContent = function (id) {
            Progressbar.next('Lade Content');
            Authentication.setHttpHeaders('text/html', 'text/html');
            $scope.Content = Partners.getContent({Id: id}, function (response) {
                $scope.htmlcontent = response.html;
                Progressbar.hide();
            });
        };

        /**
         * Init Process
         */
        $scope.getData($stateParams.partnerId);

        /**
         * Saves the changes
         */
        $scope.save = function () {
            //Validation
            Progressbar.show(3, 'Daten werden überprüft...');

            //Updating
            Progressbar.next('Speichere neues Element..');
            Authentication.setHttpHeaders();
            $scope.Partner.$save({Id: $stateParams.partnerId}, function () {
                $scope.updateContent($stateParams.partnerId);
            });

        };

        /**
         * Updating the content
         *
         * @param id
         */
        $scope.updateContent = function (id) {
            Progressbar.next('Speichere Text...');
            Ajax.put({
                    url: 'partner/' + id + '/content',
                    contentType: 'text/html',
                    data: $scope.htmlcontent
                },
                function () {
                    $state.go('master.partner');
                    Progressbar.hide();
                    Noty.success('Neues Element wurde erfolgreich erstellt');
                },
                function () {
                    Noty.error('Fehler beim Speichern der Daten');
                }
            );

        };




    });