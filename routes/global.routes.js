var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');


var path = require('path');
var appDir = path.dirname(require.main.filename);
var env = process.env.NODE_ENV || 'development';
if(env == "production"){
    appDir = appDir + "/repo";
}

var user = require( path.join( appDir, '../models/user/user' ) );
var room = require( path.join( appDir, '../models/rooms/room' ) );

router.route('/user')
    .get( user.GET_USER );

router.route('/rooms')
    .get( room.GET_ROOMS );


var User = require("./../models/db/user.db");
router.route('/temp/user')
    .get( function( req, res, next ){
        req.session.userId = "5967c7ebf36d2830a5bf4718";

        res.json({
            user: true
        })
    });

router.route('/temp/haand')
    .get( function( req, res, next ){
        // TJEK SESSSION FØRST
        // passport: { user: '58f349580bce0705607a3f46' } }
        var userId = "5967c7f7f36d2830a5bf4719";

        User.findById( userId, function ( err, user ) {
            console.log("USER", user)

            req.session.user = user;

            res.json({
                haand: true
            })
        });

    });

module.exports = router;

