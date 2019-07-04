const express = require('express');
const router = express.Router();
const Service = require('../schema/Service');
var multer = require('multer');
var fs = require('fs-extra');
const uuidv4 = require('uuid/v4');

const itemsPerPage = 15
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
      "reviews.rating": 0,
      "reviews.comments": 0
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
    const category = req.query.category
    const pageNumber = parseInt(req.query.page)
    Service.find({
      lat: { $gte: swlat, $lte: nelat },
      lng: { $gte: swlng, $lte: nelng },
      category: category
    }, {
      "reviews.rating": 0,
      "reviews.comments": 0
    }).then(async (services) => {
      console.log(services)
      const start = (pageNumber - 1) * itemsPerPage
      const ret = {
        numItems: services.length,
        itemsPerPage: itemsPerPage,
        services: services.slice(start, start + itemsPerPage)
      };
      res.json(ret);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'services not found' });
    });
  }
});

router.get('/:id', function(req, res) {
  const id = req.params.id
  Service.find({
    id: id
  }, {
    "reviews.comments.user_id": 0
  }).then(async (service) => {
    console.log(service)
    res.json(service);
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'service not found' });
  });
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

router.post('/:sid/comments/:cid/downvote', function(req, res) {
  const user_name = req.body.user_name
  Service.findOne({
    id: req.params.sid,
  }).then(async (service) => {
    service = service.toObject()
    const index = service.reviews.comments.findIndex(obj => obj.id == req.params.cid);
    let comment = service.reviews.comments[index]
    if (!(user_name in comment.downvote)) {
      if (user_name in comment.upvote) {
        delete comment.upvote[user_name]
      }
      comment.downvote[user_name] = true
    } else {
      delete comment.downvote[user_name]
    }
    service.reviews.comments[index] = comment
    Service.findOneAndUpdate({
      id: req.params.sid,
    },
    service,
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log('service updated')
        res.json({ comment });
      }
    })
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'An error occurred, please try again later.' });
  });
})

router.post('/:sid/comments/:cid/upvote', function(req, res) {
  const user_name = req.body.user_name
  Service.findOne({
    id: req.params.sid,
  }).then(async (service) => {
    service = service.toObject()
    const index = service.reviews.comments.findIndex(obj => obj.id == req.params.cid);
    let comment = service.reviews.comments[index]
    if (!(user_name in comment.upvote)) {
      if (user_name in comment.downvote) {
        delete comment.downvote[user_name]
      }
      comment.upvote[user_name] = true
    } else {
      delete comment.upvote[user_name]
    }
    service.reviews.comments[index] = comment
    Service.findOneAndUpdate({
      id: req.params.sid,
    },
    service,
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log('service updated')
        res.json({ comment });
      }
    })
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'An error occurred, please try again later.' });
  });
})

router.post('/:id/review', function(req, res) {
  const user_id = req.body.user_id
  const user_name = req.body.user_name
  const rating = req.body.rating
  const review = req.body.review
  Service.findOne({
    id: req.params.id,
  }).then(async (service) => {
    service = service.toObject()
    service.reviews.count += 1
    service.reviews.rating += rating
    service.rating = service.reviews.rating / service.reviews.count
    data = {
      'id': uuidv4(),
      'rating': rating,
      'user_name': user_name,
      'user_id': user_id,
      'comment': review
    }
    service.reviews.comments.push(data)
    Service.findOneAndUpdate({
      id: req.params.id,
    },
    service,
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log('service updated')
        res.json({ service });
      }
    })
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'An error occurred, please try again later.' });
  });
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