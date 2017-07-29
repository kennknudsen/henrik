'use stict';

var UserLog = require("./../db/user_log");
var logger = require("./logging");

var userActivity = function(req, res, next){
    //USERID
    //http://stackoverflow.com/questions/18763417/compound-js-log-users-actions

    req.logUserActivity = function( obj ){
        //http://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
        //https://docs.mongodb.com/v3.2/reference/method/db.collection.findOneAndUpdate/
        //http://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
        
        var user = obj.userId ? obj.userId : req.session.passport.user;

        UserLog.findOneAndUpdate( { userId: user }, { $push: { actions: { id: obj.id, action: obj.action } } }, { upsert: true, new: true }, function( err, doc ){
            if(err){
                logger.warn( 'User activity error', { error: err } );
                console.log( err );
            }
            return;
        });
    };

    next();
};

module.exports = userActivity;

/*********************************
 * LIST OF LOGS:
 * 1001: New user registered
 * 1101: User confirmed Email
 * 1201: User confirmed Email
 *
 * 2001: Logged into the system in connection with signup (autologin)
 * 2002: Tried to login - username not found
 * 2003: Tried to login - password not matched with user
 * 2004: Logged into the system
 */