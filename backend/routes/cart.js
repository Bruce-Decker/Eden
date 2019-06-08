const express = require('express');
const router = express.Router();
var async = require('async');
const jwt = require('jsonwebtoken');
const Cart = require('../schema/Cart');
const Item = require('../schema/Item');
var localStorage = require('localStorage');


router.get('/getCartByID', function(req,res) {
  const cart_id = req.query.cart_id;
  Cart.find({cart_id: cart_id}, function(err, docs) {
     if (err) {
       res.send(err)
     } else {
       res.send(docs)
     }
  })
});

router.post('/createCart', function(req, res) {
  const cart_id = req.body.cart_id;
  const items = req.body.items;
  const email = req.body.email;
 

  const data = {
    cart_id,
    items,
    email
  };

  Cart.findOne({cart_id: cart_id}, function(err, docs) {
    if (docs) {
      Cart.findOneAndUpdate({cart_id: cart_id}, data, function(err, result) {
        if (err) {
          res.send("Failed to update cart");   
        } else {
          console.log(result);
          res.send({msg: "Updated cart successfully", data: data});
        }
      });
    } else {    
      Cart.create(data, function(err, newlyCreated) {
        if (err) {
          res.send({msg: "Failed to create cart"});
        } else {
          res.send({msg: "Created cart successfully", data: data});
        }
      });
    }
  });
});

router.get('/getCartItems', function(req,res) {
  const email = req.query.email;

  Cart.findOne({email: email},{ _id: 0 }).then(async (cart) => {
    let items = cart._doc.items;
    let ret = []

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
      let obj = {}
      let cur_item = items[i];
      let dbItem = await itemPromise(cur_item.item_id);

      obj['id'] = dbItem._doc.item_id;
      obj['name'] = dbItem._doc.item_name;
      obj['image'] = dbItem._doc.item_image;
      obj['description'] = dbItem._doc.description;
      obj['category'] = dbItem._doc.category;
      obj['price'] = dbItem._doc.price;

      ret.push(obj);
    }

    // return the list of items in the cart to the front-end
    res.json(ret);
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'ERROR: no cart found for user' });
  });
});

module.exports = router;