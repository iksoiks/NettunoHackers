var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category');


router.get('/', function (req, res, next) {
    Category.find(function (err, events) {
        if (err)
            return next(err);
        res.json(events);
    });
});

router.post('/', function (req, res, next) {
    var category = new Category({
        name: req.body.name
    });

    category.save(function (err) {
        if (err) return res.json({error: err.message});

        res.json({message: 'Category successfully created.'});
    })
});


module.exports = router;