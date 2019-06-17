const express = require('express');
const router = express.Router();
const PurchasedItems = require('../schema/PurchasedItems');
const uuidv4 = require('uuid/v4');



router.post('/addPurchasedItem', function(req, res) {
     var tracking_id = uuidv4()
     var email = req.body.email
     var item_id = req.body.item_id
     var estimated_delivery_date = req.body.estimated_delivery_date
     var purchased_date = req.body.purchased_date
     var data = {
         tracking_id,
         email,
         item_id,
         estimated_delivery_date,
         purchased_date
     }
     PurchasedItems.findOne({tracking_id: tracking_id}, function(err, docs) {
         if (docs) {
            PurchasedItems.findOneAndUpdate({tracking_id: tracking_id}, data, function(err, result) {
                 if (err) {
                    res.send("Fail")
                 } else {
                    res.send(result)
                 }
            })
         } else {
            PurchasedItems.create(data, function(err, newlyCreated) {
                if (err) {
                    res.send("Fail")
                } else {
                    res.send({msg: "True", newlyCreated});
                }
            })
         }
     })
})


router.get('/purchasedItemFromTrackingID', function(req, res) {
    var tracking_id = req.body.tracking_id
    PurchasedItems.findOne({tracking_id: tracking_id}, function(err, docs) {
        if (err) {
            console.log("Error Data")
             res.send({msg: "False"})
        } else {
            res.send(docs)
        }
    })
})

router.get('/purchasedItemFromEmail', function(req, res) {
    var email = req.body.email
    PurchasedItems.find({email: email}, function(err, docs) {
        if (err) {
            console.log("Error Data")
             res.send({msg: "False"})
        } else {
            res.send(docs)
        }
    })
})

module.exports = router;