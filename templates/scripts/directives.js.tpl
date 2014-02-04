'use strict';

angular.module('w3ui')
    .directive('<%= name %>', function() {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });