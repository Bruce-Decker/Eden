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
const keys = require('../key/keys')

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
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

         

            bcrypt.genSalt(10, (err, salt) => {
                console.log(new_user.password)
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

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      console.log(user.password)
      console.log(password)


      bcrypt.compare(password, user.password)
      .then(isMatch => {
          console.log(password)
          console.log(isMatch)
          if(isMatch) {
              //res.json({msg: 'Sucess'})
              //User matched
              const payload = { id: user.id} //Create JWT payload
              console.log(payload)
              jwt.sign(
                  payload, 
                  'secret', 
                  { expiresIn: 3600 }, 
                  (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
              });
          } else {
              errors.password = 'Password incorrect'
              return res.status(400).json(errors)
          }
      })
})
  });

module.exports = router;