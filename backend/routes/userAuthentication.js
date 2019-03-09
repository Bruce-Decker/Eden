const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
var passport = require('passport')
var async = require('async');
const jwt = require('jsonwebtoken');
const User = require('../schema/userModel')
var nodemailer = require("nodemailer");
var localStorage = require('localStorage')
var validateRegisterInput = require('../validation/validateRegisterInput')
var validateLoginInput = require('../validation/validateLoginInput')


router.post('/register', (req, res) => {
    console.log(req.body)
    const{errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if(user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            const new_user = new User ({
                email: req.body.email,
                password: req.body.password
            })

         

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(new_user.password, salt, (err, hash) => {
                  if (err) throw err;
                  new_user.password = hash;
                  new_user
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        }
    })

})

module.exports = router;