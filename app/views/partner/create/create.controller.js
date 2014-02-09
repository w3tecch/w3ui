'use strict';

angular.module('w3ui')

/**
 * Each partner or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.partner.create',{
            access: 'authorized',
            url: '/create',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Erstellen',
                icon: 'plus',
                parent: 'master.partner'
            },
            views :{
                'content': {
                    controller: 'PartnerCreateCtrl',
                    templateUrl: 'views/partner/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PartnerCreateCtrl', function ($scope, $rootScope, Partners, Authentication, $state, Progressbar, Noty, Ajax) {
        $rootScope.searchBarVisible = false;


        $scope.Partner = {
            title: '',
            lead: '',
            label: '',
            index: ''
        };
        $scope.htmlcontent = '';

        /**
         * Save new partner
         */
        $scope.save = function(){
            Progressbar.show(2, 'Speichere neue Sektion');
            Authentication.setHttpHeaders('application/json', 'application/json');

            var data = JSON.stringify({
                title: $scope.Partner.title,
                lead: $scope.Partner.lead,
                label: $scope.Partner.label,
                index: $scope.Partner.index
            });

            $scope.Partner = Partners.save(data, function(responseData){
                $scope.updateContent(responseData.id);
            });
        };

        /**
         * Updating the content of the partner
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