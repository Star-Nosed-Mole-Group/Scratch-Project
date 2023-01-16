const path = require('path');
const express = require('express');
const app = express.Router();
const coffeeController = require('../controllers/coffeeController');

//i need help on figuring out the routes and what controllers should flow together

//user sets criteria and sends get request to see filtered coffeeshops
app.get('/', coffeeController.searchShopsByCriteria, (req, res) => { 
    res.status(200).json(res.locals.readShops) //depending on the middleware, is this the correct corresponding response?
})

app.get('/', coffeeController.searchShopsByName, (req, res) => {
    res.status(200).json(res.locals.readShops)
})

//intuitively should this endpoint be something like /shops?
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