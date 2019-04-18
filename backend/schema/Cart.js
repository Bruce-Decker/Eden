const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    bid_price: Number
})

module.exports = Cart = mongoose.model('cart', CartSchema);