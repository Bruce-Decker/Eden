const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order_id: {
        type: String,
        default: uuidv1()
    },
    user_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    items: [{
        item_id: {
            type: String,
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        item_image: {
            type: String,
            required: false
        },
        seller: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        bid_price: Number
    }],
    tracking_id: {
        type: String,
        required: false
    },
    payment_id: {
        type: String,
        required: false
    },
    payment_receipt_url: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);