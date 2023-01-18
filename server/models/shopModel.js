const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String},
    website: {type: String}
})

const Shops = mongoose.model('shops', ShopSchema);
module.exports = Shops;
