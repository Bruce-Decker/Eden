const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const Delivery = require('../schema/Delivery');

router.get('/getDeliveryByID', function(req,res) {
    const tracking_id = req.query.tracking_id;
    Delivery.find({tracking_id: tracking_id, deliver_status: false}, function(err, docs) {
       if (err) {
         res.send(err)
       } else {
         res.send(docs)
       }
    })
});


router.get('/getDeliveryByEmail', function(req,res) {
    const email = req.body.email;
    Delivery.find({email: email, deliver_status: false}, function(err, docs) {
       if (err) {
         res.send(err)
       } else {
         res.send(docs)
       }
    })
});


router.post('/createDelivery', function(req, res) {
    const tracking_id = uuidv4()
    const item_id = req.body.item_id
    const item_address = req.body.item_address
    const quantity = req.body.quantity
    const email = req.body.email
    const destination_address = req.body.destination_address
    const deliver_status = req.body.deliver_status
    const order_date = req.body.order_date

    var data = {
        tracking_id,
        item_id,
        item_address,
        quantity,
        email,
        destination_address,
        deliver_status,
        order_date
    }

    Delivery.findOne({tracking_id: tracking_id}, function(err, docs) {
        if (docs) {
            Delivery.findOneAndUpdate({tracking_id: tracking_id}, data, function(err, result) {
            if (err) {
              res.send("Failed to update delivery");   
            } else {
              console.log(result);
              res.send({msg: "Updated delivery successfully", result});
            }
          });
        } else {    
            Delivery.create(data, function(err, newlyCreated) {
            if (err) {
              res.send({msg: "Failed to create delivery"});
            } else {
              res.send({msg: "Created delivery successfully", newlyCreated});
            }
          });
        }
      });
})


module.exports = router;


