'use strict';

angular.module('w3uiFrontendApp')
    .factory('TestBubu', function () {

        /**
         *  Local variables
         */
        var store = {
            name: 'TestBubu'
        };



        /**
         * Public API
         */
        return {
            get: function (key) {
                return store[key];
            }
        };
    });