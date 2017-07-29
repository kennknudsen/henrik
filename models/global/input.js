'use stict';

var async = require( 'async' );

var path = require('path');
var appDir = path.dirname(require.main.filename);
var env = process.env.NODE_ENV || 'development';
if(env == "production"){
    appDir = appDir + "/repo";
}
var validate = require( path.join( appDir, '../models/validation/validate.validation' ) );
var validate_Response = require( path.join( appDir, '../models/validation/response.validation' ) );

//SANITIZE INPUT TOO
var Input = function(){
    var value, pram;
    var validateInput = function( req, res, next ){
        var _validate = function( callback ){
            validate[pram]( req, res, callback );
        };
        var _validateResponse = function(callback){
            validate_Response.JSON( req, res, callback );
        };

        async.series([
                _validate,
                _validateResponse
            ],
            function( err, results ) {
                if( !err ){
                    next( null, value );
                }
            });
    };

    return {
        GET_PROJECT_ID: function( req, res, next ) {
            pram = 'PROJECT_ID';
            value = req.params.projectId;
            validateInput( req, res, next );
        },
        GET_RESPONSE_ID: function( req, res, next ) {
            pram = 'RESPONSE_ID';
            value = req.params.responseId;
            validateInput( req, res, next );
        },
        GET_ROOM: function( req, res, next ) {
            pram = 'ROOM';
            value = req.params.room;
            validateInput( req, res, next );
        },
        GET_ADDRESS: function( req, res, next, optional ) {
            if( optional && !req.body.address ){ return next() }
            pram = 'ADDRESS';
            value = req.body.address;
            validateInput( req, res, next );
        },
        GET_ZIP: function( req, res, next, optional ) {
            if( optional && !req.body.zip ){ return next() }
            pram = 'ZIP';
            value = req.body.zip;
            validateInput( req, res, next );
        },
        GET_CITY: function( req, res, next, optional ) {
            if( optional && !req.body.city ){ return next() }
            pram = 'CITY';
            value = req.body.city;
            validateInput( req, res, next );
        },
        GET_RESPONSE: function( req, res, next, optional ) {
            if( optional && !req.body.city ){ return next() }
            pram = 'RESPONSE';
            value = JSON.parse( req.body.response );
            validateInput( req, res, next );
        }
    }
}();

module.exports = Input;