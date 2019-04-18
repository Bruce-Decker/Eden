const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemUserSchema = new Schema({
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
    comment: {
        type: String,
        required: true
    },
    visited_count: {
        type: Number,
        required: true
    },
    purchased_count: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false
    }
})

module.exports = ItemUser = mongoose.model('itemUser', ItemUserSchema);