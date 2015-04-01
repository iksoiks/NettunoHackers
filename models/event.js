var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    place: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    link: {
        type: String
    },
    datetime: {
        type: Date
        //required: true
    }
});

module.exports = mongoose.model('Event', EventSchema);