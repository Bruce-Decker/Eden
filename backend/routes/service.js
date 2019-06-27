const express = require('express');
const router = express.Router();
const Service = require('../schema/Service');
var multer = require('multer');
var fs = require('fs-extra');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = '../client/public/images/service/' + req.body.id
    if (file.fieldname === 'logo') {
      dir += '/logo'
    }
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


router.get('/', function(req, res) {
  if (req.query.user_name != null) {
    const user_name = req.query.user_name
    Service.find({
      user_name: user_name
    }, {
      user_id: 0
    }).then(async (services) => {
      console.log(services)
      res.json(services);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'services not found' });
    });
  } else {
    const nelat = parseFloat(req.query.nelat)
    const nelng = parseFloat(req.query.nelng)
    const swlng = parseFloat(req.query.swlng)
    const swlat = parseFloat(req.query.swlat)
    Property.find({
      lat: { $gte: swlat, $lte: nelat },
      lng: { $gte: swlng, $lte: nelng }
    }, {
      user_id: 0
    }).then(async (services) => {
      console.log(services)
      res.json(services);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'services not found' });
    });
  }
});

router.post('/', upload.fields([{name: 'files', maxCount: 24}, {name: 'logo', maxCount: 1}]), function(req, res) {
  const data = extractRequestData(req)
  Service.create(data, function(err, _) {
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
  const user_id = req.body.user_id
  const data = extractRequestData(req)
  Service.findOneAndUpdate({
      id: id,
      user_id: user_id
    }, 
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
  const user_id = req.body.user_id
  Service.findOneAndDelete({ 
      id: id,
      user_id: user_id
    },
    function(err) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log('service deleted')
        fs.removeSync('../client/public/images/service/' + id); 
        res.json({ msg: 'service deleted' });
      }
  })
})

function extractRequestData(req) {
  const id = req.body.id
  const address = req.body.address
  const state = req.body.state
  const city = req.body.city
  const zip = req.body.zip
  const name = req.body.name
  const desc = req.body.desc
  const email = req.body.email
  const phone = req.body.phone
  const services = req.body.services
  const lat = req.body.lat
  const lng = req.body.lng
  const user_id = req.body.user_id
  const user_name = req.body.user_name
  const logo = req.body.logo
  const images = req.body.images
  const data = {
    id,
    address,
    state,
    city,
    zip,
    name,
    desc,
    email,
    phone,
    services,
    lat,
    lng,
    home_type,
    listing_type,
    num_bath,
    num_bed,
    space,
    price,
    user_id,
    user_name,
    logo,
    images
  }
  return data
}



module.exports = router;