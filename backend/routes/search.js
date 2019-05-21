const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Item = require('../schema/Item');
var localStorage = require('localStorage');

router.get('/getSearchResults', function(req,res) {
  console.log(req.query);
  const is_simple_search = req.query.simple;
  const keyword = req.query.keyword;

  if(is_simple_search == 'true') {

    let re = '.*'+keyword+'.*';
    Item.find({
      '$or': [
        {'item_name': {'$regex': re}},
        {'category': {'$regex': re}},
        {'description': {'$regex': re}}
      ]
    },{ _id: 0 }).then((itms) => {

      let ret = itms.map(i => i._doc);
      res.json(ret);

    }).catch(err => {

      console.log(err);
      res.json({ msg: 'ERROR: no cart found for user' });

    });

  } else {
    // TODO: handle advanced search here
    res.json({ msg: 'success' });
  }
});

module.exports = router;