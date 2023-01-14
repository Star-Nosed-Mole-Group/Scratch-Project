const path = require('path');
const express = require('express');
const app = express.Router();
const coffeeController = require('../controllers/coffeeController');


app.post('/coffee', (req, res) => { 
    res.status(200).json({})
})