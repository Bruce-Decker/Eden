const express = require('express');
const router = express.Router();
const Order = require('../schema/Order');

router.post('/addPostChargeInfo', function(req,res) {
  const paymentReceiptUrl = req.body.paymentReceiptUrl;
  const trackingId = req.body.trackingId;
  const orderId = req.body.orderId;

  Order.update( {'order_id': orderId},
    { $set: {'tracking_id': trackingId, 'payment_receipt_url': paymentReceiptUrl, 'status': 'In-progress'} }, function(err, result) {
      if (err) {
        console.log("Failed to update order " + orderId);
        res.json({ error: 'ERROR: Failed to update order' });
      } else {
        console.log("Updated order " + orderId + " with tracking number and payment receipt");
        res.json({msg: "Order updated successfully"});
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


module.exports = router;


