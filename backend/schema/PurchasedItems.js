const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const PurchasedItemsSchema = new Schema({
    tracking_id: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
     },
     item_id: {
        type: String,
        required: true
     },
     estimated_delivery_date: {
        type: Date,
        required: true
     },
     purchased_date: {
        type: Date,
        required: true
     }
})

module.exports = PurchasedItems = mongoose.model('purchasedItems', PurchasedItemsSchema);