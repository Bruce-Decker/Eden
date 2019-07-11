const express = require('express');
const router = express.Router();
const Service = require('../schema/Service');
var multer = require('multer');
var fs = require('fs-extra');
const uuidv4 = require('uuid/v4');

const itemsPerPage = 15
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = '../client/public/images/service/' + req.body._id
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    if (file.fieldname === 'file') {
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
      "_id": 1,
      "name": 1,
      "rating": 1,
      "category": 1
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
  Service.findOne({
    _id: id
  }, {
    "reviews.comments.user_id": 0
  }).then(async (service) => {
    console.log(service.toObject())
    res.json(service);
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'service not found' });
  });
});

router.post('/', upload.fields([{name: 'files', maxCount: 24}, {name: 'file', maxCount: 1}]), function(req, res) {
  const data = extractRequestData(req)
  console.log(data)
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
    _id: req.params.sid,
    "reviews.comments._id": req.params.cid
  }, { 
    "reviews.comments.$": 1
  }).then(async (service) => {
    service = service.toObject()
    let comment = service.reviews.comments[0]
    if (comment.downvote.indexOf(user_name) == -1) {
      if (comment.upvote.indexOf(user_name) != -1) {
        comment.upvote.splice(comment.upvote.indexOf(user_name), 1)
      }
      comment.downvote.push(user_name)
    } else {
      comment.downvote.splice(comment.downvote.indexOf(user_name), 1)
    }
    Service.findOneAndUpdate({
      _id: service._id,
      "reviews.comments._id": comment._id
    }, { 
      "$set": {
        "reviews.comments.$": comment
      }
    },
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log(comment)
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
    _id: req.params.sid,
    "reviews.comments._id": req.params.cid
  }, { 
    "reviews.comments.$": 1
  }).then(async (service) => {
    service = service.toObject()
    let comment = service.reviews.comments[0]
    if (comment.upvote.indexOf(user_name) == -1) {
      if (comment.downvote.indexOf(user_name) != -1) {
        comment.downvote.splice(comment.downvote.indexOf(user_name), 1)
      }
      comment.upvote.push(user_name)
    } else {
      comment.upvote.splice(comment.upvote.indexOf(user_name), 1)
    }
    Service.findOneAndUpdate({
      _id: service._id,
      "reviews.comments._id": comment._id
    }, { 
      "$set": {
        "reviews.comments.$": comment
      }
    },
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log(comment)
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
    _id: req.params.id,
  }, { 
    "rating": 1,
    "reviews.count": 1,
    "reviews.rating": 1
  }).then(async (service) => {
    service = service.toObject()
    service.reviews.count += 1
    service.reviews.rating += rating
    service.rating = service.reviews.rating / service.reviews.count
    data = {
      'rating': rating,
      'user_name': user_name,
      'user_id': user_id,
      'comment': review
    }
    Service.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $push: {
        "reviews.comments": data
      },
      "reviews.rating": service.reviews.rating,
      "reviews.count": service.reviews.count,
      rating: service.rating
    },
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log(service)
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

router.delete('/:sid/comments/:cid', function(req, res) {
  const user_id = req.body.user_id
  Service.findOne({
    _id: req.params.sid,
    "reviews.comments._id": req.params.cid
  }, { 
    rating: 1,
    "reviews.rating": 1,
    "reviews.count": 1,
    "reviews.comments.$": 1
  }).then(async (service) => {
    service = service.toObject()
    let comment = service.reviews.comments[0]
    if (comment.user_id != user_id) throw 'invalid user id'
    service.reviews.count -= 1
    service.reviews.rating -= service.reviews.comments[0].rating
    service.rating = service.reviews.count > 0 ? service.reviews.rating / service.reviews.count : 0
    Service.findOneAndUpdate({
      _id: req.params.sid,
    }, {
      $pull: {
        "reviews.comments": { _id: req.params.cid }
      },
      "reviews.rating": service.reviews.rating,
      "reviews.count": service.reviews.count,
      rating: service.rating
    },
    function(err, data) {
      if (err) {
        console.log(err)
        res.json({ msg: 'An error occurred, please try again later.' });        
      } else {
        console.log("comment deleted")
        res.json({ msg: "comment deleted"});
      }
    })
  }).catch(err => {
    console.log(err);
    res.json({ msg: 'An error occurred, please try again later.' });
  });
})

function extractRequestData(req) {
  const _id = req.body._id
  const address = req.body.address
  const state = req.body.state
  const city = req.body.city
  const zip = req.body.zip
  const name = req.body.name
  const category = req.body.type
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
    _id,
    address,
    state,
    city,
    zip,
    name,
    category,
    desc,
    email,
    phone,
    services,
    lat,
    lng,
    user_id,
    user_name,
    logo,
    images
  }
  return data
}



module.exports = router;