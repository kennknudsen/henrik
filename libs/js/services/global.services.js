'use strict';

app.factory('Global', [ '$rootScope', function( $rootScope ) {
    var factory = {};

    var clean_output = function( output, properties ){
        return _.map( output, _.partialRight(_.pick, properties ));
    };


    /* HANDLERS */
    factory.set_global_scope = function( data, property ){
        $rootScope[ property ] = data;
    };

    factory.get_global_scope = function( property ){
        return $rootScope[ property ];
    };

    factory.mergeArrayByProperty = function( arr1, arr2, property ){
        var merged = _( arr1 )                      // start sequence
            .keyBy( property )                      // create a dictionary of the 1st array
            .merge(_.keyBy( arr2,  property ))      // create a dictionary of the 2nd array, and merge it to the 1st
            .values()                               // turn the combined dictionary to array
            .value();                               // get the value (array) out of the sequence

        return merged;
    };

    factory.clean_output_array = function( output, properties ){
        return clean_output( output, properties );
    };

    factory.find = function( output, params ){
        return _.find( output, params )
    };

    factory.filter = function( output, params ){
        return _.filter( output, params )
    };

    return factory;
}]);
