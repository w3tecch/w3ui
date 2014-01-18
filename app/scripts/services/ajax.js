'use strict';

angular.module('w3uiFrontendApp')
    .factory('Ajax', function ($http, Authentication) {

        /**
         * Global variables
         */
        var backendUrl = configuration.generateBackendURLHelper();
        console.log('Ajax Core', Authentication.get('token'));

        /**
         * Run Http Request
         *
         * @param requestData
         * @param requestSuccess
         * @param requestError
         */
        function run(requestData, requestSuccess, requestError) {
            var url = $.trim(backendUrl + requestData.url);
            var method = $.trim(requestData.method);
            var headers = {
                'Accept': configuration.get('CONTENT_TYPE'),
                'Content-Type': configuration.get('CONTENT_TYPE'),
                'Authorization': Authentication.get('token')
            };

            //Without request data
            if (method == 'GET') {
                $http({
                    method: method,
                    url: url,
                    headers: headers
                }).success(function (responseBody, status, headers) {
                    Authentication.set('token', headers().authorization);
                    requestSuccess(responseBody.data, responseBody.message, responseBody.status);

                }).error(requestError);

            //With request data
            } else {
                var data = requestData.data;
                if (configuration.get('CONTENT_TYPE') == 'application/json') {
                    data = JSON.stringify(data);
                }

                $http({
                    method: method,
                    url: url,
                    data: data,
                    headers: headers
                }).success(function (responseBody, status, headers) {
                    Authentication.set('token', headers().authorization);
                    requestSuccess(responseBody.data, responseBody.message, responseBody.status);

                }).error(requestError);

            }
        }


        /**
         * Public API
         */
        return {
            get: function (data, success, error) {
                data.method = 'GET';
                run(data, success, error);
            },
            post: function (data, success, error) {
                data.method = 'POST';
                run(data, success, error);
            },
            put: function (data, success, error) {
                data.method = 'PUT';
            },
            delete: function (data, success, error) {
                data.method = 'DELETE';
            }
        };
    });
