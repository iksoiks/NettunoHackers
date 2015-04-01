var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String
        //required: true
    },
    surname: {
        type: String
        //required: true
    },
    password: {
        type: String
        //required: true
    },
    image: {
        type: String
    },
    address: {
        type: String
        //required: true
    },
    telephone: {
        type: String
    },
    email: {
        type: String
        //required: true
    }
});

module.exports = mongoose.model('User', UserSchema);