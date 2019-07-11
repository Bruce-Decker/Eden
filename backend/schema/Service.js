const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
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
    category: {
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
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    reviews: {
      rating: {
        type: Number,
        required: true,
        default: 0
      },
      count: {
        type: Number,
        required: true,
        default: 0
      },
      comments: {
        type: [
          {
            user_id: {
              type: String,
              required: true
            },
            user_name: {
              type: String,
              required: true
            },
            rating: {
              type: Number,
              required: true
            },
            date: {
              type: Date,
              default: Date.now,
              required: true
            },
            comment: {
              type: String,
              required: true
            },
            upvote: [
              {
                type: String
              }
            ],
            downvote: [
              {
                type: String
              }
            ]
          }
        ]
      }
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
      required: true,
      select: false
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
}, { minimize: false })

module.exports = Service = mongoose.model('service', ServiceSchema);