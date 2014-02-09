'use strict';

angular.module('w3ui')

/**
 * Each page or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.page.edit', {
            access: 'authorized',
            url: '/edit/{pageId}',
            data: {
                isNavi: false,
                title: 'Seite',
                subtitle: 'Bearbeiten',
                icon: 'pencil',
                parent: 'master.page'
            },
            views: {
                'content': {
                    controller: 'PageEditCtrl',
                    templateUrl: 'views/page/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PageEditCtrl', function ($scope, $rootScope, $state, $stateParams, Pages, Authentication, Ajax, Noty, Progressbar) {
        $rootScope.searchBarVisible = false;
        Progressbar.show(2, 'Lade page Daten');

        $scope.hasContent = true;



        /**
         * Get Data
         *
         * @param id
         */
        $scope.getData = function (id) {
            Authentication.setHttpHeaders();
            $scope.Page = Pages.get({Id: id}, function () {

                if($scope.Page.custom){
                    $scope.hasContent = false;
                    Progressbar.hide();
                }else{
                    $scope.getContent(id);
                }

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
            $scope.Content = Pages.getContent({Id: id}, function (response) {
                $scope.htmlcontent = response.html;
                Progressbar.hide();
            });
        };

        /**
         * Init Process
         */
        $scope.getData($stateParams.pageId);

        /**
         * Saves the changes
         */
        $scope.save = function () {
            //Validation
            Progressbar.show(3, 'Daten werden überprüft...');

            //Updating
            Progressbar.next('Speichere neues Element..');
            Authentication.setHttpHeaders();
            $scope.Page.$save({Id: $stateParams.pageId}, function () {
                if($scope.hasContent){
                    $scope.updateContent($stateParams.pageId);
                }else{
                    $state.go('master.page');
                    Progressbar.hide();
                    Noty.success('Neues Element wurde erfolgreich erstellt');
                }
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
                    url: 'page/' + id + '/content',
                    contentType: 'text/html',
                    accept: 'text/html',
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