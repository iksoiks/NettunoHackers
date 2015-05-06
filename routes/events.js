var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/event');


router.get('/', function (req, res, next) {
    Event.find(function (err, events) {
        if (err)
            return next(err);
        res.json(events);
    });
});

router.post('/', function (req, res, next) {
    var event = new Event({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        price: req.body.price,
        link: req.body.link,
        from: req.body.from,
        to: req.body.to
    });

    event.save(function (err) {
        if (err) return res.json({error: err.message});

        res.json({message: 'Event successfully created.'});
    });
});

router.get('/:id', function (req, res, next) {
    Event.findOne({'id': req.param.id}, function (err, events) {
        if (err)
            return next(err);
        res.json(events);
    });
});

module.exports = router;