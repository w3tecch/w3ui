'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.rest',{
            access: 'admin',
            url: 'rest',
            views :{
                'body': {
                    controller: 'RestCtrl',
                    templateUrl: 'views/rest/rest.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('RestCtrl', function ($scope, Ajax, Noty, Progressbar) {
        Progressbar.show(1, 'Lade Sections Daten');
        $scope.modalID = 'modalRest';


        /**
         * Grid Options
         */
        $scope.gridOptions = {
            data: 'myData',
            rowHeight: 30,
            enableRowSelection: false,
            enableCellSelection: false,
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {field: 'name', displayName: 'Name'},
                {field:'', width: '100px', cellTemplate: '<button data-toggle="modal" data-target="#{{ modalID }}" ng-click="openEditModel(row)" type="button" class="btn btn-primary btn-sm btn-block">' +
                    '<i class="glyphicons white pencil"></i>Bearbeiten</button>'
                },
                {field:'', width: '100px', cellTemplate: '<button data-toggle="modal" data-target="#{{ modalID }}" ng-click="openDeleteModel(row)" type="button" class="btn btn-danger btn-sm btn-block">' +
                    '<i class="glyphicons white circle_remove"></i>Löschen</button>'
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
         * Open Add Modal
         */
        $scope.openAddModel = function () {
            $scope.modalTitle = 'Erstellen';
            $scope.modalMode = 'POST';
            $scope.modalType = 'Add';
            $scope.modalInputName = '';
            $scope.modalInputID = '';
            $scope.showInputID = false;
            $scope.modalButtonType = 'success';
            $scope.modalButtonText = 'Speichern';
            $scope.modalEntity = {};
        };

        /**
         * Open Edit Modal
         *
         * @param row
         */
        $scope.openEditModel = function (row){
            $scope.modalTitle = row.entity.name + ' bearbeiten';
            $scope.modalMode = 'POST';
            $scope.modalType = 'Update';
            $scope.modalInputName = row.entity.name;
            $scope.modalInputID = row.entity.id;
            $scope.showInputID = true;
            $scope.modalButtonType = 'success';
            $scope.modalButtonText = 'Speichern';
            $scope.modalEntity = row.entity;
        };

        /**
         * Open Delete Modal
         *
         * @param row
         */
        $scope.openDeleteModel = function (row){
            $scope.modalTitle = row.entity.name + ' löschen';
            $scope.modalMode = 'DELETE';
            $scope.modalType = 'Delete';
            $scope.modalInputName = row.entity.name;
            $scope.modalInputID = row.entity.id;
            $scope.showInputID = true;
            $scope.modalButtonType = 'danger';
            $scope.modalButtonText = 'Löschen';
            $scope.modalEntity = row.entity;
        };

        /**
         * Save Modal
         */
        $scope.saveModal = function () {
            $('#'+$scope.modalID).modal('hide');
            Progressbar.show(3, 'Daten überprüfen');

            var data = {
                id: $scope.modalInputID,
                name: $scope.modalInputName
            };

            switch($scope.modalType){
                case 'Add':
                    $scope.addRow(data);
                    break;
                case 'Update':
                    $scope.updateRow(data);
                    break;
                case 'Delete':
                    $scope.deleteRow(data);
                    break;
            }
        };

        /**
         * Add row to database
         *
         * @param row
         */
        $scope.addRow = function(row){
            Progressbar.next('Speichere neues Element');
            Ajax.post({
                    url: 'section',
                    data: row
                },
                function (data, message, status) {
                    Progressbar.next('Daten werden synchronisiert');
                    $scope.myData.push(data);
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

        /**
         * Delete row
         * TODO: all
         *
         * @param data
         */
        $scope.deleteRow = function(row){
            Progressbar.next('Lösche Element');
            Ajax.delete({
                    url: 'section/' + row.id
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


    });
