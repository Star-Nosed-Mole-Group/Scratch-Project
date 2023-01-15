const path = require('path');
const express = require('express');
const app = express.Router();
const coffeeController = require('../controllers/coffeeController');

//user sets criteria and sends get request to see filtered coffeeshops
app.get('/', coffeeController.readCoffeeShops, (req, res) => { 
    res.status(200).json(res.locals.readShops)
})

app.get('/reviews', coffeeController.readReviews, (req, res) => {
    res.status(200).json(res.locals.reviews)
})

app.post('/addreview', coffeeController.addReview, coffeeController.updateAve, coffeeController.readReviews, (req, res) => { 
    res.status(200).json(res.locals.reviews)
})

app.delete('/deletereview', coffeeController.deleteReview, coffeeController.updateAve, coffeeController.readReviews, (req, res) => {
    res.status(200).json(res.locals.reviews)
})

app.patch('/updatereview', coffeeController.updateReview, coffeeController.updateAve, coffeeController.readReviews, (req, res) => {
    res.status(200).json(res.locals.reviews)
})



module.exports = app;