const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    email: {
        type: String, 
        unique: true,
        require: true
    },
    name: {
        type: String, 
        require: true
    }, 
    password: {
        type: String, 
        require: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// userSchema.pre('save', function(next) {
//     if (this.isModified('password')) {
//           this.password = this._hashPassword(this.password)
//           return next()
//     }
//     return next()
//  })

// userSchema.methods = {
//     _hashPassword(password) {
//         return bcrypt.hashSync(password)
//     },
//     authenticateUser(password) {
//         return bcrypt.compareSync(password, this.password)
//     }

// }

module.exports = user = mongoose.model('user', userSchema)