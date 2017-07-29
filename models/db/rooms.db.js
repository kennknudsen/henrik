'use strict';

var mongoose = require('mongoose');
var mongoose_con = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var roomSchema = mongoose.Schema({
    roomId: String,
    title: String
});

module.exports = mongoose_con.model('Room', roomSchema);