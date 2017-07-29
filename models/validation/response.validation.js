'use strict';

var _ = require("lodash");
//var logger = require('./../logging/logging');

var validationResponse = {
    JSON: function (req, res, next) {
        req.getValidationResult().then(function ( result ) {
            req.validation = {};
            req.validation.errors = result.useFirstErrorOnly().mapped();   //.array()
            req.validation.errorsFound = !_.isEmpty(req.validation.errors);

            if( !_.isEmpty( req.validationErrors )){
                logger.warn( 'Validation error', { validationErrors: req.validationErrors } );
            }

            if( req.validation.errorsFound ) {
                return res.json({
                    errors: req.validation.errors
                })
            }else{
                next();
            }
        });
    },
    GET: function (req, res, next) {
        req.getValidationResult().then(function (result) {
            req.validation = {};
            req.validation.errors = result.useFirstErrorOnly().mapped();   //.array()
            req.validation.errorsFound = !_.isEmpty(req.validation.errors);

            next();
        });
    }
};

module.exports = validationResponse;