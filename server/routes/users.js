const path = require('path');
const express = require('express');
const app = express.Router();
const authController = require('../controllers/authController');


app.post('/signup', authController.createUser, (req, res) => { 
    res.sendStatus(200);
})

app.get('/login', authController.verifyUser, (req, res) => { 
    res.status(200).json({})
})


module.exports = app;