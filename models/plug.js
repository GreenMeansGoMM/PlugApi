const mongoose = require("mongoose");
var crypto = require('crypto');

const PostSchema = new mongoose.Schema({
    name: {type:String, required:true},
    image: String,
    description: String,
    keywords: String,
    origin: String,
    dispensary: String,
    price: Number,
    comments: [{ text: String, date: {type:String, default: new Date()} }],
    reviews: [{text: String, username: String, rating: Number,  date: {type:String, default: new Date()}}]
});



const Post = mongoose.model('plugPost', PostSchema);
module.exports = Post;
