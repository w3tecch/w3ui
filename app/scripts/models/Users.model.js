'use strict';

angular.module('w3ui')
    .factory('Users', function ($resource) {
        return $resource(
            configuration.generateBackendURLHelper() + 'user/:Id',
            {Id: '@Id' }
        );
    });