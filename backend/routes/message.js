const express = require('express')
const router = express.Router()
const Message = require('../schema/Message')

router.post('/sendMessage', (req, res) => {
    var subject = req.body.subject
    var message = req.body.message
    var sender_email = req.body.sender_email
    var receiver_email = req.body.receiver_email
    var time = Date.now()
    
    var data = {
        sender_email,
        receiver_email,
        subject,
        message,
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


router.get('/getReceivedMessages/:receiver_email', function(req, res) {
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