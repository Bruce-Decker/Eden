const express = require('express');
const router = express.Router();
var async = require('async');
const Item = require('../schema/Item');
const UserRec = require('../schema/UserRec')
const ItemRec = require('../schema/ItemRec')

router.post('/getUserRecs', function(req, res) {
  const uid = req.body.email;
  console.log('Fetching recommendations for user ' + uid);

  UserRec.findOne({user_id: uid}, async function(err, docs) {
    if (docs) {

      const recIds = docs._doc.recs;
      let ret = [];

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

      // obtain item details synchronously
      for(let i=0; i<recIds.length; i++) {
        let obj = {}
        let cur_iid = recIds[i];
        let dbItem = await itemPromise(cur_iid);

        obj['id'] = dbItem._doc.item_id;
        obj['seller'] = dbItem._doc.email;
        obj['name'] = dbItem._doc.item_name;
        obj['image'] = dbItem._doc.item_image;
        obj['description'] = dbItem._doc.description;
        obj['category'] = dbItem._doc.category;
        obj['price'] = dbItem._doc.price;

        ret.push(obj);
      }

      // return the list of items to the front-end page
      res.json(ret);

    } else {
      console.log(err);
      res.send("No recommendations found for user " + uid);
    }
  });
});

router.post('/getItemRecs', function(req, res) {
  const iid = req.body.iid;
  console.log('Fetching recommendations for item ' + iid);

  ItemRec.findOne({item_id: iid}, async function(err, docs) {
    if (docs) {

      const recIds = docs._doc.recs;
      let ret = [];

      // use promise to enforce synchronous results
      let itemPromise = (iiid) => {
        return new Promise((resolve, reject) => {
          Item.findOne({
            item_id: iiid
          }).then(dbItem => {
            resolve(dbItem);
          }).catch(err => {
            reject(err);
          });
        });
      };

      // obtain item details synchronously
      for(let i=0; i<recIds.length; i++) {
        let obj = {}
        let cur_iid = recIds[i];
        let dbItem = await itemPromise(cur_iid);

        obj['id'] = dbItem._doc.item_id;
        obj['seller'] = dbItem._doc.email;
        obj['name'] = dbItem._doc.item_name;
        obj['image'] = dbItem._doc.item_image;
        obj['description'] = dbItem._doc.description;
        obj['category'] = dbItem._doc.category;
        obj['price'] = dbItem._doc.price;

        ret.push(obj);
      }

      // return the list of items to the front-end page
      res.json(ret);

    } else {
      console.log(err);
      res.send("No recommendations found for user " + iid);
    }
  });
});

module.exports = router;