const express = require('express');
const router = express.Router();
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

module.exports = router;