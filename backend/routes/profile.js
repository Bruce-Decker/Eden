const express = require('express');
const router = express.Router();

const Profile = require('../schema/profileModel')
var multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
       cb(null, '../client/public/images/')
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

router.post('/profileUpload', imageUpload.single('filename'), function(req, res) {
    var email = req.body.email
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var DOB = req.body.DOB;
    var gender = req.body.gender;
    var profile_picture_path = "/images/" + req.body.email + '.jpg'
   
    var phone_number = req.body.phone_number
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

router.get('/:email', function(req, res) {
    Profile.find({email: req.params.email}, function(err, docs) {
		if (docs) {
			res.send(docs)
		} else {
			res.send({"error": err})
		}
	})
})


module.exports = router;