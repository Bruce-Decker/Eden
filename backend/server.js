const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('./schema/userModel')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/Login_test_app"
var async = require('async');
var nodemailer = require("nodemailer");
var localStorage = require('localStorage')
var validateRegisterInput = require('./validation/validateRegisterInput')
var validateLoginInput = require('./validation/validateLoginInput')
var passport = require('passport')
var crypto =  require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
var multer = require('multer')


const productionLoginRegister = require('./routes/productionLoginRegister');
const userAuthentication = require('./routes/userAuthentication');



app.use(morgan('dev'))
// Passport middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);



mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

// Passport middleware
app.use(passport.initialize());

app.use('/productionLoginRegister', productionLoginRegister);
app.use('/userAuthentication', userAuthentication);


app.listen(port, () => console.log(`Server running on port ${port}`));
