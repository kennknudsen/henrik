'use strict';

var mongoose = require('mongoose');
var mongoose_con = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/*
var commentSchema = new mongoose.Schema({
    advice: ObjectId,
    title: String,
    comment: String
});*/

var answerSchema = new mongoose.Schema({
    room: String,
    id: String,
    value: Boolean
});

var responseSchema = new mongoose.Schema({
    rooms: Boolean,
    parent: String,
    question: ObjectId,
    room: String,
    answer: [ answerSchema ]
});

var projectSchema = mongoose.Schema({

    title: String,
    owner: {
        firstName: String,
        lastName: String
    },
    address: {
        address: String,
        zip: Number,
        city: String
    },
    description: String,
    responses: [responseSchema],
    started: Boolean,
    sent: Boolean,
    ended: Boolean  // BY CUSTOMER - BY HÅNDVÆRKER IS NO THE HÅNDVÆRKER OBJECT
});


module.exports = mongoose_con.model('Project', projectSchema);