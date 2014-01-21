'use strict';

angular.module('w3uiFrontendApp')
    .factory('Authentication', function ($http, $cookieStore) {
        // Service logic
        var store = {
            user: false,
            token: false
        };

        var loggedIn = false;


        // Public API here
        return {
            get: function (key) {
                try {
                    return store[key];
                } catch (e) {
                    return false;
                }
            },
            set: function (key, value) {
                try {
                    store[key] = value;
                    return true;
                } catch (e) {
                    return false;
                }
            },
            isLoggedIn: function () {
                if (store.user === undefined) {
                    return false;
                }
                return loggedIn;
            },
            login: function (formUser, success, error) {
                $cookieStore.put('APP_ENVIRONMENT', configuration.set('APP_ENVIRONMENT', formUser.server));

                var url = configuration.generateBackendURLHelper();

                $http.defaults.headers.common['API-Key'] = configuration.get('API_KEY');

                $http({
                    method: 'GET',
                    url: url + 'auth/login',
                    headers: {
                        'Accept': configuration.get('CONTENT_TYPE'),
                        'API-Secret': configuration.get('API_SECRET'),
                        'Authorization': 'Basic ' + Base64.encode(formUser.username + ':' + formUser.password)
                    }
                }).success(function (data, status, headers) {
                        var newUserObj = {};
                        newUserObj.id = data.user.id;
                        newUserObj.fname = data.user.fname;
                        newUserObj.lastname = data.user.lastname;
                        newUserObj.email = data.user.email;
                        newUserObj.username = newUserObj.fname + ' ' + newUserObj.lastname;
                        newUserObj.role = data.user.role;

                        store.user = newUserObj;
                        store.token = headers().authorization;

                        $cookieStore.put('W3_TOKEN', Base64.encode(store.token));
                        $cookieStore.put('W3_USER', Base64.encode(JSON.stringify(store.user)));

                        loggedIn = true;

                        success(store.user, data.message, data.status);

                    }).error(error);
            }
        };
    });
