'use strict';

app.factory('Projects', [ '$rootScope', '$stateParams', '$state',  'API', 'Global', 'Queue', 'sharedRequest', function( $rootScope, $stateParams, $state, API, Global, Queue, sharedRequest ) {
    var urlBase = API.routes.projects;
    var factory = {};
    var currentProject;

    /* REQUESTS */
    factory.getProjects = function () {
        return sharedRequest.httpRequest( urlBase, 'GET' );
    };

    factory.postProject = function ( json ) {
        return sharedRequest.httpRequest( urlBase, 'POST', json );
    };

    factory.getResponses = function ( stateParams ) {
        var projectId = stateParams.projectId;
        var responseId =  _.find( $rootScope.items, { id: parseInt( stateParams.itemId ) })._id;
        var url = urlBase + "/" + projectId + "/response/" + responseId + "/" + stateParams.grandParent;

        console.log("URL ITEMS", url)

        return sharedRequest.httpRequest( url, 'GET' );
    };

    factory.getResponsesForRooms = function ( projectId, responseId ) {
        var url = urlBase + "/" + projectId + "/response/" + responseId + "/rooms";

        console.log("URL ROOMS", url)

        return sharedRequest.httpRequest( url, 'GET' );
    };


    factory.postResponses = function ( projectId, responseId, room, json ) {
        var url = urlBase + "/" + projectId + "/response/" + responseId + "/" + room;
        return sharedRequest.httpRequest( url, 'POST', json );
    };

    /* HANDLERS */
    factory.redirectToProjects = function(){

        var projects = this.get_global_scope().length;
        var started = this.projectsStarted().length > 0 ? true : false;
        var sent = this.projectsSent().length > 0 ? true : false;

        if( projects && started && sent  ){
            $state.go("app.projects")
        }
    };

    factory.projectsStarted = function(){
        return Global.filter( Global.get_global_scope( 'projects' ), "started" );
    };

    factory.projectsSent = function(){
        return Global.filter( Global.get_global_scope( 'projects' ), "sent" );
    };

    factory.set_global_scope = function( projects ){
        Global.set_global_scope( projects, 'projects' );
    };

    factory.get_global_scope = function(){
        return Global.get_global_scope( 'projects' );
    };

    factory.add_to_global_scope = function( projects ){
        $rootScope.projects.push( projects );
    };


    var id;
    var responses;
    var next;
    var questionID;

    var callback = function( err, results ){
        Queue.changeQueue( id );
        next();
    };

    var prepareResponse = function(){
        var response = Global.clean_output_array( responses, ['id', 'value'] );
        response = Global.filter( response, { value: true } );
        return JSON.stringify( response )
    };

    var updateDB = function(){

        var resp = JSON.parse( prepareResponse() );

        if( $rootScope.responses ) {
            $rootScope.responses = [];
            _.each( resp, function(r){
                $rootScope.responses.push( { id: r.id.toString(), value: r.value });
            });
        }

        return factory.postResponses( $stateParams.projectId, questionID, $stateParams.grandParent, { response: prepareResponse() } ).then(function ( response ) {
            callback( null, response );
            return;
        });
    };

    factory.setProject = function(){
        currentProject = Global.find( this.get_global_scope(), { project: $stateParams.projectId })
    };

    factory.getProject = function( obj ){

        if( !currentProject ) { return }

        if( obj ){
            if( obj == "address" ){
                return currentProject.address.address;
            }
        }

        return currentProject;
    };

    factory.setRoomId = function( room_Id ){
        id = room_Id;
    };

    factory.setResponseId = function( response_Id ){
        id = response_Id;

        console.log( "ID", id )
    };

    factory.setRooms = function( _rooms ){
        responses = _rooms;
    };

    factory.setResponses = function ( _responses ){
        responses = _responses;
    };

    factory.handleResponse =  function( _questionID, _next ){
        questionID = _questionID;
        next = _next;
        updateDB();
    };




    return factory;
}]);