'use strict';

app.factory('Items', [ '$rootScope', '$stateParams', '$state',  'API', 'Global', 'Queue', 'sharedRequest', function( $rootScope, $stateParams, $state, API, Global, Queue, sharedRequest ) {
    var urlBase = API.routes.items;
    var factory = {};

    /* REQUESTS */
    factory.getItems = function () {
        return sharedRequest.httpRequest( urlBase, 'GET' );
    };

    /* HANDLERS */
    factory.set_global_scope = function( items ){
        Global.set_global_scope( items, 'items' );
    };

    factory.get_global_scope = function(){
        return $rootScope.items;
    };



    return factory;
}]);