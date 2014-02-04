'use strict';

angular.module('w3ui')
    .service('<%= name %>', function() {
        this.sayHello = function() {
            return "Hello, World!"
        };
    });