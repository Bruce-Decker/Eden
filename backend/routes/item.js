const express = require('express');
const router = express.Router();
const Item = require('../schema/Item');


router.get('/', function(req,res) {
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

router.get('/:id', function(req,res) {

});

module.exports = router;