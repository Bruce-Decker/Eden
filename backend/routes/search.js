const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Item = require('../schema/Item');
var localStorage = require('localStorage');

router.get('/getSearchResults', function(req,res) {
  const isSimpleSearch = req.query.simple;
  const searchType = req.query.searchType;
  const keyword = req.query.keyword;
  const category = req.query.category.substring(4);
  const pageNumber = req.query.pageNumber || 1;
  const itemsPerPage = req.query.itemsPerPage || 10;

  if(searchType == 'itm') {
    if(isSimpleSearch == 'true') {

      let re = '.*'+keyword+'.*';
      Item.find({
        '$or': [
          {'item_name': {'$regex': re}},
          {'description': {'$regex': re}}
        ]
      },{ _id: 0 }).skip((pageNumber - 1) * itemsPerPage).then((itms) => {
        let results = itms.map(i => i._doc);

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
      
      let re = '.*'+keyword+'.*';
      Item.find({
        '$and': [
          {
            'category': category
          },
          {
            '$or': [
              {'item_name': {'$regex': re}},
              {'description': {'$regex': re}}
            ]
          }
        ]
      },{ _id: 0 }).skip((pageNumber - 1) * itemsPerPage).then((itms) => {
        let results = itms.map(i => i._doc);

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

    }
  } else if (searchType == 'svc') {
    if(isSimpleSearch == 'true') {

      let re = '.*'+keyword+'.*';
      Service.find({
        '$or': [
          {'name': {'$regex': re}},
          {'desc': {'$regex': re}},
          {'email': {'$regex': re}},
          {'services': {'$elemMatch': {'$regex': re}}}
        ]
      },{
        _id: 0,
        "reviews.rating": 0,
        "reviews.comments": 0
      }).skip((pageNumber - 1) * itemsPerPage).then((itms) => {
        let results = itms.map(i => i._doc);

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
      
      let re = '.*'+keyword+'.*';
      Service.find({
        '$and': [
          {
            'category': category
          },
          {
            '$or': [
              {'name': {'$regex': re}},
              {'desc': {'$regex': re}},
              {'email': {'$regex': re}},
              {'services': {'$elemMatch': {'$regex': re}}}
            ]
          }
        ]
      },{
        _id: 0,
        "reviews.rating": 0,
        "reviews.comments": 0
      }).skip((pageNumber - 1) * itemsPerPage).then((itms) => {
        let results = itms.map(i => i._doc);

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

    }
  }
});

module.exports = router;