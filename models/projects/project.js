'use strict';

var async = require("async");
var _ = require('lodash');

var path = require('path');
var appDir = path.dirname(require.main.filename);
var env = process.env.NODE_ENV || 'development';
if(env == "production"){
    appDir = appDir + "/repo";
}

var Input = require( path.join( appDir, '../models/global/input' ) );
var Global = require( path.join( appDir, '../models/global/global' ) );
var Projects_DB = require( path.join( appDir, '../models/db/projects.db' ) );


var Project = function() {
    var user, inputData = {};

    var setUserProject = function( req, res, next ){
        user = new User( req, res, next );
        user.SET_PROJECT_ID( inputData.projectId );
    };
    var deleteProjectFromDB = function( callback ){
        Projects_DB.findByIdAndRemove( inputData.projectId, function( err ) {
            if ( err ) {
                err.logger({ msg: { internal: 'Moongose: delete project - delete project failed' }, id: 10002, project: inputData.projectId } );
                return next( err )
            }

            callback( null, true );
        });
    };
    var deleteProjectFromUserObject = function( callback ){
        user.DELETE_PROJECT();
        user.SAVE();
        callback( null, true );
    };

    var getInput = function( req, res, next, pram, variable, optional ){
        var getInput = function( callback ){
            Input[pram]( req, res, callback, optional )
        };

        async.parallel([
                getInput
            ],
            function( err, results ) {
                inputData[variable] = results[0];
                next();
            });
    };
    var find = function( req, res, next ){
        Projects_DB.findById( inputData.projectId, function( err, doc ) {
            req.handleError( err, { msg: { internal: 'Moongose: get project - search project failed ', id: 10004, project: inputData.projectId } } );
            next( null, doc )
        });
    };

    return {
        SET_PROJECT_ID: function( req, res, next ) {
            getInput( req, res, next, 'GET_PROJECT_ID', 'projectId' );
        },
        SET_RESPONSE_ID: function( req, res, next ) {
            getInput( req, res, next, 'GET_RESPONSE_ID', 'responseId' );
        },
        SET_ROOM: function( req, res, next ) {
            getInput( req, res, next, 'GET_ROOM', 'room' );
        },
        SET_PROJECT_ADDRESS: function( req, res, next ) {
            getInput( req, res, next, 'GET_ADDRESS', 'address' );
        },
        SET_PROJECT_ADDRESS_OPT: function( req, res, next ) {
            getInput( req, res, next, 'GET_ADDRESS', 'address', true );
        },
        SET_PROJECT_ZIP: function( req, res, next ) {
            getInput( req, res, next, 'GET_ZIP', 'zip' );
        },
        SET_PROJECT_ZIP_OPT: function( req, res, next ) {
            getInput( req, res, next, 'GET_ZIP', 'zip', true );
        },
        SET_PROJECT_CITY: function( req, res, next ) {
            getInput( req, res, next, 'GET_CITY', 'city' );
        },
        SET_PROJECT_CITY_OPT: function( req, res, next ) {
            getInput( req, res, next, 'GET_CITY', 'city', true );
        },
        SET_PROJECT_RESPONSE: function( req, res, next ) {
            getInput( req, res, next, 'GET_RESPONSE', 'response' );
        },
        PROJECT_IS_IN_USER_OBJECT: function( req, res, next ){
            var index = Global.FIND_INDEX( req.session.user.projects, 'project', inputData.projectId );

            if( index == -1 ) {
                req.send404( "Det valgte projekt kunne ikke findes - prøv igen" );
                return;
            }

            next();
        },
        GET: function (req, res, next) {
            var callback = function( err, doc ){
                req.sendResponse({ project: doc });
            };

            find( req, res, callback );
        },
        GET_WORKPAPER: function (req, res, next) {
            var callback = function( err, project ){
                req.results = { project: project };
                next();
            };

            find( req, res, callback );
        },
        GET_RESPONSES: function (req, res, next) {
            var room = inputData.room === "rooms" ? undefined : inputData.room;

            var request;
            if( !room ) {
                request = { _id: inputData.projectId, 'responses.question': inputData.responseId  };
            }else{
                request = { _id: inputData.projectId, responses: { $elemMatch: { question: inputData.responseId, room: room } } };
            }

            Projects_DB.findOne( request, { 'responses.$': 1 }, function( err, doc ) {

                req.handleError( err, { msg: { internal: 'Moongose: get project - search project failed ', id: 10004, project: inputData.projectId } } );
                var response = [];
                if( doc ){
                    response = doc.responses[0].answer;
                }
                req.sendResponse({ response: response });
            });
        },
        POST_RESPONSES: function (req, res, next) {
            var id = inputData.projectId;
            var question = inputData.responseId;
            var room = inputData.room === "undefined" ? undefined : inputData.room;

            var updateObj = { $set : { 'responses.$.answer': inputData.response }, new: true, upsert: true };
            Projects_DB.findOneAndUpdate( { _id: id, responses: { $elemMatch: { question: question, room: room } } }, updateObj, { new: true },  function( err, doc ) {

                req.handleError( err, { msg: { internal: 'Moongose: update response - search resposne failed ', id: 10006, project: id, updateObj: updateObj } } );

                if( doc === null ) {
                    Projects_DB.findOneAndUpdate( { _id: inputData.projectId }, { $push: { responses: { question: question, 'room': room, answer: inputData.response } } }, { new: true }, function( err, doc ) {
                        req.handleError( err, { msg: { internal: 'Moongose: push response - search response failed ', id: 10007, project: inputData.projectId } } );
                        req.sendResponse({ response: doc });
                    });
                }else{
                    req.sendResponse({ project: doc });
                }
            });
        },
        PUT: function (req, res, next) {

            var updateObj = { address: {} };
            var field = ['address', 'zip', 'city'];
            var id = inputData.projectId;

            /*GLOBAL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            _.each(field, function(f){
                if( inputData[f] ) { updateObj.address[f] = inputData[f] }
            });

            Projects_DB.findByIdAndUpdate(id, updateObj, { new: true }, function( err, doc ) {
                req.handleError( err, { msg: { internal: 'Moongose: update project - search project failed ', id: 10005, project: id, updateObj: updateObj } } );
                req.sendResponse({ project: doc });
            });
        },
        /*PUT_RESPONSE: function (req, res, next) {
            var updateObj = { responses: { answer: inputData.response, question: inputData.responseId } };

            Projects_DB.findOneAndUpdate( { _id: inputData.projectId, 'responses.question': inputData.responseId }, updateObj, { 'responses.$': 1, new: true }, function( err, doc ) {
                req.handleError( err, { msg: { internal: 'Moongose: update response - search resposne failed ', id: 10006, project: id, updateObj: updateObj } } );
                req.sendResponse({ project: doc });
            });
        },*/
        DELETE: function( req, res, next ) {
            setUserProject();

            async.parallel([
                deleteProjectFromDB,
                deleteProjectFromUserObject
            ],
            function( err, results ) {
                req.handleError( err, { msg: { internal: 'ASYNC: Flow error', id: 10005, project: inputData.projectId } } );
                req.logUserActivity({ id: 10001, action: req.__('log_projects_deletedProject'), userId: req.session.user._id });
                req.sendResponse({projectId: inputData.projectId});
            });
        },
        DELETE_RESPONSE: function( req, res, next ) {
            Projects_DB.findByIdAndUpdate( inputData.projectId, { $pull: { responses: { question: inputData.responseId } } }, { new: true }, function( err, doc ) {
                req.handleError( err, { msg: { internal: 'Moongose: delete response - search response failed ', id: 10007, project: inputData.projectId } } );
                req.sendResponse({ response: doc });
            });
        }
    }
}();

module.exports = Project;