'use strict';

angular.module('w3ui')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.media.list',{
            access: 'authorized',
            url: '',
            data: {
                isNavi: false,
                title: 'Medien',
                subtitle: 'Alle',
                icon: 'picture',
                parent: 'master.media'
            },
            views :{
                'content': {
                    controller: 'MediaListCtrl',
                    templateUrl: 'views/media/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('MediaListCtrl', function ($scope, $rootScope, $state, $location, $resource, Medias, Users, Authentication, Ajax, Noty, Progressbar) {
        $scope.modalID = 'modalDelete';
        $scope.admin = Authentication.is('admin');
        $rootScope.searchBarVisible = true;

        $scope.modalEntity = {};


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
            rowHeight: 80,
            enableRowSelection: false,
            enableCellSelection: false,
            filterOptions: {
                filterText: '',
                useExternalFilter: false
            },
            columnDefs: [
                {field: 'id', displayName: 'ID'},
                {
                    field: '',
                    displayName: 'Aktion',
                    width: '140px',
                    cellTemplate: '<div class="imageThumb"><img src="http://localhost/www/baselanwaelte.ch/resources/medias/{{ row.entity.id }}.{{ row.entity.ext }}" /></div>'
                },
                {field: 'name', displayName: 'Name'},
                {field: 'mimetype_id', displayName: 'Typ'},
                {field: 'ext', displayName: 'Ext'},
                {field: 'updated_at', displayName: 'Bearbeitet am'},
                {field: 'updated_by_name', displayName: 'Bearbeitet von'},
                {
                    field: '',
                    displayName: 'Aktion',
                    width: '100px',
                    cellTemplate: '<!--div class="btn-toolbar" role="toolbar">' +
                        '<div class="btn-group btn-group-sm grid-buttons">' +
                        '<button ng-click="edit(row)" type="button" class="btn btn-primary btn-sm">' +
                        '<i class="glyphicons pencil"></i>' +
                        '</button>' +
                        '</div-->' +
                        '<div class="btn-group btn-group-sm grid-buttons" data-ng-show="admin">' +
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
        $scope.getMedias = function(){
            Progressbar.show(1, 'Lade Medias Daten');
            $scope.modalEntity = {};

            Authentication.setHttpHeaders();
            $scope.myData = Medias.query();
            $scope.myData.$promise.then(function (result) {


                Authentication.setHttpHeaders();
                var oUsers = Users.query();
                oUsers.$promise.then(function (list) {

                    for( var i = 0; i < result.length; i++ ){
                        var user = _.where(list, {id: result[i].updated_by});
                        result[i]['updated_by_name'] = user[0].fname + ' ' + user[0].lastname;

                        //result[i]['ext'] = result[i]['mimetype_id'].split('/')[1];
                        //console.log(result[i]);
                    }

                    $scope.myData = result;
                    Progressbar.hide();
                });
            });
        };
        $scope.getMedias();


        $('#uploadModal').on('hidden.bs.modal', function() {
            $scope.getMedias();
        });



        /**
         * Open Delete Modal
         *
         * @param row
         */
        $scope.openDeleteModel = function (row){
            $scope.modalEntity = row.entity;
            $scope.modalTitle = '"' + $scope.modalEntity.name + '"' + ' löschen';
            $scope.modalButtonText = 'Löschen';
        };

        /**
         * Save Modal
         */
        $scope.submitModal = function () {
            $('#'+$scope.modalID).modal('hide');
            Progressbar.show(1, 'Daten überprüfen');

            Authentication.setHttpHeaders();
            $scope.modalEntity.$delete({Id: $scope.modalEntity.id}, function(result){
                $scope.myData = _.without($scope.myData, _.findWhere($scope.myData, {id: $scope.modalEntity.id}));
                Progressbar.hide();
            });
        };






    });