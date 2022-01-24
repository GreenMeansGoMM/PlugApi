const req = require("express/lib/request");
const mongoose = require('mongoose');

const Plug = require('../models/plug');
const PlugUser = require('../models/user');
const Order = require('../models/order');
const { json } = require("body-parser");
const Stock = require('../models/stock');
const User = require("../models/user");

const newPost = (req, res, next) =>{
    Plug.findOne({name: req.body.name }, (err, data) =>{

        if (!data){
            
            const newPost = new Plug({
                name:req.body.name,
                image:req.body.image,
                description:req.body.description,
                keywords:req.body.keywords,
                origin:req.body.keywords,
                dispensary:req.body.dispensary,
                price:req.body.price,
                quantity:req.body.quantity
            })
            
            newPost.save((err, data)=>{
                if(err) return res.json({Error: err});
                
                const newStock = new Stock({
                    name:req.body.name,
                    id: data._id,
                    quantity: data.quantity
                })
                newStock.save((err, data)=>{
                    if(err) console.log('Error');
                    return res.json(data);
                })
                //return res.json(data);
            })
            
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Post already exists"});
        }
    });
};
//Used to add quantity to a product
const updateQuanity = (req, res) =>{
    let name = req.body.name;
    let quantity = req.body.quantity;
    let id = req.params.id;
    
    Stock.findOne({name:name}, (err, data) =>{
        if (err || !data){
            return res.json({message: "Could not find the product you were looking for."});
        }
        else{ 
            //return res.json(quantity);
            Stock.findByIdAndUpdate({_id:id}, {$inc: {"quantity" : quantity}} , (err, data) =>{
                if (err || !data){
                    return res.json({message: `Could not find the ID ${err}`});
                }
                else{
                    return res.json(data);
                }
            });
        }
        });
    
       
    

};

const getAllPosts = (req, res, next) => {
    Plug.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    });
};
//Only used for deleting all posts in a dispensary
const deleteAllPosts = (req, res, next) => {
    res.json({message: "DELETE all posts"});
};

const getOnePost = (req, res) => {
    let name = req.params.name;

    Plug.findOne({name:name}, (err, data) =>{
        if (err || !data){
            return res.json({message: "Could not find the product you were looking for."});
        }
        else {
            return res.json(data)};
    });
};



const deleteOnePost = (req, res, next) => {
    res.json({message: "DELETE a post"});
};
const newReview = (req, res) => {
    let name = req.params.name; //get the tea to add the comment in
    let newReview = req.body.review; //get the comment
    //create a comment object to push
    const review = {
        text: newReview,
        date: new Date()
    }
    //find the tea object
    Plug.findOne({name:name}, (err, data) => {
        if(err || !data || !newReview) {
            return res.json({message: "Tea doesn't exist."});
        }
        else {
            //add comment to comments array of the tea object
            data.reviews.push(review);
            //save changes to db
            data.save(err => {
                if (err) { 
                return res.json({message: "Review failed to add.", error:err});
                }
                return res.json(data);
            })  
        } 
    });
  };
const newUser = (req, res, next) =>{
    
    let newUser = new PlugUser();

    newUser.username = req.body.username,
    newUser.email = req.body.email,
    newUser.firstName = req.body.firstName,
    newUser.lastName = req.body.lastName,
    newUser.phone = req.body.phone,
    newUser.age = req.body.age,
    newUser.password = req.body.password
        newUser.setPassword(req.body.password);

    newUser.save((err, newUser) =>{
        if(err){
            return res.status(400).send({
                message: "Failed to add user."
            });
        }
        else{
            return res.status(201).send({
                message: "User added succesfully."
            });
        }
    });
};
const logIn = (req, res) => {
    PlugUser.findOne({email : req.body.email },'username salt hash', function(err, user){
        if (user === null){
            return res.status(400).send({
                message: "User not found."
            });
        }
        else{
            if (user.validPassword(req.body.password)){
                return res.status(201).send({
                    message: "User Logged In.",
                })
            }
            else{
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });

};
const newOrder = (req, res) => {
    let username = req.body.username;
    let name = req.body.name;
    let quantity = req.body.quantity;
    
    let newOrder = new Order({
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    adress: req.body.adress,
    quantity: req.body.quantity,
    cost: req.body.cost,
    product: req.body.product,
    deliveryPerson: req.body.deliveryPerson,
    date: req.body.date

    })
    
    let id = req.params.id;
    
    Stock.findOne({name:name}, (err, data) =>{
        if (err || !data){
            return res.json({message: "Could not find the product you were looking for."});
        }
        else{ 
            //return res.json(quantity);
            Stock.findByIdAndUpdate({_id:id}, {$inc: {"quantity" : 0 - quantity}} , (err, data) =>{
                if (err || !data){
                    return res.json({message: `Could not find the ID ${err}`});
                }
                else{
                    User.findOne({username:username}, (err, data) =>{
                        if (err || !data){
                            return res.json(`${err}`);
                        }
                        else{
                            data.order_history.push(newOrder);
                            data.save(err =>{
                                if (err){
                                    return res.json({message: "Review failed to add.", error:err});
                                }
                                else{
                                    return res.json(data);
                                }
                            })
                        }
                    })
                }
            });
        }
        });
    

};
module.exports = {
    newPost,
    updateQuanity,
    getAllPosts,
    deleteAllPosts,
    getOnePost,
    deleteOnePost,
    newReview,
    newUser,
    logIn,
    newOrder



};