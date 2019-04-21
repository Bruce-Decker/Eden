const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    cart_id: {
        type: String,
        required: true
    },
    items: [{
        item_id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        bid_price: Number
    }],
    email: {
        type: String,
        required: true
    }
})

module.exports = Cart = mongoose.model('cart', CartSchema);