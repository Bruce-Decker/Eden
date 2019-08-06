const express = require('express');
const router = express.Router();
const Order = require('../schema/Order');

router.post('/addPostChargeInfo', function(req,res) {
  const paymentReceiptUrl = req.body.paymentReceiptUrl;
  const trackingId = req.body.trackingId;
  const orderId = req.body.orderId;
  const carrierCode = req.body.carrierCode;

  Order.update( {'_id': orderId},
    { $set: {'tracking_id': trackingId, 'payment_receipt_url': paymentReceiptUrl, 'status': 'In-progress', 'carrierCode': carrierCode} }, function(err, result) {
      if (err) {
        console.log("Failed to update order " + orderId);
        res.json({ error: 'ERROR: Failed to update order' });
      } else {
        if (result.n === 0){
          res.status(500);
          const orderError = new Error();
          orderError.message = "Order not found";
          res.send(orderError);
        }
        else {
          console.log("Updated order " + orderId + " with tracking number and payment receipt");
          res.json({msg: "Order updated successfully", data: result});
        }
      }
    });
});

router.post('/getAllOrders', function(req,res) {
    const email = req.body.email;
    Order.find({email: email}, function(err, docs) {
        if (err) {
            res.send(err)
        } else {
            res.send(docs)
        }
    })
});

router.get('/:id', function(req,res) {
    const order_id = req.params.id;
    Order.find({_id: order_id}, function(err, docs) {
        if (err) {
            res.send(err)
        } else {
            res.send(docs)
        }
    })
});


module.exports = router;


