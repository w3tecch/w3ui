'use strict';

angular.module('w3uiFrontendApp')

/**
 * And of course we define a controller for our route.
 */
    .controller('NavigationCtrl', function ($scope, Authentication) {

        $scope.list = [
            {
                'title': 'Home',
                'icon': 'imac',
                'children': [
                    {
                        'title': 'Home 1',
                        'state': 'master.home'
                    },
                    {
                        'title': 'Home 2',
                        'state': 'master.home'
                    }
                ]
            },
            {
                'title': 'Tabelle',
                'state': 'master.table',
                'icon': 'table'
            },
            {
                'title': 'Sektionen',
                'state': 'master.rest',
                'icon': 'leaf'
            }
        ];



        setTimeout(function(){
        //Toggle Events
        var $mainContainer = $('.main-container');
        $('.navigation-toggler').on('click', function () {

            //go to dash inactive
            if ($mainContainer.hasClass('dash-active')) {
                $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);
                $mainContainer.removeClass('dash-active').addClass('dash-inactive');

                //201 width
                $mainContainer.find('ul.sub-menu').width(201);
                setTimeout(function(){
                    $(window).trigger('resize');
                },300);

            //go to dash active
            } else {
                $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);
                $mainContainer.addClass('dash-active').removeClass('dash-inactive');
                setTimeout(function(){
                    $(window).trigger('resize');
                },300);
            }
        });


        $mainContainer.find('.main-navigation-menu > li:has(ul.sub-menu)').on('click', function () {

            var dblHeight = parseFloat($('ul.sub-menu').children().height()) * parseFloat($(this).find('ul.sub-menu').children().length);
            var dblWidth = 220;

            //when dash is active
            if ($mainContainer.hasClass('dash-active')) {

                //close selected one
                if ($(this).hasClass('open')) {
                    $(this).find('ul.sub-menu').width(0).delay(300).queue(function () {
                        $(this).dequeue();
                        $(this).parent().removeClass('open');
                    });

                } else {
                    //remove old one
                    $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').width(0);

                    //open new one
                    $(this).addClass('open').find('ul.sub-menu').width(dblWidth);
                }


            //when dash is inactive
            } else {

                //close selected one
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open').find('ul.sub-menu').height(0);


                } else {
                    //remove old one
                    $mainContainer.find('.main-navigation-menu > li.open').removeClass('open').find('ul.sub-menu').height(0);

                    //open new one
                    $(this).addClass('open').find('ul.sub-menu').height(dblHeight);

                }
            }
        });
        },300);

    });