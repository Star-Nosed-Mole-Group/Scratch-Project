const db = require('../sqlconnection.js')
const Reviews = require('../models/reviewsModel');

/**
 *   Information that we are receiving from the front-end (req.body):
 *   
 * 
 *   name (string) --> this is a search field function.
 *   quality of meals (1 - 5)
 *   quality of drinks (1 - 5)
 *   space availability (1 - 5)
 *   parking availability (1 - 5)
 *   sound (1-5)
 *   wifi (1-5)
 * 
 * 
 * */

const coffeeController = {};


//controller for searching for coffeeshops by selected criteria
coffeeController.searchShopsByCriteria = (req, res, next) => {
  console.log('searchShopsByCriteria');
    const { quality_meals, quality_drinks, space, sound, outlets, parking, wifi } = req.query;
    const value1 = [quality_meals, quality_drinks, space, sound, outlets, parking, wifi];
    const selectShopsByCriteria = `SELECT * FROM spots 
                  WHERE food >= $1 
                  AND drinks >= $2
                  AND space >= $3
                  AND sound >= $4
                  AND outlets >= $5
                  AND parking >= $6
                  AND wifi >= $7`;

    db.query(selectShopsByCriteria, value1)
      .then(response => {
        res.locals.readShops = response.rows; 
        console.log(response.rows);
        return next();
      })
      .catch(err => {
        return next({
            log: 'an error occurred in coffeeController.searchShopsByCriteria middleware',
            message: {err: 'an error occurred when reading shops in coffeeController.searchShopsByCriteria'}
        })
      })
}

//controller for searching for coffee shop by name
//after searching by name, what renders, and what's the next click?
coffeeController.searchShopsByName = (req, res, next) => {
  console.log('searchShopsByNames invoked');
  const { name } = req.query;
  const query = `SELECT name from spots WHERE shop_name=${name}`;
  
  db.query(query)
    .then(response => {
      console.log('got the coffee shop you typed requested!');
      res.locals.readShops = response.rows; 
      return next();
    })
    .catch((err) => {
      return next({
          log: 'coffeeController.searchByName error',
          message: {err: 'cannot read coffee shop name'}
      })
    })
}


//is there a way to make it so that in this controller, if the user has made a review, it'll pin that review to the top?
  //and that one review will have update/delete buttons? 
