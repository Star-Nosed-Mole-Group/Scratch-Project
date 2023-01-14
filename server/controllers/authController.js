const db = require('../sqlconnection.js')

authController = {};

authController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  
  const query = `INSERT INTO users (username, password) VALUES ($1, $2)`;
  const array = [username, password];
  db.query(query, array)
    .then(response => {
      console.log('query responded'); 
      return next();
    })
    .catch(e => next({
        log: 'Error occured at authController.createUser middleware',
        message: { err: 'Unable to create new user'}
    }))
}

authController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = `SELECT password from users WHERE username=${username}`;
  db.query(query)
    .then(response => {
      console.log(response);
      if(response !== password) return next({
        log: 'Error at authController.verifyUser - incorrect password',
        message: {err: 'Username and password do not match'}
      })
      return next();
    })
    .catch(e => next({
      log: 'Error at authController.verifyUser',
      message: { err: 'Sign-in unsuccessful. Please try again.'}
    }))
}





module.exports = authController;
