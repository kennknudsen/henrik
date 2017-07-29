var User = require('../db/user.db');

module.exports = function( passport ){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log("SERIALIZE")
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log("DESERIALIZE")
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    // login(passport);
    // signup(passport);
};