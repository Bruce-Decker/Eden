const express = require('express');
const router = express.Router();
const Item = require('../schema/Item');
const uuidv4 = require('uuid/v4');
var multer = require('multer')
const itemsPerPage = 20;
var Unzipper = require("decompress-zip");
var path = require("path");
var del = require('delete');
var fs = require('fs');
const User = require('../schema/userModel');
var reversePopulate = require('mongoose-reverse-populate');

var file_old_name
//application/zip
const itemImageStorage = multer.diskStorage({
  
  destination: function(req, file, cb) {
    
      console.log(file.mimetype)
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
          cb(null, '../client/public/item_images/')
      } 
      if (file.mimetype === 'application/zip') {
          cb(null, '../client/public/uploads/')
      }
    
  },
  filename: function(req, file, cd) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
          if (file.fieldname === 'ar_file') {
            file.originalname = req.body.item_id + '_' + file.originalname
          } else {
            file.originalname = req.body.item_id + '.jpg'
          }
          cd(null, file.originalname)
       } 

       if (file.mimetype === 'application/zip') {
        file_old_name = file.originalname.slice(0, -4)
          file.originalname = req.body.item_id + '.zip'
          cd(null, file.originalname)
       }

  }
})


const itemImageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'application/zip') {
      cb(null, true);
  } else {
      cb(null, false);
  }

}


const itemImageUpload = multer({
  storage: itemImageStorage,
  fileFilter: itemImageFilter
})


