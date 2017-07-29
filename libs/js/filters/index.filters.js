'use strict';

app.filter('HenrikFilterSections', function() {
    /*return function( groups, key1 ) {
     var totals = 0;
     for ( var i = 0; i < groups.length; i++ ) {
     for ( var k = 0; k < groups[i].lines.length; k++ ) {
     totals = totals + groups[i].lines[k][key1];
     }
     }
     return totals;
     };
     */
});

app.filter('HenrikGetItem', ['$rootScope', '$stateParams', 'Global', function( $rootScope, $stateParams, Global ) {
    return function( items, value ) {

        //console.log( "items", items )
        //console.log( "parent", parent._id );
        //console.log( "value", value );
        //console.log( "reponses", $rootScope.responses)
        //console.log(_.find( $rootScope.responses, { question: parent._id }  ) );


        var itemId = parseInt( $stateParams.itemId );
        var grandParent = ~$stateParams.grandParent.indexOf("r") ? $stateParams.grandParent : parseInt( $stateParams.grandParent );

        //console.log("grandParent", grandParent)



        return _.filter( items, function( item ){


            var inResponse = Global.find( $rootScope.responses, { id: item.id.toString() }  );   //, room: grandParent

            //console.log( item.id.toString())

            //console.log(Global.find( $rootScope.responses, { id: item.id.toString() }  ).value == value );


            if( item.grandParent.length > 0 ){

                var matchToParents = item.parent.indexOf( itemId ) != -1 && _.includes( item.grandParent, grandParent ) ? true : false;

                //console.log("matchToParents", matchToParents)

                if( !matchToParents ) { return matchToParents }

                //console.log("inResponse", inResponse)

                if( !inResponse ){ return value === false ? true : false }

                //console.log("inResponse.value", inResponse.value)
                //console.log("value", value)
                //console.log("value = ", inResponse.value == value)
                //console.log("value = resp", inResponse.value == value ? true : false)

                return inResponse.value === value ? true : false;

            }else {

                var matchToParents = item.parent.indexOf( itemId ) != -1 ? true : false;
                //console.log("matchToParents", matchToParents)

                if( !matchToParents ) { return matchToParents }

                //console.log("inResponse", inResponse)

                if( !inResponse ){ return value === false ? true : false }

                //console.log("inResponse.value", inResponse.value)
                //console.log("value", value)
                //console.log("value = ", inResponse.value == value)
                //console.log("value = resp", inResponse.value == value ? true : false)

                return inResponse.value === value ? true : false;

            }
        });
    };

}]);