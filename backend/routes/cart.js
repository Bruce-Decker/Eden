const express = require('express');
const router = express.Router();
var async = require('async');
const jwt = require('jsonwebtoken');
const Cart = require('../schema/Cart');
const Item = require('../schema/Item');
var localStorage = require('localStorage');

router.get('/getCartItems', function(req,res) {
  res.json({ msg: 'Cart Works' });
});

module.exports = router;