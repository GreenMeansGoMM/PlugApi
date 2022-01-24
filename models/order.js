const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type: String, required: true},
    adress: {type: String, required:true},
    quantity: {type: Number, required: true},
    cost: {type: Number, required: true},
    product: {type: String, required:true},
    deliveryPerson: {type: String},
    date:{type: String, default: new Date()}


});

const Order = mongoose.model('plugOrder', OrderSchema);
module.exports = Order;