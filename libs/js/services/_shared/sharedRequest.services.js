'use strict';

app.factory( 'sharedRequest', [ 'API', '$http', '$httpParamSerializer', '$location', function( API, $http, $httpParamSerializer, $location ) {

    var factory = {};

    factory.httpRequest = function( url, method, jsonData ) {

        var url = $location.protocol() + "://" + location.host + "/" + API.APIBase + "/" + url;

        if (jsonData === undefined) {
            jsonData = {};
        }

        // SE DEN MÅDE JONAS OG CO RETURNERE VÆRDIER MED PROMISSE
        return $http({
            method: method,
            url: url,
            cache: true,
            data: $httpParamSerializer(jsonData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //timeout: timeout.promise
        }).then(
            function successCallback( response, status, headers, config ) {
                return response.data;
            }, function errorCallback() {
                return "Vi kunne desværre ikke hente din data - prøv igen";
            }
        );
    };

    return factory;
}]);