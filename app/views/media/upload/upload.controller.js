'use strict';

angular.module('w3ui')

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        /*$stateProvider.state('master.media.list.upload',{
            access: 'authorized',
            url: '',
            data: {
                isNavi: false,
                title: 'Medien',
                subtitle: 'Upload',
                icon: 'picture',
                parent: 'master.media.list'
            },
            views :{
                'upload': {
                    controller: 'MediaUploadCtrl',
                    templateUrl: 'views/media/upload/upload.view.html'
                }
            }
        });*/
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('MediaUploadCtrl', function ($scope, $fileUploader, Medias, Authentication) {
        $scope.uploadDone = false;
        $scope.progressbar = 0;
        $scope.progressbarAmount = 0;
        $scope.progressbarCompleted = 0;


        // Creates a uploader
        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,
            //url: 'http://localhost/w3tec/w3ui-frontend/app/temp/upload.php'
            url: 'http://localhost/www/baselanwaelte.ch/resources/temp/upload.php'
        });



        // ADDING FILTERS

        // Images only
        uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        });


        // REGISTER HANDLERS
        uploader.bind('afteraddingfile', function (event, item) {
            console.info('After adding a file', item);
            $scope.progressbarAmount++;
            $('.drop-zone').hide();
            $('.upload-list').show();
        });



        uploader.bind('complete', function (event, xhr, item, response) {
            console.info('Complete', xhr, item, response);
            $scope.progressbarCompleted++;
            var total = $scope.progressbarAmount * 2;
            $scope.progressbar = 100 / total * $scope.progressbarCompleted;

        });




        uploader.bind('completeall', function (event, items) {
            console.info('Complete all', items);
            $scope.save(items);


        });


        $scope.save = function(items){
            var oResponse = jQuery.parseJSON( items[0]._xhr.response );

            var data = JSON.stringify({
                id: parseInt(oResponse.id),
                size: items[0].file.size,
                name: items[0].file.name,
                mimetype_id: items[0].file.type
            });

            console.log(oData);

            /*
             name: "Screen Shot 2013-11-24 at 21.56.57.png"
             size: 544551
             type: "image/png"
            * */

            Authentication.setHttpHeaders('application/json', 'application/json');
            $scope.Media = Medias.save(data, function(responseData){
                console.log(responseData);
            });

        };

    });


/*
 uploader.bind('afteraddingall', function (event, items) {
 console.info('After adding all files', items);

 });
 /*
 uploader.bind('beforeupload', function (event, item) {
 console.info('Before upload', item);
 });

 uploader.bind('progress', function (event, item, progress) {
 console.info('Progress: ' + progress, item);
 });

 uploader.bind('success', function (event, xhr, item, response) {
 console.info('Success', xhr, item, response);
 });

 uploader.bind('cancel', function (event, xhr, item) {
 console.info('Cancel', xhr, item);
 });

 uploader.bind('error', function (event, xhr, item, response) {
 console.info('Error', xhr, item, response);
 });*/
/*
 uploader.bind('progressall', function (event, progress) {
 console.info('Total progress: ' + progress);
 });
 */