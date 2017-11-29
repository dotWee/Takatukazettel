var mongoose = require('mongoose');

var Item = mongoose.model('Item', {
    title: String,
    user: String,
});