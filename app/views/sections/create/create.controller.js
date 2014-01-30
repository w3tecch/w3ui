'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections.create',{
            access: 'authorized',
            url: '/create',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Erstellen',
                icon: 'plus',
                parent: 'master.sections'
            },
            views :{
                'content': {
                    controller: 'SectionsCreateCtrl',
                    templateUrl: 'views/sections/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsCreateCtrl', function ($scope, $rootScope, $state, Progressbar, Noty, Ajax) {
        $rootScope.searchBarVisible = false;

        $scope.orightml = '';

        $scope.title = '';
        $scope.htmlcontent = $scope.orightml;
        $scope.disabled = false;

        $scope.save = function(){
            console.log($scope.htmlcontent);
            Progressbar.show(3, 'Daten werden überprüft...');



            Progressbar.next('Speichere neues Element..');
            Ajax.post({
                    url: 'section',
                    data: {
                        name: $scope.title
                    }
                },
                function (data, message, status) {
                    console.log('status', status);
                    $scope.addContent(data);

                },
                function (err) {
                    Noty.error('Fehler beim Speichern der Daten');
                }
            );
        };


        $scope.addContent = function(data){
            console.log('addContent', data.id);
            Progressbar.next('Test wird gespeichert');

            Ajax.put({
                    url: 'section/' + data.id + '/content',
                    contentType: 'text/html',
                    data: $scope.htmlcontent
                },
                function (data, message, status) {
                    console.log('Success', data, message, status);
                    $state.go('master.sections');
                    Progressbar.hide();
                    Noty.success('Neues Element wurde erfolgreich erstellt');

                },
                function (err) {
                    Noty.error('Fehler beim Speichern der Daten');
                }
            );
        };


    });