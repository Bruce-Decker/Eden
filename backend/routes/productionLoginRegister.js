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
var crypto =  require('crypto');
var key = require('../key/key')
var rand,mailOptions,host,link;



var transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bruced8210@gmail.com",
        pass: key.pass
    }
});


router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


router.post('/production_send', function(req, res) {
    var email = req.body.email
    var password = req.body.password
    
   
    console.log(email)
    console.log(password)
    async.waterfall([
        function(callback) {
            const { errors, isValid } = validateRegisterInput(req.body);

            // Check validation
            if (!isValid) {
               return res.status(400).json(errors);
            }
            callback(null)

        },
        function(callback) {
            User.findOne({email: email}, function(err, doc) {
                if (err) {
                    return callback(true, "Error in MongoDB")
                } 
                if (doc) {
                    return callback(true, "Email already exists")
                }

                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                callback(null) 
            })
        }, function(callback) {
            rand=Math.floor((Math.random() * 100) + 54);
            host=req.get('host');
            link = "http://"+req.get('host')+"/productionLoginRegister/production_verify?id="+rand;
            mailOptions={
                to : req.body.email,
                subject : "Please confirm your Email account",
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
            }
            callback(null, mailOptions)
        }, function(mailOptions, callback) {
            transport.sendMail(mailOptions, function(error, response){
                if(error){
                       console.log(error);
                   res.send("error");
                }else{
                       console.log("Message sent: " + response.message);
                   res.send("sent");
                    }
           });
           callback(null, "Email sent successfully")

        }
    ], function(err, data) {
         console.log(err, data)
         res.json({error : err === null ? false : true, data : data});
    })
    
    
})

router.get('/production_verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.send("<h1>Email "+mailOptions.to+" is been Successfully verified </h1>");
            var email = localStorage.getItem('email');
            var password = localStorage.getItem('password');
            var data = {email: email, password: password}
                User.create(data, function(err, newlyCreated) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Success")
                    }
            })
        }
        else
        {
            console.log("email is not verified");
            res.send("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});

router.post('/production_login', function(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
       return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email})
       .then(user => {
           if (!user) {
               errors.email = 'User not found';
               return res.status(404).json(errors)
           }

           // Check Password
           bcrypt.compare(password, user.password)
              .then(isMatch => {
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

})

router.post('/production_forgot', function(req, res, next) {
    async.waterfall([
       function(callback) {
           crypto.randomBytes(20, function(err, buf) {
               var token = buf.toString('hex')
               console.log("token " + token)
               callback(err, token)
           })
       },
       function(token, callback) {
           console.log(token)
           User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                   console.log("No account with that email address exists")
                   res.send("No account with that email address exists")
                }

                user.resetPasswordToken = token
                user.resetPasswordExpires = Date.now() + 3600000

                user.save(function(err) {
                    callback(err, token, user)
                })
           })
       }, function(token, user, callback) {
           //req.get('host')
        var mailOptions = {
            to: user.email,
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + 'localhost:3000' + '/productionLoginRegister/production_reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
            transport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                res.send("error");
                }else{
                    console.log("Message sent: " + response.message);
                res.send("sent");
                    }
           });

       }

    ], function(err) {
        if (err) {
            return next(err)
        }

    })
})

/*
app.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.send('<h1> Password reset token is invalid or has expired. </h1>');
        
      } else {
          res.send('<h1> Reset </h1>')
      }
    });
});
*/

router.post('/production_reset/:token', function(req, res) {
    async.waterfall([
        function(callback) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }}, function(err, user) {
                if (!user) {
                    console.log('Password reset token is invalid or has expired')
                    res.send('Password reset token is invalid or has expired')
                } else {
                    console.log("found it")
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save(function(err) {
                    callback(err, user)
                })
            })
        }, function(user, callback) {
            var error;
            var mailOptions = {
                to: user.email,
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                  'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            console.log("email is a " +  user.email)
            transport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    error = error
                  
                } else{
                    console.log("Message sent: " + response.message);

                     res.send("sent");
                }
           });
           console.log("test")
           callback(error)
        }
    ], function(err) {
          res.send(err)
    })
})


module.exports = router;