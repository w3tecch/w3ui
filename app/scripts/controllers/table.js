'use strict';

angular.module('w3uiFrontendApp')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {

        $stateProvider.state('table', {
            access: 'admin',
            url: '/table',
            views: {
                'main': {
                    controller: 'TableCtrl',
                    templateUrl: 'views/table.html'
                },
                'navigation': {
                    controller: 'NavigationCtrl',
                    templateUrl: 'views/navigation.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('TableCtrl', function ($scope) {

        $scope.myData = [
            {name: 'Moroni', age: 50},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34}
        ];

        $scope.gridOptions = {
            data: 'myData',
            rowHeight: 30,
            enableRowSelection: false,
            enableCellSelection: false,
            columnDefs: [
                {field:'name', displayName:'Name'},
                {field:'age', displayName:'Age'},
                {field:'a', cellTemplate: '<button ng-click="edit(row)" type="button" class="btn btn-primary btn-sm">' +
                    '<i class="glyphicons white circle_remove"></i>Bearbeiten</button>'
                },
                {field:'b', cellTemplate: '<button ng-click="delete(row)" type="button" class="btn btn-danger btn-sm">' +
                    '<i class="glyphicons white circle_remove"></i>Löschen</button>'
                }
            ]
        };


        $scope.edit = function(row){
            console.log('edit ', row) ;
        };


        $scope.delete = function(row){
            console.log('delete ', row);
            var index = $scope.myData.indexOf(row.entity);
            $scope.gridOptions.selectItem(index, false);
            $scope.myData.splice(index, 1);
            


        };


    });

