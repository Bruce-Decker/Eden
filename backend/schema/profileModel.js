const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    First_Name: String,
    Last_Name: String,
    DOB: String,
    Age: String,
    Sex: String,
    Address: String,
    Phone_Number: String,
    Email: String,
    Profile_Picture_Path: String
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);