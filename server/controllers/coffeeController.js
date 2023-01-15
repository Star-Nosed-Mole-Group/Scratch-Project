const db = require('../sqlconnection.js')
const Reviews = require('../models/reviewsModel');

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


//controller for searching for coffeeshops by selected criteria
coffeeController.readCoffeeShops = (req, res, next) => {
    const { quality_meals, quality_drinks, space, sound, outlets, parking, wifi } = req.body;
    const array = [quality_meals, quality_drinks, space, sound, outlets, parking, wifi];
    
    const selectShops = `SELECT * FROM spots 
                  WHERE food_avg >= $1 
                  AND drinks_avg >= $2
                  AND space_avg >= $3
                  AND sound_avg >= $4
                  AND outlets_avg >= $5
                  AND parking_avg >= $6
                  AND wifi_avg >= $7`;

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

//controller for searching for coffee shop by name
coffeeController.searchByName = (req, res, next) => {
  const { name } = req.body;
  const query = `SELECT name from spots WHERE name=${name}`;
  
  db.query(query)
    .then(response => {
      console.log('got the coffee shop you typed requested!');
      res.locals.getShop = response; 
      return next();
    })
    .catch((err) => {
      return next({
          log: 'coffeeController.searchByName error',
          message: {err: 'cannot read coffee shop name'}
      })
    })
}

//have to write this in mongo
coffeeController.readReview = (req, res, next) => {
  const text = 'SELECT * FROM spots'
  db.query(text)
  .then((response) => {
    res.locals.reviews = response.rows
    console.log('Got values!!');
    return next();
  })
  .catch((err) => {
    return next({
        log: 'coffeeController.readReview error',
        message: {err: 'cannot read reviews'}
    })
  })
}

//will we render their username
//add this controller after they search by name (not criteria)

// after users add reviews, 
coffeeController.addReview = (req, res, next) => {
  const { id } = req.query;
  const { quality_meals, quality_drinks, space, sound, outlets, parking, wifi } = req.body;
  
  Reviews.create({ shopId: id, food: quality_meals, drinks: quality_drinks, space: space, sound: sound,
    outlets: outlets, parking: parking, wifi: wifi})
    .then(response => {
      //do we want to update all the rendered reviews to include this new review? array in frontend?
      return next()
    })
    .catch(err => {
      return next({
        log: 'addReview error!',
        message: {err: 'cannot add review!'}
      })
    })  
    }
 


coffeeController.delReview = (req, res, next) => {
  const { id } = req.query; // maybe specific id? 
  
};

//this controller has to include recalculating averages, updating values in the spots table
coffeeController.updateAve = async (req, res, next) => {
  const { id } = req.query;
  // const { quality_meals, quality_drinks, space, sound, outlets, parking, wifi } = req.body;
  // const values = [quality_meals, quality_drinks, space, sound, outlets, parking, wifi];
  const text = `SELECT * from shops WHERE _id = $1`;
  
  const value = [req.query.id]
    
  const getReviews = await Reviews.find({ shopId: id }); // returns an array of objects of all the review criteria
  const totalReviews = getReviews.length; // [{ food_avg: 2, drinks_avg: 3} ].length == 1
  
  db.query(text, value) // [{ name: starbucks, food_avg: 2, drinks_avg: 3}]
    .then(response => {
      // response.rows = [{ name: starbucks, food_avg: 2, drinks_avg: 3}]
      // response.rows[0] = { name: starbucks, food_avg: 2, drinks_avg: 3}


      const obj = {};
      getReviews.forEach(el => {
        for (let [key, value] of Object.entries(el)) {
          if (key !== 'shopId') {
            obj[key] = (response.rows[0][key] + req.body[key]) / (totalReviews + 1);
          }
        }
        const newAveValues = obj; // { name: starbucks, food_avg: 2, drinks_avg: 3}
      })
    })

    const { food_avg, blah blah } = newAveValues 
    db.query('UPDATE spots $1, $2, $3')

    // getReviews.forEach(el => {
    //   for (let [key, value] of Object.entries(el)) {
    //     if (key !== 'shopId') {
    //       updatedAverages[i] = (updatedAverages[i] + value) / (totalReviews + 1);
    //     }
    //   }
    // })
    

    food_avg = (food_avg+req.body.food)/(totalReviews+1);
    // drinks_avg = 


}

//this controller is to update an individual's review
coffeeController.updateReview = {};




// ALTER TABLE spots
// ADD COLUMN name data_type VARCHAR;



// This is the table of coffeeshops and their average reviews for each category.
//  CREATE TABLE spots (
  //     _id SERIAL PRIMARY KEY,
  //     shop_name VARCHAR(50) NOT NULL,
 //      reviews_id INTEGER
//       food_avg INTEGER // hard coded to0
//       drinks_avg INTEGER //0
//       space_avg INTEGER //0
//        ...
  //  )
  
  
  // This is the table for user reviews for a specitic coffee shop.
// CREATE TABLE reviews (
//     _id SERIAL PRIMARY KEY,
//     food INTEGER,
//     drinks INTEGER,
//     space INTEGER, 
//     sound INTEGER,
//     outlets INTEGER,
//     parking INTEGER,
//     wifi INTEGER
//     users_id VARCHAR(50),
// )
    
//  CREATE TABLE users (
//     _id SERIAL PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     password VARCHAR(50)
//  )

    
//     SELECT * FROM users
    
//     INSERT INTO users (username, password)
//     VALUES ('mark!@#123', 'jaden$%^123')
    
//     DROP TABLE spots
    
//     INSERT INTO spots (food, drinks, space, sound, outlets, parking, wifi)
//     VALUES (5, 3, 4, 1, 2, 4, 3)

/**
 * 
 * 
 * 
 */


module.exports = coffeeController;