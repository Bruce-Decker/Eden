const express = require('express');
const router = express.Router();
var async = require('async');
const jwt = require('jsonwebtoken');
const Item = require('../schema/Item');
var localStorage = require('localStorage');

// TODO: get the bids that the logged-in user has made
router.get('/getBidsByUser', function(req,res) {
  const email = req.query.email;
  Item.find({email: email}, function(err, docs) {
     if (err) {
       res.send(err)
     } else {
       res.send(docs)
     }
  })
});

// make a bid
router.post('/makeBid', function(req, res) {
  const email = req.body.email;
  const iid = req.body.iid;
  const amount = req.body.amount;
  const date = new Date();

  Item.update({
      'item_id': iid
    },
    {
      '$push': {
        'bids': {
          'email': email,
          'amount': amount,
          'time': date
        }
      }
    }, function(err, result) {
    if (err) {
      res.json({err_msg: "Failed to make bid"});   
    } else {
      console.log(result);
      res.json({msg: "Made bid successfully", data: result});
    }
  });
});

module.exports = router;












