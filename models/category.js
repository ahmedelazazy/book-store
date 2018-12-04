var mongoose = require('../db/mongoose');

var schema = new mongoose.Schema({
    title: String
});
var model = mongoose.model('Category', schema);

module.exports = model;
