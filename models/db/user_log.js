'use strict';

var moment   = require('moment');

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// define the schema for our user model
var userSchema = mongoose.Schema({
    userId: ObjectId,
    actions: [{ id: Number, action: String, time: { type: Date, default: moment() } }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('UserLog', userSchema);