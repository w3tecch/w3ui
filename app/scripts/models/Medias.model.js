'use strict';

angular.module('w3ui')
    .factory('Medias', function ($resource, $http) {
        return $resource(
            configuration.generateBackendURLHelper() + 'media/:Id',
            {Id: '@Id' }
        );
    });