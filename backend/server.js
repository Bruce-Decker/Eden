const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('./schema/userModel')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/Login_test_app"
var passport = require('passport')

const morgan = require('morgan')
var multer = require('multer')
const Profile= require('./schema/profileModel')
const cors = require('cors')



const productionLoginRegister = require('./routes/productionLoginRegister');
const userAuthentication = require('./routes/userAuthentication');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
       cb(null, './images/')
    },
    filename: function(req, file, cd) {
        file.originalname = req.body.email + '.jpg'
        cd(null, file.originalname)
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
  
}

const imageUpload = multer({
    storage: storage,
    fileFilter: imageFilter
})




app.use(cors())

app.use(morgan('dev'))

app.use(passport.initialize());

require('./config/passport')(passport);



mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));


app.use(passport.initialize());

app.use('/productionLoginRegister', productionLoginRegister);
app.use('/userAuthentication', userAuthentication);

app.post('/test', function(req, res) {
    res.send("test")
})


app.post('/profileUpload', imageUpload.single('filename'), function(req, res) {
    var email = req.body.email
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var DOB = req.body.DOB;
    var gender = req.body.gender;
    var profile_picture_path = req.file.path
   
    var phone_number = req.body.phone_number
    var address = req.body.address
    var city = req.body.city 
    var country = req.body.country 
    var company = req.body.company 
    var about_me = req.body.about_me
    

    var data = {
        first_name,
        last_name,
        DOB,
        gender,
        profile_picture_path,
        email,
        phone_number,
        address,
        city,
        country,
        company,
        about_me
    }
   
    Profile.findOne({email: email}, function(err, docs) {
		if (docs) {
			Profile.findOneAndUpdate({email: email}, data, function(err, result) {
				 if (err) {
				 	res.send("Fail")
				 } else {
				 	console.log(result)
	 				res.send("Update successfully")
	 			 }
			})
		} else {
			 
				Profile.create(data, function(err, newlyCreated) {
					if (err) {
						console.log("Error Data");
						 res.send({msg: "False"});
					} else {
						 res.send({msg: "True"});
					}
			   })

		}

	})
    
})

app.get('/profile/:email', function(req, res) {
    Profile.find({Email: req.params.email}, function(err, docs) {
		if (docs) {
			res.send(docs)
		} else {
			res.send({"error": err})
		}
	})
})


app.listen(port, () => console.log(`Server running on port ${port}`));
