'use strict';

angular.module('w3ui')
    .factory('Pages', function ($resource, $http) {
        return $resource(
            configuration.generateBackendURLHelper() + 'page/:Id',
            {Id: '@Id' },
            {
                'getContent': {
                    method: 'GET',
                    url: configuration.generateBackendURLHelper() + 'page/:Id/content',
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