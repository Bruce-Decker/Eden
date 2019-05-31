const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Item = require('../schema/Item');
var localStorage = require('localStorage');
const itemsPerPage = 10;

var searchResults = [];

router.get('/getSearchResults', function(req,res) {
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
      let results = itms.map(i => i._doc);
      searchResults = Object.assign([], results);

      let ret = {
        numItems: results.length,
        itemsPerPage: itemsPerPage,
        items: results.slice(0, itemsPerPage)
      };

      res.json(ret);

    }).catch(err => {

      console.log(err);
      res.json({ msg: 'ERROR: search failed' });

    });

  } else {
    // TODO: handle advanced search here
    res.json({ msg: 'success' });
  }
});

router.get('/getSearchPage', function(req,res) {
  const pageNumber = parseInt(req.query.pageNumber);
  let low = (pageNumber-1) * itemsPerPage;
  let high = pageNumber * itemsPerPage;
  let items = searchResults.slice(low, high);
  res.json(items);
});

module.exports = router;