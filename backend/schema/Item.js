const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    by_user: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    average_rating: {
        type: Number,
        required: true
    },
    bid_price: Number // not required
})

module.exports = Item = mongoose.model('item', ItemSchema);