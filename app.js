var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var browserify = require('browserify-middleware');
var helmet = require('helmet');
var i18n = require('i18n');
var User = require("./models/db/user.db");
var _ = require("lodash");

var app = express();
app.use(helmet());

// SKAL NOK VÆRE SCRIPTS ISTEDET????????????????????????????????????? GET LOGO PATH
app.use(function( req, res, next ) {
    req.settings = {
        global: {
            logo: {
                base: "images/logo/logo_noBack_white.png"
            }
        }
    };

    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/***************************
 * JS BUNDLE
 */
app.use('/js/bundle.js', browserify('./libs/js/bundle.js', {
    insertGlobals: true
}));

/***************************
 * SESSION (BEFORE PASSPORT)
 */
var MemoryStore = expressSession.MemoryStore;
app.use(expressSession({
    name: 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true
}));

/***************************
 * LANGUAGE - i18n
 */
i18n.configure({
    locales: ['de','en','da'],
    cookie: 'locale',
    directory: __dirname + '/locales',
    // enable object notation
    objectNotation: true
});

app.use(i18n.init);
i18n.setLocale('da');

/***************************
 * PASSPORT
 */
app.use( passport.initialize() );
app.use( passport.session() );
var initPassport = require('./models/passport/init');
initPassport( passport );

var isAuthenticated = function ( req, res, next ) {

    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    req.session.test = true;

    if ( req.isAuthenticated() )
        return next();
    // if the user is not authenticated then redirect him to the login page

    // IF PRODUCTION
    //res.redirect("http://localhost:3000/login");
};
//app.use(isAuthenticated);


/***************************
 * FIND USER
 */
app.use(function( req, res, next ) {
    // TJEK SESSSION FØRST
    // passport: { user: '58f349580bce0705607a3f46' } }
    //var userId = "5967c7ebf36d2830a5bf4718";

    console.log("USERID", req.session.userId)

    if( req.session.userId ) {
        User.findById( req.session.userId, function ( err, user ) {


            req.session.user = user;
            console.log( "USER 2", req.session.user.save() );

            next()
        });
    }else{
        next()
    }
});


/***************************
 * LOG USER ACTIVITY
 */
var userActivity = require("./models/logging/userActivity");
app.use( userActivity );

/***************************
 * LOG ERRORS
 */
var logger = require('./models/logging/logging');
app.use( morgan("combined", { "stream": logger.stream }) );

setInterval( logger.checkLog, 900000 );

/***************************
 * RESPONSE
 */

app.use(
    function(req, res, next) {
        req.handleError = function (err, logger) {
            if (err) {
                req.error = true;
                if (logger) {
                    err.logger = logger;
                }
                next( err );
            }
        };

        req.send404 = function ( msg ) {
            res.status(404).json({
                success: false,
                msg: msg
            });
        };

        next();
    }
);

app.use(
    function(req, res, next){
        req.sendResponse = function( response ){

            if( !req.error ) {
                var success = {
                    success: true
                };
                var obj = _.merge(success, response);

                res.json(obj);
            }
        };

        next();
    }
);


/***************************
 * VALIDATION
 */
app.use( expressValidator({
  /*customValidators: {
   inSubscriptions: function( subscription, req ) {
   return _.findIndex(req.settings.subscriptions.all, { value: parseInt( subscription ) }) > -1 ? true : false;
   }
   }*/
}));

/***************************
 * ROUTES
 */
var items = require('./routes/items.routes');
var projects = require('./routes/projects.routes');
var global = require('./routes/global.routes');
var routes = require('./routes/index');
app.use('/api', global);
app.use('/api/items', items);
app.use('/api/projects', projects);
app.use('/', routes);



/* UNCAUGHT EXCEPTION */
process.on('unhandledRejection', function( reason, promise ) {
    console.log("Unhandled Rejection at: Promise ", promise, " reason: ", reason);
    //var log = log4js.getLogger( "uncaughtException" );
    //log.fatal( { type: "unhandledRejection", reason: reason, promise: p } );
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("TEST");
        console.log( err );
        if( err.logger ){
            logger.error( err.logger.msg.internal, { id: err.logger.id, project: err.logger.project, updateObj: err.logger.updateObj } );
        }


        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;