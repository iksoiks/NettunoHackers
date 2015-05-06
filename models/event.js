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
    to: {
        type: Date,
        required: true
    }
});

EventSchema.pre('validate', function (next) {
    if (this.from.getTime() < this.to.getTime()) {
        next();
    } else {
        next(new Error('End Date (`from`) must be greater than Start Date (`to`)'));
    }
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;