const req = require('express/lib/request');
const mongoose = require('mongoose');

const PlugOrdersSchema = new mongoose.Schema({
    
});

const PlugOrders = mongoose.model('plugOrders', PlugOrdersSchema);
module.exports = PlugOrders;