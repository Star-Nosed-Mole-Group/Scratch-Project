const path = require('path');
const express = require('express');
const app = express.Router();
const coffeeController = require('../controllers/coffeeController');


app.get('/', coffeeController.readCoffeeShops, (req, res) => { 
    res.status(200).json(res.locals.readShops)
})

app.post('/addreview', coffeeController.addReview, (req, res) => { 
    res.status(200).json({})
})

console.log('hello')
module.exports = app;