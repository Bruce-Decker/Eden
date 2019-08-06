const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    DOB: String,
    country: String,
    company: String,
    gender: String,
    phone_number: String,
    email: String,
    profile_picture_path: String,
    about_me: String,
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    address : {
        type: String,
    },
    followers: [
        {
          email: {
            type: String
          },
          time: {
            type: Date
          }
        }
      ],
    posts: [
        {
            isAnonymous: {
                type: Boolean,
                required: true
            },
            post_id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true 
            },
            post: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true
            },
            like: [
                {
                     name: {
                         type: String,
                         required: true
                     },
                     email: {
                         type: String,
                         required: true
                     },
                     time: {
                         type: Date,
                         required: true
                     }
 
                }
            ],
            comments: [
                {
                    comment_id: {
                      type: String,
                      required: true,
                    },
                    email: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    comment: {
                        type: String,
                        required: true
                    },
                    time: {
                        type: Date,
                        required: true
                    },
                    like: [
                        {
                             name: {
                                 type: String,
                                 required: true
                             },
                             email: {
                                 type: String,
                                 required: true
                             },
                             time: {
                                type: Date,
                                required: true
                             }
         
                        }
                    ]
                   
                }
           ]
        }
    ]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);