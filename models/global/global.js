'use strict';

var _ = require('lodash');

var Global = function() {
    var clean_output = function( output, properties ){
        return _.map( output, _.partialRight(_.pick, properties ));
    };

    return {
        FIND_INDEX: function (array, property, value) {
            return _.findIndex(array, function (obj) {
                return obj[property] == value;
            });
        },
        CLEAN_OUTPUT_OBJECT: function( output, properties ){
            return clean_output( [output], properties )[0];
        },
        CLEAN_OUTPUT_ARRAY: function( output, properties ){
            return clean_output( output, properties );
        },
        MERGE_BY_PROPERTIES: function( arr1, arr2, property1, property2 ){
            var merged = _( arr1 )                      // start sequence
                .keyBy( property1 )                      // create a dictionary of the 1st array
                .merge(_.keyBy( arr2, property2 ))      // create a dictionary of the 2nd array, and merge it to the 1st
                .values()                               // turn the combined dictionary to array
                .value();                               // get the value (array) out of the sequence

            return merged;
        }
    }
}();

module.exports = Global;

