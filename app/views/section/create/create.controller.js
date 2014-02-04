'use strict';

angular.module('w3ui')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.section.create',{
            access: 'authorized',
            url: '/create',
            data: {
                isNavi: false,
                title: 'Sektionen',
                subtitle: 'Erstellen',
                icon: 'plus',
                parent: 'master.section'
            },
            views :{
                'content': {
                    controller: 'SectionCreateCtrl',
                    templateUrl: 'views/section/form.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('SectionCreateCtrl', function ($scope, $rootScope, Sections, Authentication, $state, Progressbar, Noty, Ajax) {
        $rootScope.searchBarVisible = false;


        $scope.Section = {
            name: ''
        };
        $scope.htmlcontent = '';

        /**
         * Save new section
         */
        $scope.save = function(){
            Progressbar.show(2, 'Speichere neue Sektion');
            Authentication.setHttpHeaders('application/json', 'application/json');

            var data = JSON.stringify({
                name: $scope.Section.name
            });

            $scope.Section = Sections.save(data, function(responseData){
                $scope.updateContent(responseData.id);
            });
        };

        /**
         * Updating the content of the section
         *
         * @param id
         */
        $scope.updateContent = function (id) {
            Progressbar.next('Speichere Text...');
            Ajax.put({
                    url: 'section/' + id + '/content',
                    contentType: 'text/html',
                    data: $scope.htmlcontent
                },
                function () {
                    $state.go('master.section');
                    Progressbar.hide();
                    Noty.success('Neues Element wurde erfolgreich erstellt');
                },
                function () {
                    Noty.error('Fehler beim Speichern der Daten');
                }
            );

        };




        /*

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
        */


    });