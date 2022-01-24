const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: Number
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;