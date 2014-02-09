'use strict';

angular.module('w3ui')

/**
 * Each page or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.page.create',{
            access: 'authorized',
            url: '/create',
            data: {
                isNavi: false,
                title: 'Seite',
                subtitle: 'Erstellen',
                icon: 'plus',
                parent: 'master.page'
            },
            views :{
                'content': {
                    controller: 'PageCreateCtrl',
                    templateUrl: 'views/page/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PageCreateCtrl', function ($scope, $rootScope, Pages, Authentication, $state, Progressbar, Noty, Ajax) {
        $rootScope.searchBarVisible = false;

        $scope.hasContent = true;


        $scope.Page = {
            title: '',
            lead: '',
            index: ''
        };
        $scope.htmlcontent = '';

        /**
         * Save new page
         */
        $scope.save = function(){
            Progressbar.show(2, 'Speichere neue Sektion');
            Authentication.setHttpHeaders('application/json', 'application/json');

            var data = JSON.stringify({
                title: $scope.Page.title,
                lead: $scope.Page.lead,
                index: $scope.Page.index
            });

            $scope.page = Pages.save(data, function(responseData){
                $scope.updateContent(responseData.id);
            });
        };

        /**
         * Updating the content of the page
         *
         * @param id
         */
        $scope.updateContent = function (id) {
            Progressbar.next('Speichere Text...');
            Ajax.put({
                    url: 'page/' + id + '/content',
                    contentType: 'text/html',
                    data: $scope.htmlcontent
                },
                function () {
                    $state.go('master.page');
                    Progressbar.hide();
                    Noty.success('Neues Element wurde erfolgreich erstellt');
                },
                function () {
                    Noty.error('Fehler beim Speichern der Daten');
                }
            );

        };

    });