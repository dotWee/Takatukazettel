var mongoose = require('mongoose');

module.exports = mongoose.model('Item', {
    title: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        default: ''
    }
});