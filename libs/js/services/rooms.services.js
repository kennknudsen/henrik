'use strict';

app.factory('Rooms', [ 'API', 'sharedRequest', function( API, sharedRequest ) {
    var urlBase = API.routes.rooms;
    var factory = {};
    var rooms;


    /* REQUESTS */
    factory.requestRooms = function () {
        return sharedRequest.httpRequest( urlBase, 'GET' );
    };

    factory.getRooms = function(){
       return rooms;
    };

    factory.setRooms = function ( _rooms ) {
        rooms = _rooms;
    };

    return factory;
}]);