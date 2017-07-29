'use strict';

app.controller('tempSetUser', ['$scope', '$location', '$http', '$state', function( $scope, $location, $http, $state ) {
    $scope.setUser = function(){

        var url = $location.protocol() + "://" + location.host + "/api/temp/user";

        return $http({
            method: "GET",
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function successCallback( response, status, headers, config ) {
                if( response ){
                    $state.go('app.home');
                }
            }
        );
    };

    $scope.setHaand = function(){
        var url = $location.protocol() + "://" + location.host + "/api/temp/haand";

        return $http({
            method: "GET",
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function successCallback( response, status, headers, config ) {
                if( response ){
                    $state.go('app.home');
                }
            }
        );
    };
}]);