coffeeController.readReviews = (req, res, next) => {
  const { shopId } = req.query;
  console.log('readReviews executed');
  
  Reviews.find({shopId})
  .then((response) => {
    res.locals.reviews = response; /// correct response obj?
    console.log('Got reviews!!');
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
  //will this be rendered after they click on shop or with a button
  //a text field? 
coffeeController.addReview = (req, res, next) => {
  const { food, drinks, space, sound, outlets, parking, wifi, username } = req.body;
  const { shopId } = req.query;
  console.log(username);
  console.log('addReview invoked');
  Reviews.create({ shopId, food, drinks, space, sound,
    outlets, parking, wifi, username})
    .then(response => {
      console.log('review created!')
      console.log(response);
      //do we want to update all the rendered reviews to include this new review? array in frontend?
      return next();
    })
    .catch(err => {
      return next({
        log: 'addReview error!',
        message: {err: 'cannot add review!'}
      })
    })  
    }
 

//how will this render? user searches by name, readreviews, searches through for their own review (need to add username to review model)
    //how do we save the username with the request object? parameterized queries? cookie? 
// coffeeController.delReview = (req, res, next) => {
//   const { shopId } = req.query; 
//   Reviews.findOneAndDelete({shopId: shopId})
//   .then(response => {
//     console.log('review deleted!')
//     return next()
//   })
//   .catch(err => {
//   return next({
//     log: 'addReview error!',
//     message: {err: 'cannot add review!'}
//   })
// })  
// };

// coffeeController.delUpdateAve = async (req, res, next) => {
//   console.log('delUpdateAve invoked');
//   const text = `SELECT * from spots WHERE _id = $1`;
//   const value = [req.query.shopId];

//   const newAveValues = {}; // { name: starbucks, food_avg: 2, drinks_avg: 3}
//   const queryResponse =  await db.query(text, value); // [{ name: starbucks, food_avg: 2, drinks_avg: 3, reviewCount: 120}]
//   const queryRows = queryResponse.rows[0];
//   console.log('queryReponse:', queryRows);
//   for(const [key, value] of Object.entries(queryRows)) {
//     if(!['reviewcount', '_id', 'name'].includes(key)) {
//       newAveValues[key] = (value * queryRows.reviewcount - req.body[key]) / (queryRows.reviewcount - 1);
//     }
//   }
  
//     console.log('newAveValues: ', newAveValues);
//     const query = 'UPDATE spots SET food=$2, drinks=$3, space=$4, sound=$5, outlets=$6, parking=$7, wifi=$8, reviewcount=$9 WHERE _id=$1';
//     const values = [req.query.shopId, newAveValues.food, newAveValues.drinks, newAveValues.space, newAveValues.sound, newAveValues.outlets, newAveValues.parking, newAveValues.wifi, queryRows.reviewcount - 1];
//     console.log('values array: ', values);
//     db.query(query, values)
//       .then(res => next())
//       .catch(err => {
//         return next({
//           log: 'updateAve error during update request',
//           message: {err: 'Error'}
//         });
//       }) 
// }

//this controller is to update an individual's review
//have to save res.locals. to updateAve controller

coffeeController.updateReview = (req, res, next) => {
  
};

//this controller has to include recalculating averages, updating values in the spots table
coffeeController.updateAve = async (req, res, next) => {
  console.log('updateAve invoked');
  // const { shopId, food, drinks, space, sound, outlets, parking, wifi } = req.body;  
  
  const text = `SELECT * from spots WHERE _id = $1`;
  const value = [req.query.shopId];

  const newAveValues = {}; // { name: starbucks, food_avg: 2, drinks_avg: 3}
  const queryResponse =  await db.query(text, value); // [{ name: starbucks, food_avg: 2, drinks_avg: 3, reviewCount: 120}]
  const queryRows = queryResponse.rows[0];
  console.log('queryReponse:', queryRows);
  for(const [key, value] of Object.entries(queryRows)) {
    if(!['reviewcount', '_id', 'name'].includes(key)) {
      newAveValues[key] = (value * queryRows.reviewcount + req.body[key]) / (queryRows.reviewcount + 1);
    }
  }
  
    console.log('newAveValues: ', newAveValues);
    const query = 'UPDATE spots SET food=$2, drinks=$3, space=$4, sound=$5, outlets=$6, parking=$7, wifi=$8, reviewcount=$9 WHERE _id=$1';
    const values = [req.query.shopId, newAveValues.food, newAveValues.drinks, newAveValues.space, newAveValues.sound, newAveValues.outlets, newAveValues.parking, newAveValues.wifi, queryRows.reviewcount + 1];
    console.log('values array: ', values);
    db.query(query, values)
      .then(res => next())
      .catch(err => {
        return next({
          log: 'updateAve error during update request',
          message: {err: 'Error'}
        });
      }) 
    


}




// ALTER TABLE spots
// ADD COLUMN name VARCHAR;

// UPDATE table_name
// SET column1 = value1, column2 = value2...., columnN = valueN
// WHERE [condition];

// ALTER TABLE table_name
// ALTER COLUMN column_name datatype;

// UPDATE spots SET food=$3, drinks=$3, space=$3, sound=$3, outlets=$2, parking=$1, wifi=$2, reviewcount=$3 WHERE _id=$1
// This is the table of coffeeshops and their average reviews for each category.
//  CREATE TABLE spots (
  //     _id SERIAL PRIMARY KEY,
  //     shop_name VARCHAR(50) NOT NULL,
//       food_avg INTEGER // hard coded to0
//       drinks_avg INTEGER //0
//       space_avg INTEGER //0
//        ...
  //  )
  
  
  // This is the table for user reviews for a specitic coffee shop.
// CREATE TABLE reviews ( IGNORE THIS ONE- --> REFER TO THE MONGOOSE MODEL in reviewsModel.js
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

    // UPDATE spots SET name='Starbucks' WHERE _id=1;
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