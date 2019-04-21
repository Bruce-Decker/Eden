const express = require('express');
const router = express.Router();
const Item = require('../schema/Item');
const uuidv4 = require('uuid/v4');




router.post('/createItem', function(req, res) {
    const item_id = uuidv4()
    const item_name = req.body.item_name
    const item_image = req.body.image
    const category = req.body.category
    const description = req.body.description
    const price = req.body.price
    const bid_price = req.body.bid_price

    const data = {
       item_id,
       item_name,
       item_image,
       category,
       description,
       price,
       bid_price
    }

    Item.findOne({item_id: item_id}, function(err, docs) {
      if (docs) {
         Item.findOneAndUpdate({item_id: item_id}, data, function(err, result) {
           if (err) {
                       res.send("Fail")
                      
           } else {
             console.log(result)
                       res.send({msg: "Update successfully", data: data})
                      
            }
        })
      } else {    
          Item.create(data, function(err, newlyCreated) {
            if (err) {
                  res.send({msg: "False"});
                          
            } else {
                  res.send({msg: "True", data: data});
            }
          })
      }
    })   
})

router.get('/getCategory', function(req,res) {
  if(req.query.category == null) {
    Item.find(function(err, doc) {
      if (err) {
        return callback(true, "An error occurred, please try again later.")
      } 
      if (doc) {
        res.json(doc)
      }
    })
  } else {
    Item.find({
      category: req.query.category
    }).then(async (items) => {
      res.json(items);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'category not found' });
    });
  }
});

router.get('/getID', function(req,res) {
  var item_id = req.query.item_id
  Item.find({item_id, item_id}, function(err, docs) {
     if (err) {
       res.send(err)
     } else {
       res.send(docs)
     }
  })

});

module.exports = router;