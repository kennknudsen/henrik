var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');


var path = require('path');
var appDir = path.dirname(require.main.filename);
var env = process.env.NODE_ENV || 'development';

console.log("VI ER HER")

if(env == "production"){
    console.log("VI ER HER 2")
    console.log(appDir)
    appDir = appDir + "/repo";
    console.log(appDir)
}

console.log("VI ER HER 3")

var Items_DB = require( path.join( appDir, '../models/db/items.db' ) );

var Global = require( path.join( appDir, '../models/global/global' ) );

/* GET home page. */
router.route('/')
    .get(function( req, res, next ) {
        Items_DB.find( {}, function ( err, items ) {

            console.log( "items" )
            console.log( items )

            if( err ){
                err.logger = { msg: { internal: 'Moongose: get projects - search for projects failed ', id: 10001 } };
                return next( err );
            }

            res.json({
                success: true,
                items: items
            });
        });
    });

module.exports = router;



