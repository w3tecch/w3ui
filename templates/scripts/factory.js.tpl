'use strict';

angular.module('w3ui')
    .factory('<%= name %>', function () {

        /**
         *  Local variables
         */
        var store = {
            name: '<%= name %>'
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