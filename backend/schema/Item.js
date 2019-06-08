const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(1, 1000000);

const ItemSchema = new Schema({
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
                   email: {
                       type: String
                   },
                   name: {
                       type: String
                   },
                   comment: {
                       type: String
                   },
                   time: {
                       type: Date
                   }
               }
           ]

       }
    ],
    ar: String,
    bid_price: Number // not required
})

module.exports = Item = mongoose.model('item', ItemSchema);