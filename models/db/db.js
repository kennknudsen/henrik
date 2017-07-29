var dbConfig = require('./config');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var connectionURL;

if ( env === 'development') {
    mongoose.set('debug', true);
    connectionURL = dbConfig.url;
}

if ( env === 'production') {
    connectionURL = dbConfig.url;
}

var con = mongoose.createConnection( connectionURL, function( err ) {
    if (err) {
        console.log("Not connected - data");
        console.log(err);
    } else {
        console.log('Connected - data');
    }
});

mongoose.connection.on('error', function(err) {
    if (err) {
        console.log("ERROR - data");
        console.err( err + ": DATA");
    } else {
        console.log('Connected');
    }
});

module.exports = exports = con;