const express = require('express');
const router = express.Router();
const Property = require('../schema/Property');
const uuidv4 = require('uuid/v4');


router.get('/', function(req, res) {
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

router.post('/', function(req, res) {
  const data = extractRequestData(req, uuidv4())
  Property.create(data, function(err, _) {
    if (err) {
      console.log(err)
      res.json({ msg: 'An error occurred, please try again later.' });        
    } else {
      console.log(data)
      res.json({ data: data });
    }
  })
})

router.put('/:id', function(req, res) {
  const id = req.params.id
  const data = extractRequestData(req, id)
  Property.findOneAndUpdate()(
    { id: id }, 
    data,
    _,
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log(data)
        res.json({ data: data });
      }
  })
})

router.delete('/:id', function(req, res) {
  const id = req.params.id
  Property.findOneAndRemove()(
    { id: id },
    function(err) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log('property deleted')
        res.json({ msg: 'property deleted' });
      }
  })
})

function extractRequestData(req, id) {
  const address = req.body.address
  const state = req.body.state
  const city = req.body.city
  const zip = req.body.zip
  const desc = req.body.desc
  const email = req.body.email
  const phone = req.body.phone
  const lat = req.body.lat
  const lng = req.body.lng
  const home_type = req.body.home_type
  const listing_type = req.body.listing_type
  const num_bath = req.body.num_bath
  const num_bed = req.body.num_bed
  const space = req.body.space
  const price = req.body.price
  const user_id = req.body.user_id
  const user_name = req.body.user_name
  const data = {
    id,
    address,
    state,
    city,
    zip,
    desc,
    email,
    phone,
    lat,
    lng,
    home_type,
    listing_type,
    num_bath,
    num_bed,
    space,
    price,
    user_id,
    user_name
  }
  return data
}


module.exports = router;