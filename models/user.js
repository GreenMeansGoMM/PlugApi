const mongoose = require("mongoose");
var crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    phone: {type:String, required:true},
    age:{type:Number, required:true},
    order_history: [{quantity: Number, delivery_person: String, date: {type: String, default: new Date()}, default: []}],
    hash: String,
    salt: String

});
UserSchema.methods.setPassword = function(password){

    this.salt = crypto.randomBytes(16).toString(`hex`);

    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};
const User = mongoose.model('plugUser', UserSchema);
module.exports = User;