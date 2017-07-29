'use strict';

var mongoose = require('mongoose');
var mongoose_con = require('./db');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var commentSchema = new mongoose.Schema({
    advice: ObjectId,
    title: String,
    comment: String
});

var projectSchema = new mongoose.Schema({
    project: ObjectId,
    notViewed: Boolean,
    new: Boolean,
    title: String
});

var userSchema = mongoose.Schema({
    userRights: Number,
    name: {
        firstName: String,
        lastName: String
    },
    local           : {
        username    : { type: String, required: true, unique: true },
        password    : { type: String, required: true }
    },
    projects        : [projectSchema]
    //comments            : [commentSchema],
    //files            : [],
    //rooms            : [roomSchema]
});

// methods ======================
// generating a hash
/*userSchema.methods.generateHash = function( password ) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.generateEmailToken = function( email ) {
    var uuid = bcrypt.hashSync(email, bcrypt.genSaltSync(10), null);
    return base64.encode(uuid);
};
*/

module.exports = mongoose_con.model('User', userSchema);