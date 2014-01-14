'use strict';

angular.module('w3uiFrontendApp')
    .factory('Authentication', function ($http, $cookieStore) {
        // Service logic
        var user = {};
        var token = '';


        // Public API here
        return {
            get: function (key) {
                try {
                    return this[key];
                } catch (e) {
                    return false;
                }
            },
            login: function (formUser, success, error) {
                $cookieStore.put('APP_ENVIRONMENT', configuration.set('APP_ENVIRONMENT', formUser.server));

                var url = configuration.generateBackendURLHelper();

                $http.defaults.headers.common['API-Key'] = configuration.get('API_KEY');
                $http.defaults.headers.common['Content-Type'] = configuration.get('CONTENT_TYPE');

                $http({
                    method: 'GET',
                    url: url + 'auth/login',
                    headers: {
                        'API-Secret': configuration.get('API_SECRET'),
                        'Authorization': 'Basic ' + Base64.encode(formUser.username + ':' + formUser.password)
                    }
                }).success(function (data, status, headers) {
                        var newUserObj = {};
                        newUserObj.id = data.user.id;
                        newUserObj.fname = data.user.fname;
                        newUserObj.lname = data.user.lname;
                        newUserObj.email = data.user.email;

                        user = newUserObj;
                        token = headers().authorization;

                        $cookieStore.put('W3_TOKEN', Base64.encode(token));
                        $cookieStore.put('W3_USER', Base64.encode(JSON.stringify(user)));

                        success(newUserObj, data.message, data.status);

                }).error(error);


            }
        };
    });