router.post('/postCommentForItem/:item_id', function(req, res) {
    const comment_id = uuidv4()
    const comment = req.body.comment
    const time = Date.now()
    const email = req.body.email
    const star_rating = req.body.star_rating
    const isAnonymous = req.body.isAnonymous
    var name 
    var data
    const item_id = req.params.item_id
   
  
          User.findOne({email: email}, function(err, docs) {
            if (err) {
              console.log(err)
            } 

        
              if (docs) {
                    data = {
                      comment_id,
                      email,
                      name: docs.name,
                      comment,
                      time,
                      star_rating,
                      isAnonymous
                  }
                  console.log(data)
                  if (comment) {
                    Item.findOneAndUpdate(
                        {
                          item_id: item_id
                        },
                      {
                          $push: {
                            comments: data
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
              } else {
                if (req.body.name ==="Anonymous") {
                  name = req.body.name
                  data = {
                   comment_id,
                   email,
                   name: "Anonymous",
                   comment,
                   time,
                   star_rating
                 }
                 if (comment) {
                  Item.findOneAndUpdate(
                      {
                        item_id: item_id
                      },
                    {
                        $push: {
                          comments: data
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
               }
              }

          })
})

router.post('/deleteComment/:item_id', function(req, res) {
    const item_id = req.params.item_id
    const comment_id = req.body.comment_id
   // const email = req.body.email
    Item.findOneAndUpdate(
      {
        item_id: item_id,
        "comments.comment_id": comment_id,
       // "comments.email": email
      },
     
       {
       $pull: {
         comments: { comment_id: comment_id}
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

router.post('/upvote/:comment_id', function(req, res) {
   var comment_id = req.params.comment_id
   console.log(comment_id)
   var email = req.body.email
   var data
   if (email) {
        User.findOne({email: email}, function(err, docs) {
          if (err) {
            console.log(err)
          }
            if (docs) {
                data = {
                  name: docs.name,
                  email
               }
                  Item.findOneAndUpdate(
                    {
                      "comments.comment_id": comment_id
                    }, {
                      $pull: {
                        "comments.$.downvote": { email: email}
                    },
                        $push: {
                          "comments.$.upvote": data
                      }
                    },
                    function(err, results) {
                      if (err) {
                        res.send({Error: err})
                      } else {
                       
                        res.send(results)
                      }
                    }
                  )
            }
          })
   }
})


router.post('/undoUpvote/:comment_id', function(req, res) {
   var comment_id = req.params.comment_id
   var email = req.body.email
   if (email) {
     Item.findOneAndUpdate(
        {
          "comments.comment_id": comment_id
        },
        {
            $pull: {
               "comments.$.upvote": { email: email}
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


router.post('/downvote/:comment_id', function(req, res) {
  var comment_id = req.params.comment_id
  console.log(comment_id)
  var email = req.body.email
  var data 
  if (email) {
    User.findOne({email: email}, function(err, docs) {
      if (err) {
        console.log(err)
      }
        if (docs) {
          data = {
            name: docs.name,
            email
         }
            Item.findOneAndUpdate(
              {
              "comments.comment_id": comment_id
              }, {
                $pull: {
                  "comments.$.upvote": { email: email}
                },
                $push: {
                  "comments.$.downvote": data
              }
              }, 
              function(err, results) {
              if (err) {
                res.send({Error: err})
              } else {
                res.send(results)
              }
            }
          )
        }
      })
  }
})


router.post('/undoDownvote/:comment_id', function(req, res) {
  var comment_id = req.params.comment_id
  var email = req.body.email
  if (email) {
    Item.findOneAndUpdate(
       {
         "comments.comment_id": comment_id
       },
       {
           $pull: {
              "comments.$.downvote": { email: email}
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

router.post('/reply/:comment_id', function(req, res) {
    var comment_id = req.params.comment_id
    var email = req.body.email
    var name 
    var reply_id =  uuidv4()
    var reply = req.body.reply
    var time = Date.now()
    var data 

    User.findOne({email: email}, function(err, docs) {
      name = docs.name
      data = {
        reply_id,
        email,
        name,
        reply,
        time
      }
          Item.findOneAndUpdate(
            {
              "comments.comment_id": comment_id
            }, {
              $push: {
                "comments.$.replies": data
              }
          }, function(err, results) {
            if (err) {
              res.send({Error: err})
            } else {
              res.send(results)
            }
          })
    })
})

router.post('/deleteReply/:comment_id', function(req, res) {
    var comment_id = req.params.comment_id
    var reply_id = req.body.reply_id
    Item.findOneAndUpdate(
      {
       "comments.comment_id": comment_id
      }, {
       $pull: {
         "comments.$.replies": { reply_id: reply_id}
      }
      },
      function(err, docs) {
       if (err) {
         res.send({Error: err})
       } else {
     
         console.log(docs)
         res.send(docs)
       }
     }
   )

})


router.post('/createItem', itemImageUpload.fields([{name: 'filename', maxCount: 2}, {name: 'ar_file', maxCount: 1}]), function(req, res) {
    const item_id = req.body.item_id
    const email = req.body.email
    const user_name = req.body.user_name
    const item_name = req.body.item_name
    const item_image = "/item_images/" + item_id + '.jpg'
    const category = req.body.category
    const description = req.body.description
    const price = req.body.price
    const bid_price = req.body.bid_price
    const address = req.body.address
    var longitude = 0
    var latitude = 0
    if (req.body.longitude) {
      longitude = Number(req.body.longitude)
    }
    if (req.body.latitude) {
      latitude = Number(req.body.latitude)
    }
    
    var ar = req.body.ar
    var vr_file_name = req.body.vr_file_name
    var vr_upload_time 
    var vr_file_path
    
   
    const files = req.files.filename
    if (files && files[1]) {
      console.log(files[1])
      vr_file_path = files[1].originalname
      vr_file_path =vr_file_path.slice(0, -4)
        
        vr_file_path = "/uploads/" + vr_file_path
        var filepath = path.join(files[1].destination, files[1].filename);
        var unzipper = new Unzipper(filepath);


            unzipper.on("extract", function () {
                console.log("Finished extracting");
            });

            unzipper.extract({ path: "../client/public/uploads/"})
            vr_upload_time = Date.now()
            //unzip(unzipper, req.file.filename, deleteFile)
            //comments
    }
  

    const data = {
       email,
       user_name,
       item_id,
       item_name,
       item_image,
       category,
       description,
       price,
       bid_price,
       ar,
       vr_file_name,
       vr_upload_time,
       vr_file_path,
       address,
       longitude,
       latitude
    }

    console.log(data)

    Item.findOne({item_id: item_id}, function(err, docs) {
      if (docs) {
         Item.findOneAndUpdate({item_id: item_id}, data, function(err, result) {
           if (err) {
                       res.send("Fail")
                      
           } else {
                  console.log(result)
                  res.send({msg: "Update successfully", data: data})
                  if (files && files[1]) {
                    del(['../client/public/uploads/' + files[1].filename], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
                    });

                    del(['../client/public/uploads/__MACOSX'], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
                    });

                      fs.rename('../client/public/uploads/' + file_old_name, '../client/public/uploads/' + item_id, function(err) {
                        if ( err ) console.log('ERROR: ' + err);
                      });
                  }

                      
            }
        })
      } else {    
          Item.create(data, function(err, newlyCreated) {
            if (err) {
                  console.log(err)
                  res.send({msg: "False"});
                          
            } else {
                  res.send({msg: "True", data: data});

                  if (files && files[1]) {
                    del(['../client/public/uploads/' + files[1].filename], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
                    });

                    del(['../client/public/uploads/__MACOSX'], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
                    });

                    fs.rename('../client/public/uploads/' + file_old_name, '../client/public/uploads/' + item_id, function(err) {
                      if ( err ) console.log('ERROR: ' + err);
                    });
                  }
            }
          })
      }
    })   
})

router.get('/', function(req,res) {
  if(req.query.category == null) {
    Item.find(function(err, doc) {
      if (err) {
        return callback(true, "An error occurred, please try again later.")
      } 
      if (doc) {
        res.json(doc)
      }
    })
  } else {
    const pageNumber = req.query.page || 1
    Item.find({
      category: req.query.category
    }).skip((pageNumber - 1) * itemsPerPage).then(async (items) => {
      let results = items.map(i => i._doc);

      let ret = {
        numItems: results.length,
        itemsPerPage: itemsPerPage,
        items: results.slice(0, itemsPerPage)
      };

      res.json(ret);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'category not found' });
    });
  }
});

router.get('/:id', function(req,res) {
  var item_id = req.params.id
  Item.find({item_id: item_id}, function(err, docs) {
     if (err) {
       res.send(err)
     } else {
       res.send(docs)
     }
  })

});


router.post('/deleteItemForUser/:item_id', function(req, res) {
  var item_id = req.params.item_id
  Item.findOneAndDelete({item_id: item_id}, function(err, docs) {
     if (err) {
       console.log("Error Data")
       res.send({msg: "False"})
     } else {
       res.send(docs)
     }
  })

})



router.get('/getAllItemsForUser/:email', function(req, res) {
      var email = req.params.email
      Item.find({email: email}, function(err, docs) {
         if (err) {
           console.log("Error Data")
           res.send({msg: "False"})
         } else {
           res.send(docs)
         }
      })

})



router.get('/retrieveFile/:item_id', function(req, res) {
  var item_id = req.params.item_id
  Item.findOne({item_id: item_id}, function(err, docs) {
       if (err) {
         console.log("Error Data");
         res.send({msg: "False"});
       } else {
           res.send(docs)
       }
  })
})

module.exports = router;