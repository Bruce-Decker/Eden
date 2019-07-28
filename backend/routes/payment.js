const express = require('express');
const router = express.Router();
const Order = require('../schema/Order');
const Cart = require('../schema/Cart');
const Item = require('../schema/Item');
const keys = require('../key/keys');
const stripe = require("stripe")(keys.stripeApiKey);
const bodyParser = require("body-parser");

let paymentMethods= [
    // 'ach_credit_transfer', // usd (ACH Credit Transfer payments must be in U.S. Dollars)
    'alipay', // aud, cad, eur, gbp, hkd, jpy, nzd, sgd, or usd.
    'bancontact', // eur (Bancontact must always use Euros)
    'card', // many (https://stripe.com/docs/currencies#presentment-currencies)
    'eps', // eur (EPS must always use Euros)
    'ideal', // eur (iDEAL must always use Euros)
    'giropay', // eur (Giropay must always use Euros)
    'multibanco', // eur (Multibanco must always use Euros)
    // 'sepa_debit', // Restricted. See docs for activation details: https://stripe.com/docs/sources/sepa-debit
    'sofort', // eur (SOFORT must always use Euros)
    'wechat', // aud, cad, eur, gbp, hkd, jpy, sgd, or usd.
    ];

router.post('/charge', function(req,res) {
    const email = req.body.email;
    stripe.charges.create({
        amount: req.body.amount*100,
        description: req.body.description,
        currency: "usd",
        source: "tok_mastercard"//req.body.stripe_token
    })
    .then(charge => {
        charge.amount = charge.amount/100;
        Cart.findOne({email: email},{ _id: 0 }).then(async (cart) => {
            let items = cart._doc.items;
            let ret = [];

            // use promise to enforce synchronous results
            let itemPromise = (iid) => {
                return new Promise((resolve, reject) => {
                    Item.findOne({
                        item_id: iid
                    }).then(dbItem => {
                        resolve(dbItem);
                    }).catch(err => {
                        reject(err);
                    });
                });
            };

            // obtain description, category, and price from item details
            for(let i=0; i<items.length; i++) {
                let obj = {};
                let cur_item = items[i];
                let dbItem = await itemPromise(cur_item.item_id);

                obj['item_id'] = dbItem._doc.item_id;
                obj['seller'] = dbItem._doc.email;
                obj['item_name'] = dbItem._doc.item_name;
                obj['item_image'] = dbItem._doc.item_image;
                obj['description'] = dbItem._doc.description;
                obj['category'] = dbItem._doc.category;
                obj['price'] = dbItem._doc.price;
                obj['quantity'] = cur_item.quantity;

                ret.push(obj);
            }
            const current_order = {
                user_id: "1234",
                email: email,
                price: req.body.amount,
                status: "processing",
                items: ret
            };

            Order.create(current_order, function(err, newlyCreated) {
                if (err) {
                    res.send({msg: "Failed to create Order", error: err});
                } else {
                    console.log({msg: "Created Order successfully", data: current_order});
                    res.send(charge);
                }
            });
        }).catch(err => {
            console.log(err);
            res.json({ msg: 'ERROR: no cart found for user' });
        });
        //TODO clear cart and save payment and cart data to purchasedItem table
    })
    .catch(err => {
        console.log("Error:", err);
        var paymentError = new Error();
        paymentError.statusCode = 400;
        paymentError.detail = err;
        paymentError.message = "Purchase Failed";
        res.send(paymentError);
    });
});

// Create the PaymentIntent on the backend.
router.post('/payment_intents', async (req, res, next) => {
    let {currency,  amount} = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: paymentMethods,
        });
        return res.status(200).json({paymentIntent});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

