const path = require('path');
const express = require('express');
const app = express.Router();
const authController = require('../controllers/authController');


app.post('/sign', authController.createUser, (req, res) => { 
    res.status(200).json({})
})

