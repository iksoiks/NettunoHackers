var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/nettunoHackersdb2');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

var port = 3000;
//var router = require('./routes/index');

//app.use('/api', router);
app.use('/api/events', require('./routes/events'));
app.use('/api/categories', require('./routes/categories'));

app.listen(port);
console.log('Server on port: ' + port);