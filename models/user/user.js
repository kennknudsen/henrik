'use strict';

var path = require('path');
var appDir = path.dirname(require.main.filename);

var global = require( path.join( appDir, '../models/global/global' ) );

var User = function( req, res, next ){
    var projectId;

    var getUser = function( req, res, next ){
        return req.session.user;
    };
    var getLocal = function( req, res, next ){
        return global.CLEAN_OUTPUT_OBJECT( getUser( req, res, next ), [ "local" ] );
    };
    var getName = function( req, res, next ){
        return global.CLEAN_OUTPUT_OBJECT( getUser( req, res, next ), [ "name" ] );
    };
    var getEmail = function( req, res, next, value ){
        var usernameObj = global.CLEAN_OUTPUT_OBJECT( getLocal( req, res, next, true ).local, [ "username" ] );
        if( value ){
            return usernameObj.username;
        }else{
            return usernameObj
        }

    };
    var getUserRights = function( req, res, next, value ){
        var userRightsObj = global.CLEAN_OUTPUT_OBJECT( getUser( req, res, next ), [ "userRights" ] );

        if( value ){
            return userRightsObj.userRights;
        }else{
            return userRightsObj
        }
    };
    var getProjects = function( req, res, next ){
        return req.session.user.projects;
    };

    return {
        SET_PROJECT_ID: function( _projectId ) {
            projectId = _projectId;
        },
        GET_USER: function ( req, res, next ) {
            var user = getName( req, res, next );
            user.email = getEmail( req, res, next, true );
            user.userRights = getUserRights( req, res, next, true );

            req.sendResponse({ user: user });
        },
        DELETE_PROJECT: function () {
            var user = getUser();
            var index = findIndex( getProjects(), 'project', projectId);
            if (index == -1) {
                return
                //ERROR HANDLING
            }

            getProjects().splice(index, 1);

            return
        },
        SAVE: function(){
            getUser().save( function( err ){

                if( err ){
                    err.logger = { msg: { internal: 'SESSION: delete project - delete project in user object failed ', id: 10003 } };
                    return callback( err );
                }

                return
            });
        }
    }
}();

module.exports = User;
