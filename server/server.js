const path = require('path');
const express = require('express');
const app = express();

//hi mark
//how is the wedding
// https://us06web.zoom.us/j/99228433727 (Passcode: expressjs)
//i'm there!!
//if you want to find us, we're in room 13

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;


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
app.use('/api/user', routerUser);
app.use('/api/coffee', routerCoffee);


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