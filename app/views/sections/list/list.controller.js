'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.sections.list',{
            access: 'admin',
            url: '',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Alle',
                icon: 'leaf',
                parent: 'master.sections'
            },
            views :{
                'content': {
                    controller: 'SectionsListCtrl',
                    templateUrl: 'views/sections/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionsListCtrl', function ($scope, $rootScope, $state, $location, Ajax, Noty, Progressbar) {
        console.log('SectionsListCtrl'),
        Progressbar.show(1, 'Lade Sections Daten');
        $scope.modalID = 'modalDelete';

        /**
         * Filter watch
         */
        $rootScope.$watch('searchValue', function() {
            $scope.gridOptions.filterOptions.filterText = this.last;
        }, true);

        /**
         * Grid Options
         */
        $scope.gridOptions = {
            data: 'myData',
            headerRowHeight: 40,
            rowHeight: 38,
            enableRowSelection: false,
            enableCellSelection: false,
            filterOptions: {
                filterText: '',
                useExternalFilter: false
            },
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {field: 'name', displayName: 'Name'},
                {field: 'updated_at', displayName: 'Bearbeitet von'},
                {field: 'updated_by_name', displayName: 'Bearbeitet am'},
                {
                    field: '',
                    displayName: 'Aktion',
                    width: '100px',
                    cellTemplate: '<div class="btn-toolbar" role="toolbar">' +
                        '<div class="btn-group btn-group-sm grid-buttons">' +
                        '<button ng-click="openEditModel(row)" type="button" class="btn btn-primary btn-sm">' +
                        '<i class="glyphicons pencil"></i>' +
                        '</button>' +
                        '</div>' +
                        '<div class="btn-group btn-group-sm grid-buttons">' +
                        '<button ng-click="openDeleteModel(row)" type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#{{ modalID }}">' +
                        '<i class="glyphicons circle_remove"></i>' +
                        '</button>' +
                        '</div>' +
                        '</div>'
                }
            ]
        };

        /**
         * Get Data
         */
        $scope.loadData = function(){
            Ajax.get({
                    url: 'section'
                },
                function (data, message, status) {
                    $scope.myData = data;
                    Noty.info('Daten wurden erfolgreich geladen');
                    Progressbar.hide();

                },
                function (err) {
                    Noty.error('Fehler beim Laden der Daten');
                    Progressbar.hide();

                }
            );
        };
        $scope.loadData();


        /**
         * Go to create state
         */
        $scope.create = function () {
            $state.go('master.sections.create');
        };

        /**
         * Open Edit Modal
         *
         * @param row
         */
        $scope.openEditModel = function (row){
            $state.go('master.sections.edit', {'sectionId': row.entity.id});
        };

        /**
         * Open Delete Modal
         *
         * @param row
         */
        $scope.openDeleteModel = function (row){
            $scope.modalTitle = '"' + row.entity.name + '"' + ' löschen';
            $scope.modalInputID = row.entity.id;
            $scope.modalInputName = row.entity.name;
            $scope.modalButtonText = 'Löschen';
            $scope.modalEntity = row.entity;
            $scope.modalType = 'Delete';
        };

        /**
         * Save Modal
         */
        $scope.submitModal = function () {
            $('#'+$scope.modalID).modal('hide');
            Progressbar.show(3, 'Daten überprüfen');

            var data = {
                id: $scope.modalInputID,
                name: $scope.modalInputName
            };

            Progressbar.next('Lösche Element');
            Ajax.delete({
                    url: 'section/' + data.id
                },
                function (data, message, status) {
                    Progressbar.next('Daten werden synchronisiert');
                    $scope.loadData();
                    Noty.success('Daten wurden gelöscht');
                },
                function (err) {
                    Noty.error('Fehler beim Speichern der Daten');
                },
                function () {
                    Progressbar.hide();
                }
            );
        };



        /**
         * Update row
         *
         * @param data
         */
        $scope.updateRow = function(row){
            Progressbar.next('Speichere geändertes Element');
            Ajax.post({
                    url: 'section/' + row.id,
                    data: row
                },
                function (data, message, status) {
                    Progressbar.next('Sync Data');
                    $scope.loadData();
                    Noty.success('Daten wurden gespeichert');
                },
                function (err) {
                    Noty.error('Fehler beim Speichern der Daten');
                },
                function () {
                    Progressbar.hide();
                }
            );
        };




    });