const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    id: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    home_type: {
      type: String,
      required: true
    },
    listing_type: {
      type: String,
      required: true
    },
    num_bath: {
        type: Number,
        required: true
    },
    num_bed: {
        type: Number,
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
    space: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
      type: [String]
    }
})

module.exports = Property = mongoose.model('property', PropertySchema);