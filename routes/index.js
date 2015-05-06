var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Event = require('../models/event');


router.use(function (req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

router.get('/', function (req, res, next) {
    res.json({message: 'Olè'});
});

router.get('/user', function (req, res) {
    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
});

router.get('/event', function (req, res) {
    Event.find(function (err, events) {
        if (err)
            res.send(err);

        res.json(events);
    });
});

router.post('/user', function (req, res) {
    var user = new User({
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        image: req.body.image,
        address: req.body.address,
        telephone: req.body.telephone,
        email: req.body.email
    });

    user.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'User successfully created.'});
    })
});

router.post('/event', function (req, res) {
    console.log("prova");
    var event = new Event({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        price: req.body.price,
        link: req.body.link,
        datetime: req.body.datetime
    });

    event.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'User successfully created.'});
    })
});

module.exports = router;