const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    DOB: String,
    address: String,
    city: String,
    country: String,
    company: String,
    gender: String,
    phone_number: String,
    email: String,
    profile_picture_path: String,
    about_me: String,
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);