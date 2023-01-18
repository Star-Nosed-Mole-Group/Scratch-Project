const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    shopId: {type: Number, required: true},
    food: {type: Number, default: 0},
    drinks: {type: Number, default: 0},
    space: {type: Number, default: 0},
    sound: {type: Number, default: 0},
    outlets: {type: Number, default: 0},
    parking: {type: Number, default: 0},
    wifi: {type: Number, default: 0},
    username: {type: String, required: true},
    comments: [{
      body: {type: String, require: true},
      time: {type: Date}
    }]
})

const Reviews = mongoose.model('reviews', reviewsSchema);
module.exports = Reviews;


/**
 *    table spots current data in psql
  _id | food | drinks | space | sound | outlets | parking | wifi |     name      
-----+------+--------+-------+-------+---------+---------+------+---------------
   1 |  aStarbucks
   2 |    2 |      3 |     4 |     3 |       4 |       1 |    2 | Peet"s Coffee 
 * 
      reviewsModel -> reviews DB current data
  { [
    shopId: 1,
    food: 1,
    drinks: 2,
    space: 3,
    sound: 2,
    outlets: 1,
    parking: 1
    wifi: 1,
    username: 'harsh_critic123'
  ]
}

 */