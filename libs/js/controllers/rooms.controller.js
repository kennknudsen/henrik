'use strict';

app.controller('HenrikCtrl_rooms', ['$rootScope', '$scope', 'Global', 'Queue', 'Projects', 'rooms', 'responses', function( $rootScope, $scope, Global, Queue, Projects, rooms, responses ) {

    Projects.setProject();

    $rootScope.title = "Valg af rum";

    $rootScope.item = { section: true, text: "Vælg blandt nedenstående rum" };

    $scope.rooms = rooms;
    $scope.help = [{ text: "Start med at vælge de rum som du skal have renoveret og ønsker tilbud på" }];
    $scope.saving = false;

    console.log( responses )


    Global.mergeArrayByProperty( $scope.rooms, responses, "id" );

    Queue.initQueue( responses );

    /* SHOW HIDE MESSAGE OF SAVING ONGOING */
    var toggleSaving = function(){
        $scope.saving = !$scope.saving;
    };

    $scope.handleResponse = function( roomId ){
        toggleSaving();
        Projects.setRoomId( roomId );
        Projects.setRooms( $scope.rooms );
        Projects.handleResponse( "593a567c0c2ef31180fda546", toggleSaving );
    }
}]);