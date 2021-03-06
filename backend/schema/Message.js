const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message_id: {
       type: String,
       required: true
    },
    sender_name: {
        type: String,
        required: true
    },
    sender_email: {
        type: String,
        required: true
    },
    receiver_email: {
        type: String,
        required: true
    },
    receiver_name: {
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: [{
        _id:false,
       email: {
          type: String,
          required: true
       }
    }],
    isStarred: [{
        _id:false,
        email: {
           type: String,
           required: true
        }
     }],
    isTrashed: [{
        _id:false,
        email: {
           type: String,
           required: true
        }
     }],
    isDeleted: [{
        _id:false,
        email: {
           type: String,
           required: true
        }
     }],
    isDraft: [{
        _id:false,
        email: {
           type: String,
           required: true
        }
     }],
    replies: [
        {
            reply_id: {
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
            message: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true
            },
        }
    ],
    time: {
        type: Date,
        required: true
    }
})

module.exports = Message = mongoose.model('message', MessageSchema)