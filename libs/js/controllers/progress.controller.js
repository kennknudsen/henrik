'use strict';

app.controller('progress-ctrl', ['$rootScope', '$scope', '$stateParams', '$transitions', function( $rootScope, $scope, $stateParams, $transitions ) {
    //SKAL BARE VÆR "VAR TOTALLENGTH"
    $scope.totalLength = 0; // CURRENT STATE
    $scope.stepsCompleated = 0;

    //VIRKER IKKE VED TILBAGE - FORDI DER SÅ ER SAT FLERE I KØEN
    $transitions.onSuccess({ }, function(trans) {
        var queue = $rootScope.queue;

        $scope.totalLength = 0; // CURRENT STATE

        for( var i = $rootScope.currentState; i < queue.length; i++ ){
            $scope.totalLength += queue[i].length
        }

        $scope.progress = ( 1 / $scope.totalLength * 100 );
    });
}]);