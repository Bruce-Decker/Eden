const express = require('express')
const router = express.Router()
const Message = require('../schema/Message')
const uuidv4 = require('uuid/v4');
const User = require('../schema/userModel');

router.post('/sendMessage', (req, res) => {
    var message_id = uuidv4()
    var sender_email = req.body.sender_email
    var sender_name = req.body.sender_name
    var receiver_email = req.body.receiver_email
    var receiver_name
    var subject = req.body.subject
    var message = req.body.message
    var isDraft
     if (req.body.isDraft) {
        isDraft = req.body.isDraft
     }
    

    User.findOne({email: receiver_email}, function(err, docs) {
        if (err) {
            console.log(err)
        } 
        if (docs) {
            receiver_name = docs.name
            var time = Date.now()
            var data
         if (req.body.isDraft) {
            data = {
                message_id,
                sender_email,
                sender_name,
                receiver_email,
                receiver_name,
                subject,
                message,
                isDraft,
                time
            }
         } else {
            data = {
                message_id,
                sender_email,
                sender_name,
                receiver_email,
                receiver_name,
                subject,
                message,
                time
         }
        } 
            Message.create(data, function(err, newlyCreated) {
                if (err) {
                    console.log("Error Data");
                     res.send({msg: "False"});
                } else {
                     res.send(newlyCreated);
                }
           })
        }
    })
    
//     var time = Date.now()
    
//     var data = {
//        message_id,
//        sender_email,
//        sender_name,
//        receiver_email,
//        receiver_name,
//        subject,
//        message,
//        time
//     }

//     Message.create(data, function(err, newlyCreated) {
//         if (err) {
//             console.log("Error Data");
//              res.send({msg: "False"});
//         } else {
//              res.send(newlyCreated);
//         }
//    })
})

router.get('/getIndividualMessage/:message_id/:email', (req, res) => {
  var message_id = req.params.message_id
  var email = req.params.email
  var data = {
      email
  }
  console.log(email)
  Message.findOne({message_id: message_id}, function(err, docs){
       if (err) {
         res.send({err})
       } else {
           res.send(docs)
           Message.findOneAndUpdate(
            {
                message_id: message_id
            },
            {
            //  $push: {
            //      isRead: data
            //   }
             $addToSet: {
                isRead: {email: email}
             }
            }, function(err, docs) {
                if (err) {
                    //res.send({Error: err})
                    console.log(err)
                  } else {
                    //res.send(docs)
                    console.log(docs)
                }
            }
     
         )
       }
  })
})


