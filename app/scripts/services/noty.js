'use strict';

angular.module('w3uiFrontendApp')
    .factory('noty', function () {
        // Service logic

        var queue = [];


        $.noty.defaults = {
            layout: 'bottomRight',
            theme: 'defaultTheme',
            type: 'alert',
            text: '', // can be html or string
            dismissQueue: true, // If you want to use queue feature set this true
            template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
            animation: {
                open: {height: 'toggle'},
                close: {height: 'toggle'},
                easing: 'swing',
                speed: 500 // opening & closing animation speed
            },
            timeout: false, // delay for closing event. Set false for sticky notifications
            force: false, // adds notification to the beginning of queue when set to true
            modal: false,
            maxVisible: 5, // you can set max visible notification for dismissQueue true option,
            killer: false, // for close all notifications before show
            closeWith: ['click'], // ['click', 'button', 'hover']
            callback: {
                onShow: function () {
                },
                afterShow: function () {
                },
                onClose: function () {
                },
                afterClose: function () {
                }
            },
            buttons: false // an array of buttons
        };


        // Public API here
        return {
            show: function ( message, type ) {

                switch (type){
                    case 'a':
                    case 'A':
                        type = 'alert';
                        break;

                    case 's':
                    case 'S':
                        type = 'success';
                        break;

                    case 'e':
                    case 'E':
                        type = 'error';
                        break;

                    case 'w':
                    case 'W':
                        type = 'warning';
                        break;

                    case 'i':
                    case 'I':
                        type = 'information';
                        break;

                    case 'c':
                    case 'C':
                        type = 'information';
                        break;

                    default:
                        type = 'alert';
                }

                var n = noty({
                    text        : 'bottomRight',
                    type        : type,
                    dismissQueue: true,
                    layout      : 'bottomRight',
                    theme       : 'defaultTheme'
                });

                queue.push( n );

            }
        };
    });
