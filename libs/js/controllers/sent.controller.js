'use strict';

app.controller('sentCtrl', ['$rootScope', '$scope', '$state', 'User', 'Projects', function( $rootScope, $scope, $state, User, Projects ) {

    $rootScope.title = "Send til håndværker";

    $scope.sentTo = [ "Håndværker ABC", "Håndværker CDE", "Håndværker FGH" ]

}]);
