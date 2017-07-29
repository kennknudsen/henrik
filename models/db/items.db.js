'use strict';

var mongoose = require('mongoose');
var mongoose_con = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TextSchema = new mongoose.Schema({
    selected: String,
    non_selected: String,
    option: String
});

var OtherSchema = new mongoose.Schema({
    type: Number
});

var itemsSchema = mongoose.Schema({

    id: Number,
    text: TextSchema,
    type: String,
    room: [],
    parent: [],                           //SKAL VI LIGE LAVE OM TIL OBJECT
    grandParent: [],                      //SKAL VI LIGE LAVE OM TIL OBJECT
    section: Boolean,
    required: Boolean,
    other: OtherSchema,
    length: Number,
    help: String
});


module.exports = mongoose_con.model('Items', itemsSchema);