const express = require('express');
const router = express.Router();
const keys = require('../key/keys');
const stripe = require("stripe")(keys.stripeApiKey);
const bodyParser = require("body-parser");

router.post('/charge', function(req,res) {
    stripe.charges.create({
        amount: req.body.amount*100,
        description: "Sample Charge",
        currency: "usd",
        source: "tok_mastercard"
    })
    .then(charge => {
        charge.amount = charge.amount/100;
        res.send(charge)
        //TODO clear cart and save payment and cart data to purchasedItem table
    })
    .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
    });
});

module.exports = router;