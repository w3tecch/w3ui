'use strict';

angular.module('w3uiFrontendApp')

/**
 * AJAX Service
 */
    .factory('Ajax', function () {
        // Service logic
        var url = '';
        var token = '';




        // Public API here
        return {
            setUrl: function( newUrl ){
                url = newUrl;
            },
            setToken: function( newToken ){
                token = newToken;
            },
            get: function () {

            },
            post: function () {

            },
            put: function () {

            },
            delete: function () {

            }
        };
    });
