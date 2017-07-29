'use strict';

app.factory('User', [ '$rootScope', 'API', 'Global', 'sharedRequest', function( $rootScope, API, Global, sharedRequest ) {

    var url = API.routes.user;
    var factory = {};

    var user;

    var get_global_scope = function(){
        return Global.get_global_scope( 'user' );
    };

    /* REQUESTS */
    factory.getUser = function () {
        return sharedRequest.httpRequest( url, 'GET' );
    };

    /* HANDLERS */



    factory.validateUserRights = function( userRight ){
        return user.userRights == userRight ? true : false ;
    };

    factory.setUser = function( newUser ){
        user = newUser;
    };

    /*
    factory.set_global_scope = function( user ){
        Global.set_global_scope( user, 'user' );
    };
    */

    factory.getFirstName = function(){
        return user.name.firstName;
    };

    factory.getLastName = function(){
        return user.name.lastName;
    };

    factory.getEmail= function(){
        return user.email;
    };

    return factory;
}]);