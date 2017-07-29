'use strict';

// https://scotch.io/tutorials/making-skinny-angularjs-controllers
app.controller('appCtrl', ['$rootScope', '$scope', '$state', 'User', 'Projects', function( $rootScope, $scope, $state, User, Projects ) {


    $scope.Projects = Projects;
    $scope.user = User;

        /* PROJECTS */
    //$scope.projects = projects;

   /*
    // KAN DENNE KOMME I FACOTRY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $rootScope.$watch('projects', function ( newValue, oldValue ) {
        alert(1)
        if( newValue !== undefined && newValue !== oldValue){
            alert(2)
            $scope.projects = $rootScope.projects;
        }
    });
    */

    /* HANDLE PAGE */
    // I GLOBAL SCRIPT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!FACTORY
    $scope.changeState = function( state, paramas ){
        $state.go( state, paramas )
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    /* QUESTIONS */

    var help = "Hjælpebeskrivelse af hvert enkelt valgmulighed";

    //$rootScope.items = [];

    //GROUP parent: Array (kan bruges på flere), grandParent: null ex. "Ønskes ændring af"
    //ITEM parent: Number, grandParent: Array (kan bruges på flere) ex. "Gulv"

    /*
    $rootScope.items.push({ id:1, text: "Vælg de bygningselementer, der skal foretages renovering af", type: "list", parent: [ "r1", "r2", "r3", "r4"], section: true, required: true, other: { type: 1 }, length: 5, help: "Hjælpe sektion 1" });
    $rootScope.items.push({ id:2, text: "Gulv", type: "boolean", parent: 1, grandParent: [ "r1" ] } );
    $rootScope.items.push({ id:3, text: "Vægge", type: "boolean", parent: 1, grandParent: [ "r1", "r2" ] });
    $rootScope.items.push({ id:4, text: "Loft*", type: "boolean", parent: 1, grandParent: [ "r1", "r2", "r3"] });
    $rootScope.items.push({ id:5, text: "Vinduer*", type: "boolean", parent: 1, grandParent: [ "r1", "r2", "r3"] });


    $rootScope.items.push({ id:6, text: "Nuværende gulvtype", type: "radioGroup", parent: [ 2 ], section: true, comment: true, other: { type: 2 }, length: 2, help: "Hjælpe sektion 2" });
    $rootScope.items.push({ id:7, text: "Trægulv", images: ["kitchen.jpg","kitchen.jpg","kitchen.jpg","kitchen.jpg"], help: help, parent: 6, grandParent: [ 2 ] });
    $rootScope.items.push({ id:8, text: "Fliser", images: ["kitchen.jpg","kitchen.jpg","kitchen.jpg","kitchen.jpg"], help: help, parent: 6, grandParent: [ 2 ] });
    $rootScope.items.push({ id:9, text: "Linolium", images: ["kitchen.jpg"], help: help, parent: 6, grandParent: [ 2 ] });
    $rootScope.items.push({ id:10, text: "Gulvtæppe", images: [], help: help, parent: 6, grandParent: [ 2 ] });

    $rootScope.items.push({ id:11, text: "Nuværende vægge", type: "radioGroup", parent: [ 3 ], section: true, comment: true, other: { type: 2 }, length: 2, help: "Hjælpe sektion 1" });
    $rootScope.items.push({ id:12, text: "Væg 1", images: ["kitchen.jpg"], help: help, parent: 11, grandParent: [ 3 ] });
    $rootScope.items.push({ id:13, text: "Væg 2", images: ["kitchen.jpg"], help: help, parent: 11, grandParent: [ 3 ] });
    $rootScope.items.push({ id:14, text: "Væg 3", images: ["kitchen.jpg"], help: help, parent: 11, grandParent: [ 3 ] });
    $rootScope.items.push({ id:15, text: "Væg 4", images: ["kitchen.jpg"], help: help, parent: 11, grandParent: [ 3 ] });
    */
}]);


app.controller('HenrikCtrl', ['$rootScope', '$scope', '$filter', '$window', '$state', '$stateParams', '$mdDialog', 'Global', 'Queue', 'Rooms', 'Projects', 'responses', function( $rootScope, $scope, $filter, $window, $state, $stateParams, $mdDialog, Global, Queue, Rooms, Projects, responses ) {

    $scope.otherShow = false;

    $rootScope.responses = responses;

    console.log("responses", responses)


    Global.mergeArrayByProperty( $rootScope.items, responses, "id" );
    Queue.initQueue( responses );
    /* I RUN */
    $scope.itemId = parseInt( $stateParams.itemId );


    //OTHER 1=TEXTAREA, 2=INPUT
    $scope.items = $rootScope.items;

    /* ROOTSCOPE ROOMS */

    if( $stateParams.grandParent ){
        $rootScope.room = Global.find( Rooms.getRooms(), { id: $stateParams.grandParent } ).title;
    }

    /* DIALOG - CHANGING ROOM */
    if( $stateParams.grandParent !=  $rootScope.currentGrandParent ){
        $rootScope.currentGrandParent = $stateParams.grandParent;

        var ev = true;
        $mdDialog.show(
            $mdDialog.alert()
                 .parent(angular.element(document.querySelector('#popupContainer')))
                 .clickOutsideToClose(true)
                 .title('Næste handling')
                 .textContent( "Du skal nu besvare spørgsmål om dit " + $rootScope.room )
                 .ariaLabel('Næste rum')
                 .ok('Det er forstået!')
                 .targetEvent(ev)
            );
        }


    var filterValue = $filter('filter')( $scope.items , { id: $scope.itemId } )[0];    // DENNE MÅ VI ALTSÅ KUNNE BRUGE I HTML OGSÅ
    var action = filterValue.text.title;
    if( action ){
        $rootScope.title = $rootScope.room + " > " + action;
    }else{
        $rootScope.title = $rootScope.room;
    }


    /* NAVIGATION */
    if( $rootScope.startId === undefined ){ $rootScope.startId = $scope.itemId; }

    $scope.showBack = $rootScope.startId == $scope.itemId ? false : true;
    $scope.lastState = function(){
        $window.history.back();
    };

    // DISPLAY SETTINGS - SKAL DER LAVES TABS ETC?
    // SECTION ACTIONS
    // FLERE PARENT
    // ROOM ID


    /*******************************************************************************************************
     * CUSTOMER RESPONSES
     */
    /*********************************************
     * RESPONSE
     * @type {Array}
     */

    // OTHER - KEYUP ER NOK IKKE HENSIGTSMÆSSIGT
    /*********************************************
     * RADIO RESPONSE
     * @param parent
     * @param child
     */


    var toggleSaving = function(){
        $scope.saving = !$scope.saving;
    };
    var responseId = function(){
        return _.find( $rootScope.items, { id: parseInt( $stateParams.itemId ) })._id
    };
    var getResponsesBoolean = function( parent ) {
        return _.filter( $rootScope.items, function( item ){
            var isValid = function isValid( element ){
                return element == parent.id;
            };

            return item.parent.findIndex( isValid ) > -1 ? true : false;
        });
    };
    var getResponsesRadio = function( parent, _item ) {
        return _.filter( $rootScope.items, function( item ){
            item.value = false;

            var isValid = function isValid( element ){
                return element == parent.id;
            };

            if( item.id == _item.id ){
                item.value = true;
            }
            return item.parent.findIndex( isValid ) > -1 ? true : false;
        });
    };

    $scope.booleanResponse = function( parent, item ){
        toggleSaving();
        Projects.setResponseId( item.id );
        Projects.setResponses( getResponsesBoolean( parent ) );
        Projects.handleResponse( responseId(), toggleSaving );

    };

    $scope.radioResponse = function( parent, _item ){
        toggleSaving();
        Projects.setResponseId( _item.id );
        Projects.setResponses( getResponsesRadio( parent, _item ) );
        Projects.handleResponse( responseId(), toggleSaving );
    };
}]);
