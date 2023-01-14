const db = require('../sqlconnection.js')
/**
 *   Information that we are receiving from the front-end (req.body):
 *   
 *   quality of meals (1 - 5)
 *   quality of drinks (1 - 5)
 *   space availability (1 - 5)
 *   parking availability (1 - 5)
 *   sound (1-5)
 *   wifi (1-5)
 * 
 *   has an outlet
 *   * ** ***  ->  * = 1 outlet , ** = 2 outlets, *** = 3 or more outlets
 * 
 * */

const coffeeController = {};


coffeeController.readCoffeeShops = (req, res, next) => {
    const { quality_meals, quality_drinks, space, sound, outlets, parking, wifi } = req.body;
    const array = [quality_meals, quality_drinks, space, sound, outlets, parking, wifi];
    const selectShops = `SELECT * FROM spots 
                  WHERE food >= $1 
                  AND drinks >= $2
                  AND space >= $3
                  AND sound >= $4
                  AND outlets >= $5
                  AND parking >= $6
                  AND wifi >= $7`;

    db.query(selectShops, array)
      .then(response => {
        res.locals.readShops = response.rows;
        console.log(response.rows);
        return next();
      })
      .catch(err => {
        return next({
            log: 'an error occurred in coffeeController.readCoffeeShops middleware',
            message: {err: 'an error occurred when reading shops in coffeeController.readCoffeeShops'}
        })
      })
    

}


coffeeController.readReview = (req, res, next) => {
  const text = 'SELECT * FROM spots'
  db.query(text)
  .then((response) => {
    res.locals.reviews = response.rows
    console.log('Got values!!');
    return next()
  })
  .catch((err) => {
    return next({
        log: 'coffeeController.readReview error',
        message: {err: 'cannot read reviews'}
    })
  })
}

coffeeController.addReview = (req, res, next) => {
  const { name, quality_meals, quality_drinks, space, sound, outlets, parking, wifi } = req.body;
  const text = 'INSERT INTO spots (name, food, drinks, space, sound, outlets, parking, wifi) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
  const values = [name, quality_meals, quality_drinks, space, sound, outlets, parking, wifi]
};

coffeeController.delReview = {};

coffeeController.updateReview = {};


// ALTER TABLE spots
// ADD COLUMN name data_type VARCHAR;

// CREATE TABLE spots (
//     _id SERIAL PRIMARY KEY,
//     name VARCHAR(50),
//     food INTEGER,
//     drinks INTEGER,
//     space INTEGER, 
//     sound INTEGER,
//     outlets INTEGER,
//     parking INTEGER,
//     wifi INTEGER
//  )
    
//     CREATE TABLE users (
//         _id SERIAL PRIMARY KEY,
//         username VARCHAR(50) NOT NULL,
//         password VARCHAR(50)
//     )
    
//     SELECT * FROM users
    
//     INSERT INTO users (username, password)
//     VALUES ('mark!@#123', 'jaden$%^123')
    
//     DROP TABLE spots
    
//     INSERT INTO spots (food, drinks, space, sound, outlets, parking, wifi)
//     VALUES (5, 3, 4, 1, 2, 4, 3)




module.exports = coffeeController;