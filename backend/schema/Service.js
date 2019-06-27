const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    id: {
      type: String,
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
    name: {
      type: String,
      required: true
    },
    desc: {
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
    services: {
      type: [String],
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
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
    logo: {
      type: String,
      required: true
    },
    images: {
      type: [String]
    }
})

module.exports = Service = mongoose.model('service', ServiceSchema);