const express = require('express');
const router = express.Router();
const Property = require('../schema/Property');


router.get('/', function(req,res) {
  const nelat = parseFloat(req.query.nelat)
  const nelng = parseFloat(req.query.nelng)
  const swlng = parseFloat(req.query.swlng)
  const swlat = parseFloat(req.query.swlat)
  const price = parseFloat(req.query.price) || 0
  const bed = parseInt(req.query.bed) || 0
  const type = req.query.type
  const listing = req.query.listing
  Property.find({
    lat: { $gte: swlat, $lte: nelat },
    lng: { $gte: swlng, $lte: nelng },
    price: { $gte: price },
    num_bed: { $gte: bed },
    home_type: type,
    listing_type: listing
  }).then(async (properties) => {
    console.log(properties)
    res.json(properties);
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'properties not found' });
  });
});

module.exports = router;