// Update PaymentIntent with shipping cost.
router.post('/payment_intents/:id/shipping_change', async (req, res, next) => {
    const {items, shippingOption} = req.body;
    let amount = await calculatePaymentAmount(items);
    amount += products.getShippingCost(shippingOption.id);

    try {
        const paymentIntent = await stripe.paymentIntents.update(req.params.id, {
            amount,
        });
        return res.status(200).json({paymentIntent});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

// Webhook handler to process payments for sources asynchronously.
router.post('/webhook', async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    if (config.stripe.webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                config.stripe.webhookSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
    } else {
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }
    const object = data.object;

    // Monitor payment_intent.succeeded & payment_intent.payment_failed events.
    if (object.object === 'payment_intent') {
        const paymentIntent = object;
        if (eventType === 'payment_intent.succeeded') {
            console.log(
                `🔔  Webhook received! Payment for PaymentIntent ${
                    paymentIntent.id
                    } succeeded.`
            );
        } else if (eventType === 'payment_intent.payment_failed') {
            const paymentSourceOrMethod = paymentIntent.last_payment_error
                .payment_method
                ? paymentIntent.last_payment_error.payment_method
                : paymentIntent.last_payment_error.source;
            console.log(
                `🔔  Webhook received! Payment on ${paymentSourceOrMethod.object} ${
                    paymentSourceOrMethod.id
                    } of type ${paymentSourceOrMethod.type} for PaymentIntent ${
                    paymentIntent.id
                    } failed.`
            );
        }
    }

    // Monitor `source.chargeable` events.
    if (
        object.object === 'source' &&
        object.status === 'chargeable' &&
        object.metadata.paymentIntent
    ) {
        const source = object;
        console.log(`🔔  Webhook received! The source ${source.id} is chargeable.`);
        // Find the corresponding PaymentIntent this source is for by looking in its metadata.
        const paymentIntent = await stripe.paymentIntents.retrieve(
            source.metadata.paymentIntent
        );
        // Check whether this PaymentIntent requires a source.
        if (paymentIntent.status != 'requires_payment_method') {
            return res.sendStatus(403);
        }
        // Confirm the PaymentIntent with the chargeable source.
        await stripe.paymentIntents.confirm(paymentIntent.id, {source: source.id});
    }

    // Monitor `source.failed` and `source.canceled` events.
    if (
        object.object === 'source' &&
        ['failed', 'canceled'].includes(object.status) &&
        object.metadata.paymentIntent
    ) {
        const source = object;
        console.log(`🔔  The source ${source.id} failed or timed out.`);
        // Cancel the PaymentIntent.
        await stripe.paymentIntents.cancel(source.metadata.paymentIntent);
    }

    // Return a 200 success code to Stripe.
    res.sendStatus(200);
});

// Retrieve the PaymentIntent status.
router.get('/payment_intents/:id/status', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    res.json({paymentIntent: {status: paymentIntent.status}});
});

router.post('/order', function(req,res) {
    const email = req.body.email;

    Cart.findOne({email: email},{ _id: 0 }).then(async (cart) => {
        let items = cart._doc.items;
        let ret = [];

        // use promise to enforce synchronous results
        let itemPromise = (iid) => {
            return new Promise((resolve, reject) => {
                Item.findOne({
                    item_id: iid
                }).then(dbItem => {
                    resolve(dbItem);
                }).catch(err => {
                    reject(err);
                });
            });
        };

        var total_price = 0;
        // obtain description, category, and price from item details
        for(let i=0; i<items.length; i++) {
            let obj = {};
            let cur_item = items[i];
            let dbItem = await itemPromise(cur_item.item_id);

            obj['item_id'] = dbItem._doc.item_id;
            obj['seller'] = dbItem._doc.email;
            obj['item_name'] = dbItem._doc.item_name;
            obj['item_image'] = dbItem._doc.item_image;
            obj['description'] = dbItem._doc.description;
            obj['category'] = dbItem._doc.category;
            obj['price'] = dbItem._doc.price;
            obj['quantity'] = cur_item.quantity;

            ret.push(obj);

            total_price = total_price + (obj.price*obj.quantity);
        }
        const current_order = {
            user_id: "1234",
            email: email,
            price: total_price.toString(),
            tracking_id: req.body.tracking_id,
            payment_receipt_url: req.body.payment_url,
            items: ret
        };

        Order.create(current_order, function(err, newlyCreated) {
            if (err) {
                res.send({msg: "Failed to create Order", error: err});
            } else {
                res.send({msg: "Created Order successfully", data: current_order});
            }
        });
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'ERROR: no cart found for user' });
    });
});
module.exports = router;