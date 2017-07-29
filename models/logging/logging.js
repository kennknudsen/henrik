/***************************
 * LOGGING
 * https://www.npmjs.com/package/winston
 * http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
 */
var winston = require('winston');
var logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.File)({
            filename: 'logs/exceptions.log',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            level: 'warn'    //On above code, transport level specified as warn. This means warn and above it (important level) will ve logs which are warn, debug and error. Less important levels will not be logged: silly and verbose.
        }),
        new (winston.transports.Console)({
            colorize: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
            //label: 'category one'
        })
    ]
});

logger.on('log', function (log) {
    //console.log("SEND EMAIL OR SOMETHING")
    // [msg] and [meta] have now been logged at [level] to [transport]
});
logger.on('logging', function (transport, level, msg, meta) {
    //console.log("SEND EMAIL OR SOMETHING")
    // [msg] and [meta] have now been logged at [level] to [transport]
});
logger.on('error', function ( err ) {
    console.log("SEND EMAIL OR SOMETHING 2")

    res.json({
        type: "error",
        err: err
    })
});

var sendEmail = function( errors ){
    var email = new sendgrid.Email();
    email.addTo( "kenn.knudsen@lesivo.dk" );
    email.setFrom("noreply@lesivo.dk");
    email.setFromName("Lesivo - FEJL API");
    email.setSubject( "FEJL I API - VIGTIG" );

    var html = "";

    for(var i = 0; i < errors.file.length; i++){
        html += JSON.stringify(errors.file[i]) + "<br>";
    }

    email.setHtml( html );
    sendgrid.send( email, function( err, json ) {
        if( err ){
            console.log( err );
            params.callback( err, null );
        }
        if( !err && json ){
            console.log( json );
            params.callback( err, 'done' );
        }
    });
};

//
// Find items logged between today and yesterday.
//
var checkLog = function () {
    var options = {
        from: new Date - 20 * 60 * 1000,
        until: new Date,
        limit: 10,
        start: 0,
        order: 'desc',
        fields: ['message']
    };
    logger.query(options, function (err, results) {
        if (err) {
            throw err;
        }

        if (results.file.length > 0) {
            console.log(results);
            //sendEmail( results )
        }
    });
};


//logger.info('CHILL WINSTON!', {seriously: true});

module.exports = logger;
module.exports.stream = {
    write: function( message, encoding ){
        logger.info(message);
    }
};
module.exports.checkLog = checkLog;

//http://masashi-k.blogspot.dk/2013/02/logger-for-socketio-save-it-into-redis.html
//module.exports = logger;
// logger = require('./logger.js'),
//https://gemfury.com/azuki-precise/deb:azk/-/content/usr/lib/azk/node_modules/winston/docs/transports.md#redis-transport

/*********************************
 * LIST OF ERRORS:
 * 100X: SIGNUP
 * 1001: type: model: handleUser - passport/signup.js
 * 1002: type: model: handleUser - passport/signup.js
 * 1003: type: model: handleUser - passport/signup.js
 *
 * 110X: CONFIRM EMAIL
 * 1101: type: route: GET: /confirmEmail/:token - login.route.js
 * 1102: type: route: GET: /confirmEmail/:token - login.route.js
 * 1103: type: route: GET: /confirmEmail/:token - login.route.js
 *
 * 120X: RESET PASSWORD
 * 1201: type: route: GET: /newPassword/:token - login.route.js
 * 1202: type: route: POST: /newPassword/:token - login.route.js
 * 1203: type: route: POST: /resetPassword - login.route.js
 * 1204: type: route: POST: /resetPassword - login.route.js
 * 1205: type: route: POST: /resetPassword - login.route.js
 *
 * 200X LOGIN
 * 2001: type: route: GET /autoSignIn - login.route.js
 *
 * 2002-D: development, type: model: local-login-token - passport/login.js
 * 2003-D: development, type: model: local-login-token - passport/login.js
 * 2004: type: model: local-login - passport/login.js
 * 2005: type: model: local-login - passport/login.js
 *
 * 
 * 900X Email
 * 9001: type: route: GET /autoSignIn - send.email.js
 */



