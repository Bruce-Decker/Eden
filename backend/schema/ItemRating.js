const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemRatingSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    item_rating: {
        type: String,
        required: true
    }
})

module.exports = ItemRating = mongoose.model('item_rating', ItemRatingSchema, 'itemRatings');