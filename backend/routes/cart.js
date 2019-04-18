const express = require('express');
const router = express.Router();
var async = require('async');
const jwt = require('jsonwebtoken');
const Cart = require('../schema/Cart');
const Item = require('../schema/Item');
var localStorage = require('localStorage');

router.get('/getCartItems', function(req,res) {
  // placeholder: need to get actual logged-in user ID
  uid = 0

  Cart.find({
    user_id: uid.toString()
  },{ _id: 0 }).then(async (cart) => {
    let items = cart.map(x => x._doc);

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
      let cur_item = items[i];
      let dbItem = await itemPromise(cur_item.item_id);

      items[i].description = dbItem._doc.description;
      items[i].category = dbItem._doc.category;
      items[i].price = dbItem._doc.price;
    }

    // return the list of items in the cart to the front-end
    res.json(items);
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'ERROR: no cart found for user' });
  });
});

module.exports = router;