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
    wifi: {type: Number, default: 0}
})

const Reviews = mongoose.model('Reviews', reviewsSchema);
module.exports = Reviews;