'use strict';

var schema_id = require("./schema/id.schema.validation");
var schema_room = require("./schema/id.schema.validation");
var schema_address = require("./schema/address.schema.validation");
var schema_zip = require("./schema/zip.schema.validation");
var schema_city = require("./schema/city.schema.validation");
var schema_response = require("./schema/response.schema.validation");
//var schema_name = require("./schema/name.schema.validation");
//var schema_email = require("./schema/email.schema.validation");

var validate = {
    PROJECT_ID: function( req, res, next ) {
        req.check({ 'projectId': schema_id });
        next();
    },
    RESPONSE_ID: function( req, res, next ) {
        req.check({ 'responseId': schema_id });
        next();
    },
    ROOM: function( req, res, next ) {
        req.check({ 'room': schema_room });
        next();
    },
    ADDRESS: function( req, res, next ) {
        req.check({ 'address': schema_address });
        next();
    },
    ZIP: function( req, res, next ) {
        req.check({ 'zip': schema_zip });
        next();
    },
    CITY: function( req, res, next ) {
        req.check({ 'city': schema_city });
        next();
    },
    RESPONSE: function( req, res, next ) {
        req.check({ 'response': schema_response });
        next();
    }
    /*
    ID: function( req, res, next ) {
        req.check({ 'id': schema_id });
        next();
    },
    COMPANY_ID: function( req, res, next ) {
        req.check({ 'companyId': schema_id });
        next();
    },
    USER_ID: function( req, res, next ) {
        req.check({ 'userId': schema_id });
        next();
    },
    FIRST_NAME: function( req, res, next ) {
        req.check({ 'firstName': schema_name });
        next();
    },
    LAST_NAME: function( req, res, next ) {
        req.check({ 'lastName': schema_name });
        next();
    },
    EMAIL: function( req, res, next ) {
        req.check({ 'email': schema_email });
        next();
    }
    */
};

module.exports = validate;