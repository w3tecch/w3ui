'use strict';

angular.module('w3uiFrontendApp')
    .factory('Partners', function ($resource, $http) {
        return $resource(
            configuration.generateBackendURLHelper() + 'partner/:Id',
            {Id: '@Id' },
            {
                'getContent': {
                    method: 'GET',
                    url: configuration.generateBackendURLHelper() + 'partner/:Id/content',
                    responseType: 'text',
                    isArray: false,
                    transformResponse: [function(responseData) {
                        return {
                            html: responseData
                        }
                    }].concat($http.defaults.transformResponse)
                }
            }
        );
    });