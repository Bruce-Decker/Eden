const express = require('express')
const router = express.Router()
const Message = require('../schema/Message')
const uuidv4 = require('uuid/v4');


router.post('/sendMessage', (req, res) => {
    var message_id = uuidv4()
    var sender_email = req.body.sender_email
    var receiver_email = req.body.receiver_email
    var subject = req.body.subject
    var message = req.body.message
    var isRead = false
    var isStarred = false
    var isTrashed = false
    var isDeleted = false
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


router.get('/getInboxMessages/:receiver_email', function(req, res) {
    var receiver_email = req.params.receiver_email
    console.log(receiver_email)
    Message.find({receiver_email: receiver_email})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (docs) {
            res.send(docs)
        } else {
            res.send({})
        }
    });
})

router.get('/getSentMessages/:sender_email', function(req, res) {
    var sender_email = req.params.sender_email
    
    Message.find({sender_email: sender_email})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (docs) {
            res.send(docs)
        } else {
            res.send({})
        }
    });
})

router.get('/getStarredMessages/:sender_email', function(req, res) {
    var sender_email = req.params.sender_email
    
    Message.find({sender_email: sender_email, isStarred: true})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (docs) {
            res.send(docs)
        } else {
            res.send({})
        }
    });
})



router.get('/getDraftedMessages/:sender_email', function(req, res) {
    var sender_email = req.params.sender_email
    
    Message.find({sender_email: sender_email, isDraft: true})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (docs) {
            res.send(docs)
        } else {
            res.send({})
        }
    });
})


router.get('/getTrashedMessages/:sender_email', function(req, res) {
    var sender_email = req.params.sender_email
    
    Message.find({sender_email: sender_email, isTrashed: true})
     .sort({'time': 'desc'})
     .exec(function(err, docs) {
        if (docs) {
            res.send(docs)
        } else {
            res.send({})
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
        if (docs) {

            res.send(docs)
        } else {
            res.send({})
        }
    });

})

module.exports = router;