const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
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
    const address = req.body.address
    const longitude = Number(req.body.longitude)
    const latitude = Number(req.body.latitude)

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
        about_me,
        address,
        longitude,
        latitude
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


router.post('/sharePost', function(req, res) {
     var post_id = uuidv4()
     var isAnonymous = req.body.isAnonymous
      console.log(isAnonymous)
     var email = req.body.email
     var profile_owner_email = req.body.profile_owner_email
     var name = req.body.name
     var post = req.body.post
     var time = Date.now()
     var data = {
         name,
         post_id,
         email,
         post,
         time,
         isAnonymous
     }
     if (post) {
        Profile.findOneAndUpdate(
            {
              email: profile_owner_email
            },
           {
              $push: {
                 posts: data
              }
            }, function(err, docs) {
              if (err) {
                res.send({Error: err})
              } else {
                res.send(docs)
              }
            }
          )
     }
})


router.post('/deletePost', function(req, res) {
  
    var profile_owner_email = req.body.profile_owner_email
    const post_id = req.body.post_id
    Profile.findOneAndUpdate(
      {
        email: profile_owner_email,
        "posts.post_id": post_id
      },
     
       {
       $pull: {
         posts: { post_id: post_id}
      }
      },
      function(err, docs) {
       if (err) {
         res.send({Error: err})
       } else {
         console.log("docs")
         console.log(docs)
         res.send(docs)
       }
     }
   )
})


router.post('/deleteCommentPost', function(req, res) {
    var comment_id = req.body.comment_id
    var email = req.body.email
    var profile_owner_email = req.body.profile_owner_email
    var post_id = req.body.post_id
    if (email && profile_owner_email) {
       Profile.findOneAndUpdate(
           {
             email: profile_owner_email,
             "posts.post_id": post_id,
           
           },
          {
             $pull: {
                "posts.$.comments": { comment_id: comment_id}
             }
           }, function(err, docs) {
             if (err) {
                 console.log(err)
                 res.send({Error: err})
             } else {
                console.log("Sdfsdf")
              
               res.send(docs)
             }
           }
         )
    }
})


router.post('/commentPost', function(req, res) {
    var comment_id = uuidv4()
    var comment = req.body.comment
    var email = req.body.email
    var profile_owner_email = req.body.profile_owner_email
    var name = req.body.name
    var post_id = req.body.post_id
    var time = Date.now()
    var data = {
       comment_id,
       email,
       name,
       comment,
       time
    }
    console.log(data)
    if (comment) {
       Profile.findOneAndUpdate(
           {
             email: profile_owner_email,
             "posts.post_id": post_id
           },
          {
             $push: {
                "posts.$.comments": data
             }
           }, function(err, docs) {
             if (err) {
                 console.log(err)
               res.send({Error: err})
             } else {
               res.send(docs)
             }
           }
         )
    }
})



router.post('/likePost', function(req, res) {
     var post_id = req.body.post_id
     var name = req.body.name
     var email = req.body.email
     var profile_owner_email = req.body.profile_owner_email
     var time = Date.now()
     var data = {
         name,
         email,
         time
     }
     if (email && name) {
        Profile.findOneAndUpdate(
            {
              email: profile_owner_email,
              "posts.post_id": post_id
            },
            {
                $push: {
                    "posts.$.like": data
                 }
            }, function(err, docs) {
                if (err) {
                    console.log(err)
                  res.send({Error: err})
                } else {
                  res.send(docs)
                }

            })


     }
})

router.post('/unlikePost', function(req, res) {
    var post_id = req.body.post_id
    var email = req.body.email
    var profile_owner_email = req.body.profile_owner_email
    
    
    if (email && profile_owner_email) {
       Profile.findOneAndUpdate(
           {
             email: profile_owner_email,
             "posts.post_id": post_id
           },
           {
               $pull: {
                   "posts.$.like": {email: email}
                }
           }, function(err, docs) {
               if (err) {
                   console.log(err)
                 res.send({Error: err})
               } else {
                 res.send(docs)
               }

           })
    }
})


router.post('/likeComment', function(req, res) {
    var post_id = req.body.post_id
    var comment_id = req.body.comment_id
    var name = req.body.name
    var email = req.body.email
    var profile_owner_email = req.body.profile_owner_email
    var time = Date.now()
    var data = {
        name,
        email,
        time
    }
    if (email && name) {
       Profile.findOneAndUpdate(
           {
             "posts.0.comments.comment_id": comment_id,
            
           },
           {
           
               $addToSet: {
                "posts.0.comments.$.like": data
                }
           }, function(err, docs) {
               if (err) {
                   console.log(err)
                 res.send({Error: err})
               } else {
                 console.log(docs)
                 res.send(docs)
               }

           })


    }
})


router.post('/unlikeComment', function(req, res) {
    var post_id = req.body.post_id
    var comment_id = req.body.comment_id
    var name = req.body.name
    var email = req.body.email
    var profile_owner_email = req.body.profile_owner_email
    var time = Date.now()
    var data = {
        name,
        email,
        time
    }
    if (email && name) {
       Profile.findOneAndUpdate(
           {
             "posts.0.comments.comment_id": comment_id,
           },
           {
            $pull: {
                "posts.0.comments.$.like": {email: email}
                }
           }, function(err, docs) {
               if (err) {
                   console.log(err)
                 res.send({Error: err})
               } else {
                 console.log(docs)
                 res.send(docs)
               }

           })


    }
})

module.exports = router;