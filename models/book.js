var mongoose = require('../db/mongoose');

var schema = new mongoose.Schema({
    title: String,
    category: String,
    publisher: String,
    author: String,
    price: Number,
    description: String,
    cover: String
});
var model = mongoose.model('Book', schema);

module.exports = model;
