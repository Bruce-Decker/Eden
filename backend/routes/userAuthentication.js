const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');
var async = require('async');
const jwt = require('jsonwebtoken');
const User = require('../schema/userModel');
var nodemailer = require("nodemailer");
var localStorage = require('localStorage');
var validateRegisterInput = require('../validation/validateRegisterInput');
var validateLoginInput = require('../validation/validateLoginInput');
const keys = require('../key/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendgridApiKey);

var redis = require("redis"),
    client = redis.createClient();


function cache(req, res, next) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }    
        client.get(req.body.email, function (err, user) {
            if (err) throw err;
            if (user != null) {
                //res.send(respond(org, data));
                var data = JSON.parse(user);
                console.log(data.password);
                console.log(req.body.password);
                bcrypt.compare(req.body.password, data.password)
                .then(isMatch => {
                        if (isMatch) {
                            console.log("redis retrieve");
                          
                            const payload = { id: data.id, email: data.email, name: data.name, password: data.password};
                            console.log(payload);
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
                            console.log("Wrong password from cache function");
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors)
                        }
                })
            } else {
                next();
            }
        });
    }

router.post('/register', (req, res) => {
    console.log(req.body);
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
            });

            bcrypt.genSalt(10, (err, salt) => {
                console.log(new_user.password);
                bcrypt.hash(new_user.password, salt, (err, hash) => {
                  if (err) throw err;
                  new_user.password = hash;
                  new_user
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });

            const msg = {
                to: new_user.email,
                from: 'support@eden.com',
                subject: 'Welcome to Eden',
                text: 'You are now registered to enjoy all our services offered at Eden.',
                html: '<strong>You are now registered to enjoy all our services offered at Eden.</strong>',
            };
            try {
                sgMail.send(msg);
            }
            catch (e) {
                console.log(e);
            }
        }
    })
});



router.post('/login', cache, (req, res) => {
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
      console.log(user.password);
      console.log(password);


      bcrypt.compare(password, user.password)
      .then(isMatch => {
          console.log(password);
          console.log(isMatch);
          if(isMatch) {
            console.log("MongoDB retrieve");
              //res.json({msg: 'Sucess'})
              //User matched
              const payload = { id: user.id, email: user.email, name: user.name, password: user.password}; //Create JWT payload
              client.setex(email, 3600, JSON.stringify(payload));
              console.log(payload);
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
              errors.password = 'Password incorrect';
              return res.status(400).json(errors)
          }
      })
})
  });

module.exports = router;