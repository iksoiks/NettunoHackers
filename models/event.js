var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    link: {
        type: String
    },
    from: {
        type: Date,
        required: true
    },
    to: { // TODO from < to
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Event', EventSchema);