router.post('/replyEmail', (req, res) => {
    var message_id = req.body.message_id
    var reply_id = uuidv4()
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var time = Date.now()
    var data = {
        reply_id,
        name,
        email, 
        message,
        time
    }
    if (message) {
        Message.findOneAndUpdate(
          {
            message_id: message_id,
          },
          {
            $set: {
                isRead: [{email: email}]
             },
             $push: {
                replies: data
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


router.post('/saveDraftMessage', (req, res) => {
    var message_id = uuidv4()
    var sender_email = req.body.sender_email
    var receiver_email = req.body.receiver_email
    var subject = req.body.subject
    var message = req.body.message
    var isRead = false
    var isStarred = false
    var isTrashed = false
    var isDeleted = false
    var isDraft = true
    var time = Date.now()
    
    var data = {
       message_id,
       sender_email,
       receiver_email,
       subject,
       message,
       isRead,
       isStarred,
       isTrashed,
       isDeleted,
       isDraft,
       time
    }

    Message.create(data, function(err, newlyCreated) {
        if (err) {
            console.log("Error Data");
             res.send({msg: "False"});
        } else {
             res.send(newlyCreated);
        }
   })
})


router.post('/starMessage', function(req, res) {
     var message_id = req.body.message_id
     var email = req.body.email
     var data = {
        email: email
     }
     Message.findOneAndUpdate(
        {
            message_id: message_id,
        },
        {
            $push: {
                isStarred: data
             }
        }, function(err, docs) {
            if (err) {
                res.send({Error: err})
              } else {
                  console.log(docs)
                res.send(docs)
            }
        }

     )
})


router.post('/unstarMessage', function(req, res) {
    var message_id = req.body.message_id
    var email = req.body.email
    Message.findOneAndUpdate(
       {
           message_id: message_id,
       },
       {
         $pull: {
            isStarred: { email: email }
         }
       }, function(err, docs) {
           if (err) {
               res.send({Error: err})
             } else {
               res.send(docs)
           }
       }

    )
})


router.post('/readMessage', function(req, res) {
    var message_id = req.body.message_id
    var email = req.body.email
    var data = {
       email: email
    }
    Message.findOneAndUpdate(
       {
           message_id: message_id,
       },
       {
        $push: {
            isRead: data
         }
       }, function(err, docs) {
           if (err) {
               res.send({Error: err})
             } else {
               res.send(docs)
           }
       }

    )
})


router.post('/trashMessage', function(req, res) {
    var message_id = req.body.message_id
    message_id.forEach(function(element) {
        console.log(element)
    })
    var email = req.body.email
    var data = {
       email: email
    }
    Message.updateMany(
       {
        message_id: {
            $in: message_id
        }
       },
       {
          $push: {
            isTrashed: data
          }
       }, function(err, docs) {
           if (err) {
               res.send({Error: err})
             } else {
               res.send(docs)
           }
       }

    )
})


router.post('/untrashMessage', function(req, res) {
    var message_id = req.body.message_id
    var email = req.body.email
    Message.updateMany(
       {
           message_id: message_id,
       },
       {
           $pull: {
               isTrashed: {email: email}
           }
       }, function(err, docs) {
           if (err) {
               res.send({Error: err})
             } else {
               res.send(docs)
           }
       }

    )
})


router.post('/deleteMessage', function(req, res) {
    var message_id = req.body.message_id
    var email = req.body.email
    var data = {
       email: email
    }
    message_id.forEach(function(element) {
        console.log("id is" + element)
    })

    Message.updateMany(
       {
           message_id: {
               $in: message_id
           }
       },
       {
         $push: {
            isDeleted: data
          }
       }, function(err, docs) {
           if (err) {
               res.send({Error: err})
             } else {
               res.send(docs)
           }
       }

    )
})


router.get('/getInboxMessages/:receiver_email/:page', function(req, res) {
    var receiver_email = req.params.receiver_email
    console.log(req.query.page)
    var page = parseInt(req.params.page) || 0
    var limit = parseInt(req.query.limit) || 3
    var query = {$or: [{receiver_email: receiver_email, 'isDraft.email': { "$ne": [receiver_email] }, 'isDeleted.email': { "$nin": [receiver_email] }, 'isTrashed.email': { "$nin": [receiver_email] }},
    {sender_email: receiver_email, "replies.0": {"$exists": true}, 'isDraft.email': { "$nin": [receiver_email] }, 'isDeleted.email': { "$nin": [receiver_email] }, 'isTrashed.email': { "$nin": [receiver_email] }}]}

    console.log(receiver_email)
    Message.find().or([{receiver_email: receiver_email, 'isDraft.email': { "$ne": [receiver_email] }, 'isDeleted.email': { "$nin": [receiver_email] }, 'isTrashed.email': { "$nin": [receiver_email] }},
        {sender_email: receiver_email, "replies.0": {"$exists": true}, 'isDraft.email': { "$nin": [receiver_email] }, 'isDeleted.email': { "$nin": [receiver_email] }, 'isTrashed.email': { "$nin": [receiver_email] }}])
     .sort({'time': 'desc'})
     .skip(page * limit)
     .limit(limit)
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
           // res.send(docs)
           Message.countDocuments(query).exec((count_error, countDocuments) => {
            if (err) {
              return res.json(count_error);
            }
            return res.json({
              total: countDocuments,
              page: page,
              limit: limit,
              pageSize: docs.length,
              messages: docs
            });
          });
        }
    });
})


// router.get('/getInboxMessages2/:receiver_email', function(req, res) {
//     var receiver_email = req.params.receiver_email
   

//     console.log(receiver_email)
//     Message.find().or([{receiver_email: receiver_email, 'isDraft.email': { "$ne": [receiver_email] }, 'isDeleted.email': { "$nin": [receiver_email] }, 'isTrashed.email': { "$nin": [receiver_email] }},
//         {sender_email: receiver_email, "replies.0": {"$exists": true}, 'isDraft.email': { "$nin": [receiver_email] }, 'isDeleted.email': { "$nin": [receiver_email] }, 'isTrashed.email': { "$nin": [receiver_email] }}])
//      .sort({'time': 'desc'})
//      .exec(function(err, docs) {
//         if (err) {
//             res.send({Error: err})
//           } else {
//            res.send(docs)
          
          
//         }
//     });
// })

router.get('/getSentMessages/:sender_email/:page', function(req, res) {
    var sender_email = req.params.sender_email
    console.log(sender_email)
    var page = parseInt(req.params.page) || 0
    var limit = parseInt(req.query.limit) || 2
    var query = {sender_email: sender_email, 'isDraft.email': {"$nin": [sender_email]}, 'isDeleted.email': {"$nin": [sender_email]}, 'isTrashed.email': {"$nin": [sender_email]}}

    Message.find({sender_email: sender_email, 'isDraft.email': {"$nin": [sender_email]}, 'isDeleted.email': {"$nin": [sender_email]}, 'isTrashed.email': {"$nin": [sender_email]}})
     .sort({'time': 'desc'})
     .skip(page * limit)
     .limit(limit)
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            //res.send(docs)
            Message.countDocuments(query).exec((count_error, countDocuments) => {
                if (err) {
                  return res.json(count_error);
                }
                return res.json({
                  total: countDocuments,
                  page: page,
                  limit: limit,
                  pageSize: docs.length,
                  messages: docs
                });
              });
        }
    });
})

