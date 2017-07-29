'use strict';

app.factory('Queue', ['$rootScope', '$stateParams', '$mdDialog', 'Global', 'Rooms', function( $rootScope, $stateParams, $mdDialog, Global, Rooms ) {
    $rootScope.queue = [];
    var roomId, index, currentGrandParent;
    var itemExists = function( id ){
        index = _.findIndex( $rootScope.queue, { grandParent: roomId } );
        return index == -1 ? false : true;
    };

    function add() {
        var ids = _.filter( $rootScope.items, function( item ) {
            return _.find( item.parent , function( parent ) {
                return parent == roomId;
            });
        });

        var gpIndex = _.findIndex( $rootScope.queue, { grandParent: $stateParams.grandParent } );
        _.each( ids, function( id ){
            if( gpIndex > -1 && gpIndex + 1 != $rootScope.queue.length ){
                var d = { id: id.id, grandParent: $stateParams.grandParent.toString(), length: id.length }; //roomId.toString()
                $rootScope.queue.splice( gpIndex + 1, 0, d )
            }else{
                if( $stateParams.grandParent ){
                    var d = { id: id.id, grandParent: $stateParams.grandParent.toString(), length: id.length }; //roomId.toString()
                }else{
                    var d = { id: id.id, grandParent: roomId.toString(), length: id.length }; //
                }

                $rootScope.queue.push( d );
            }
        });

        var currentState = $stateParams.itemId === undefined && $stateParams.grandParent === undefined ? 0 : 1;

        if( currentState == 1 ){
            var index = _.findIndex( $rootScope.queue, function( q ){
                return q.id == $stateParams.itemId && q.grandParent == $stateParams.grandParent
            });
            currentState = index + 1;
        }

        console.log( currentState, $stateParams.itemId, $stateParams.grandParent )

        $rootScope.next = $rootScope.queue[ currentState ];

        $rootScope.currentState = currentState;
    }

    function remove() {
        // DER KAN VEL VÆRE FLERE MED SAMME INDEX: FOR BRUGES VED GULV; VÆGGE ETC - GIV MÅSKE UNIKT ID OGSÅ
        return $rootScope.queue.splice(index, 1);
    }

    function reset() {
        $rootScope.queue = [];
    }

    var factory = {};

    factory.initQueue = function( responses ){
         _.each( responses, function( response ){
            factory.changeQueue( response.id, true );
        });
    };

    factory.changeQueue = function( _roomId, init ) { //_status
        roomId = _roomId;

        if(itemExists()){
            if( !init  ){
                remove();
            }
        }else{
            add();
        }

        console.log( $rootScope.queue )
    };

    factory.remove = function( some ) {
        remove( some );
    };

    factory.reset = function( some ) {
        reset( some );
    };

    return factory;
}]);