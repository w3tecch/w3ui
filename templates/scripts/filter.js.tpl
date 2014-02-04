'use strict';

angular.module('w3ui')
    .filter('<%= name %>', function() {
        return function(input) {
            try {
                return input.toUpperCase();
            } catch(e) {
                return input;
            }
        };
    });