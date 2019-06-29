const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    tracking_id: {
        type: String,
        required: true
    },
    item_id: {
            type: String,
            required: true
    },
    item_address: {
            type: String,
            required: true
    },
    quantity: {
            type: Number,
            required: true
    },
    email: {
        type: String,
        required: true
    },
    destination_address: {

    },
    deliver_status: {
        type: Boolean,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    }
})

module.exports = Delivery = mongoose.model('delivery', DeliverySchema);