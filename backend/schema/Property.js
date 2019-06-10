const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
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
      type: String,
      required: true
    },
    lat: {
      type: String,
      required: true
    },
    lng: {
      type: String,
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
    }
})

module.exports = Property = mongoose.model('property', PropertySchema);