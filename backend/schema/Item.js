const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(1, 1000000);

const ItemSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
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
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    comments: [
       {
           isAnonymous: {
              type: Boolean,
              required: true
           },
           star_rating: {
            type: Number
           },
           comment_id: {
             type: String,
             required: true,
             default: rand
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
           upvote: [
               {
                    _id:false,
                    name: {
                        type: String,
                        required: true
                    },
                    email: {
                        type: String,
                        required: true
                    }

               }
           ],
           downvote: [
               {
                    _id:false,
                    name: {
                        type: String,
                        required: true
                    },
                    email: {
                        type: String,
                        required: true
                    }
               }
           ],
           replies: [
               {
                   reply_id: {
                       type: String 
                   },
                   email: {
                       type: String
                   },
                   name: {
                       type: String
                   },
                   reply: {
                       type: String
                   },
                   time: {
                       type: Date
                   }
               }
           ]

       }
    ],
    vr_file_name: {
        type: String
    },
    vr_file_path: {
        type: String
    },
    vr_upload_time: {
        type: String
    },
    viewers: [{
        username: {
            type: String,
            required: true
        },
        view_time: {
            type: String,
            required: true
        }
    }],
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    address : {
        type: String,
    },
    ar: String,
    bid_price: Number,
    bids: [{
        email: {
            type: String
        },
        amount: {
            type: Number
        },
        time: {
            type: Date
        }
    }]
})

module.exports = Item = mongoose.model('item', ItemSchema);