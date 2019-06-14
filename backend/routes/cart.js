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

router.post('/addToCart', function(req, res) {
  const email = req.body.email;
  const iid = req.body.iid;

  Cart.findOne( {'email': email, 'items.item_id': iid}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result == null) {
        Cart.update( {'email': email },
          { $push: {'items': { 'item_id': iid,
                               'quantity': 1 } } }, function(err, result) {
          if (err) {
            console.log("Failed to add item " + iid + " to cart");
            res.send("Failed to add item to cart");
          } else {
            console.log("Added item " + iid + " to cart successfully");
            res.send("Added item to cart successfully");
          }
        });
      } else {
        // the item is already in the cart!
        console.log("Failed to add item to cart: item already in cart!");
        res.send("Failed to add item to cart: item already in cart!");
      }
    }
  });
});

router.post('/changeQuantity', function(req, res) {
  const email = req.body.email;
  const iid = req.body.iid;
  const newQuantity = parseInt(req.body.newQuantity);

  Cart.update( {'email': email, 'items.item_id': iid},
    { $set: {'items.$.quantity': newQuantity} }, function(err, result) {
    if (err) {
      console.log("Failed to change quantity for item " + iid);
      res.send("Failed to change quantity for item");
    } else {
      console.log("Changed item " + iid + " quantity successfully");
      res.send("Changed item quantity successfully");
    }
  });
});

router.post('/removeFromCart', function(req, res) {
  const email = req.body.email;
  const iid = req.body.iid;

  Cart.update( {'email': email, 'items.item_id': iid},
    { $pull: {'items': { 'item_id': iid } } }, function(err, result) {
    if (err) {
      console.log("Failed to remove item " + iid + " from cart");
      res.send("Failed to remove item from cart");
    } else {
      console.log("Removed item " + iid + " from cart successfully");
      res.send("Removed item from cart successfully");
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
      obj['quantity'] = cur_item.quantity;

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