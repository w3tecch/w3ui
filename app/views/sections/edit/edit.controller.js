'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections.edit',{
            access: 'admin',
            url: '/edit/{sectionId}',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Bearbeiten',
                icon: 'pencil',
                parent: 'master.sections'
            },
            views :{
                'content': {
                    controller: 'SectionsEditCtrl',
                    templateUrl: 'views/sections/create/create.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsEditCtrl', function ($scope, $state, $stateParams, Ajax, Noty, Progressbar) {

        console.log($stateParams);
        Progressbar.show(2, 'Lade Sections Daten');

        /**
         * Get Data
         *
         * @param id
         */
        $scope.loadData = function(id){
            Ajax.get({
                    url: 'section/' + id
                },
                function (data, message, status) {
                    $scope.title = data.name;
                    $scope.loadContent(id);

                },
                function (err) {
                    Noty.error('Fehler beim Laden der Daten');
                    Progressbar.hide();

                }
            );
        };
        $scope.loadData($stateParams.sectionId);


        /**
         * Get Content
         *
         * @param id
         */
        $scope.loadContent = function(id){
            Progressbar.next('Lade Content');
            Ajax.get({
                    url: 'section/' + id + '/content',
                    accept: 'text/html'
                },
                function (data, message, status) {
                    $scope.htmlcontent = data;
                    Progressbar.hide();

                },
                function (err) {
                    Noty.error('Fehler beim Laden der Daten');
                    Progressbar.hide();

                }
            );
        };


        /**
         * Saves the changes
         */
        $scope.save = function(){
            console.log($scope.htmlcontent);
            Progressbar.show(3, 'Daten werden überprüft...');


            Progressbar.next('Speichere neues Element..');
            Ajax.post({
                    url: 'section/' + $stateParams.sectionId,
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