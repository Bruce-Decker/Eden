const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender_email: {
        type: String,
        required: true
    },
    receiver_email: {
        type: String,
        required: true
    },
    subject: {
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
    }
})

module.exports = Message = mongoose.model('message', MessageSchema)