router.get('/getStarredMessages/:sender_email/:page', function(req, res) {
    var sender_email = req.params.sender_email
    console.log(sender_email)
    var page = parseInt(req.params.page) || 0
    var limit = parseInt(req.query.limit) || 2
    var query = {$or: [{sender_email: sender_email, 'isStarred.email': {"$eq": [sender_email]}}, {receiver_email: sender_email, 'isStarred.email': {"$eq": [sender_email]}}]}

    
    Message.find().or([{sender_email: sender_email, 'isStarred.email': {"$eq": [sender_email]}}, {receiver_email: sender_email, 'isStarred.email': {"$eq": [sender_email]}}])
     .sort({'time': 'desc'})
     .skip(page * limit)
     .limit(limit)
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            //res.send(docs)
            Message.countDocuments(query).exec((count_error, countDocuments) => {
                if (err) {
                  return res.json(count_error);
                }
                return res.json({
                  total: countDocuments,
                  page: page,
                  limit: limit,
                  pageSize: docs.length,
                  messages: docs
                });
              });
        }
    });
})



router.get('/getDraftedMessages/:sender_email/:page', function(req, res) {
    var sender_email = req.params.sender_email

    var page = parseInt(req.params.page) || 0
   
    var limit = parseInt(req.query.limit) || 2
    var query = {sender_email: sender_email, 'isDraft.email': {"$in": [sender_email]}}
    
    Message.find({sender_email: sender_email, 'isDraft.email': {"$in": [sender_email]}})
     .sort({'time': 'desc'})
     .skip(page * limit)
     .limit(limit)
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            //res.send(docs)
            Message.countDocuments(query).exec((count_error, countDocuments) => {
                if (err) {
                  return res.json(count_error);
                }
                return res.json({
                  total: countDocuments,
                  page: page,
                  limit: limit,
                  pageSize: docs.length,
                  messages: docs
                });
              });
        }
    });
})


router.get('/getDeletedMessages/:sender_email', function(req, res) {
    var sender_email = req.params.sender_email
    
    Message.find({sender_email: sender_email, 'isDeleted.email': {"$in": [sender_email]}})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            res.send(docs)
        }
    });
})



router.get('/getTrashedMessages/:sender_email/:page', function(req, res) {
    var sender_email = req.params.sender_email

    var page = parseInt(req.params.page) || 0
    var limit = parseInt(req.query.limit) || 2
    var query = {sender_email: sender_email, 'isTrashed.email': {"$in": [sender_email]}}
    
    Message.find({sender_email: sender_email, 'isTrashed.email': {"$in": [sender_email]}})
     .sort({'time': 'desc'})
     .skip(page * limit)
     .limit(limit)
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            //res.send(docs)
            Message.countDocuments(query).exec((count_error, countDocuments) => {
                if (err) {
                  return res.json(count_error);
                }
                return res.json({
                  total: countDocuments,
                  page: page,
                  limit: limit,
                  pageSize: docs.length,
                  messages: docs
                });
              });
        }
    });
})



router.get('/getAllMessages/:sender_email', function(req, res) {
    var sender_email = req.params.sender_email
    
    Message.find({sender_email: sender_email})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            res.send(docs)
        }
    });
})

router.get('/getExchangedMessages/:receiver_email/:sender_email/:subject', function(req, res) {
    
    var sender_email = req.params.sender_email
    var receiver_email = req.params.receiver_email
    var subject = req.params.subject
    console.log(receiver_email)
    console.log(sender_email)
    console.log(subject)
    Message.find().or([{receiver_email: receiver_email, sender_email:sender_email, subject: subject}, {receiver_email: sender_email, sender_email:receiver_email, subject: subject}])
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (err) {
            res.send({Error: err})
          } else {
            res.send(docs)
        }
    });

})

module.exports = router;