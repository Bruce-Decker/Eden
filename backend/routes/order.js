const express = require('express');
const router = express.Router();
const Order = require('../schema/Order');

router.post('/update_order', function(req,res) {
  const paymentReceiptUrl = req.body.paymentReceiptUrl;
  const trackingId = req.body.trackingId;
  const orderId = req.body.orderId;

  Order.update( {'order_id': orderId},
    { $set: {'tracking_id': trackingId, 'payment_receipt_url': paymentReceiptUrl} }, function(err, result) {
      if (err) {
        console.log("Failed to update order " + orderId);
        res.send("Failed to update order");
      } else {
        console.log("Updated order " + orderId + " with tracking number and payment receipt");
        res.send("Updated order successfully");
      }
    });
});

module.exports = router;


