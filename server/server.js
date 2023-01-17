require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const MONGO_URI = 'mongodb+srv://studyspot:studiousmoles@cluster0.6h0gbc8.mongodb.net/?retryWrites=true&w=majority';
console.log(process.env.MONGO_URI);
mongoose 
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'coffeeShopReviews'
  })
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.log(err));


// statically serve static files and serve root directory index.html only in production mode
if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.join(__dirname, '../dist')));
    app.get('/', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
    });
}

// require routers
const routerUser = require('./routes/users');
const routerCoffee = require('./routes/coffee');

// define route handlers
app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/user', routerUser);
app.use('/coffee', routerCoffee);


// catch-all error handler
app.use((req, res) => res.status(404).send('Page not found'));

// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Global error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred caught in global error handler' }
    };
    const errObj = Object.assign({}, defaultErr, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}...`)});
module.exports = app;