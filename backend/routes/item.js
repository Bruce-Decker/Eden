const express = require('express');
const router = express.Router();
const Item = require('../schema/Item');
const uuidv4 = require('uuid/v4');
var multer = require('multer')
const itemsPerPage = 20;
var Unzipper = require("decompress-zip");
var path = require("path");
var del = require('delete');


var item_id
//application/zip
const itemImageStorage = multer.diskStorage({
  
  destination: function(req, file, cb) {
     item_id = uuidv4()
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
       
         file.originalname = item_id + '.jpg'
         cd(null, file.originalname)
       } 

       if (file.mimetype === 'application/zip') {
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
    const name = req.body.name
    const item_id = req.params.item_id
    const data = {
       comment_id,
       email,
       name,
       comment,
       time
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
})

router.post('/deleteComment/:item_id', function(req, res) {
    const item_id = req.params.item_id
    const comment_id = req.body.comment_id
    const email = req.body.email
    Item.findOneAndUpdate(
      {
        "comments.comment_id": comment_id,
        "comments.email": email
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
   var name = req.body.name
   const item_id = req.body.item_id
   var data = {
      name,
      email
   }
   console.log(data)
   if (email && name) {
     console.log("test")

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
         function(err, docs) {
          if (err) {
            res.send({Error: err})
          } else {
            console.log("docs")
            console.log(docs)
            res.send(data)
          }
        }
      )
   }
})


router.post('/downvote/:comment_id', function(req, res) {
  var comment_id = req.params.comment_id
  console.log(comment_id)
  var email = req.body.email
  var name = req.body.name
  var data = {
    name,
    email
 }

  if (email) {
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

  }
})

router.post('/reply/:comment_id', function(req, res) {
    var comment_id = req.params.comment_id
    var email = req.body.email
    var name = req.body.name
    var reply_id =  uuidv4()
    var reply = req.body.reply
    var time = Date.now()
    var data = {
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
    }, function(err, docs) {
       if (err) {
         res.send({Error: err})
       } else {
         res.send(docs)
       }
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


router.post('/createItem', itemImageUpload.array('filename', 2), function(req, res) {
    const item_name = req.body.item_name
    const item_image = "item_images/" + item_id + '.jpg'
    const category = req.body.category
    const description = req.body.description
    const price = req.body.price
    const bid_price = req.body.bid_price
    var vr_file_name
    var vr_upload_time 
    var vr_file_path
    
   

    console.log("file0 ")
    console.log(req.files[0].filename)

    if (req.files[1]) {
        vr_file_name = req.files[1].originalname
        vr_file_name = vr_file_name.slice(0, -4)
        vr_file_path = "/uploads/" + vr_file_name
        var filepath = path.join(req.files[1].destination, req.files[1].filename);
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
       item_id,
       item_name,
       item_image,
       category,
       description,
       price,
       bid_price,
       vr_file_name,
       vr_upload_time,
       vr_file_path
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
                  if (req.files[1]) {
                    del(['../client/public/uploads/' + req.files[1].filename], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
                    });

                    del(['../client/public/uploads/__MACOSX'], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
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

                  if (req.files[1]) {
                    del(['../client/public/uploads/' + req.files[1].filename], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
                    });

                    del(['../client/public/uploads/__MACOSX'], {force: true}, function(err, deleted) {
                      if (err) throw err;
                      // deleted files
                      console.log("delete")
                    
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

module.exports = router;