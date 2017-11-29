var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title: String,
    user: String,
});

var Item = mongoose.model('Item', itemSchema);