const express = require('express');
const router = express.Router();
const Item = require('../schema/Item');
const uuidv4 = require('uuid/v4');

const itemsPerPage = 20;


router.post('/postCommentForItem/:item_id', function(req, res) {
    const comment = req.body.comment
    const time = Date.now()
    const email = req.body.email
    const name = req.body.name
    const item_id = req.params.item_id
    const data = {
       email,
       name,
       comment,
       time
    }
    if (comment) {
      Item.findOneAndUpdate(
          {
            item_id: item_id
          },
         {
            $push: {
               comments: data
            }
          }, function(err, docs) {
            if (err) {
              res.send({Error: err})
            } else {
              res.send(docs)
            }
          }
        )

    }



})


router.post('/createItem', function(req, res) {
    const item_id = uuidv4()
    const item_name = req.body.item_name
    const item_image = req.body.image
    const category = req.body.category
    const description = req.body.description
    const price = req.body.price
    const bid_price = req.body.bid_price

    const data = {
       item_id,
       item_name,
       item_image,
       category,
       description,
       price,
       bid_price
    }

    Item.findOne({item_id: item_id}, function(err, docs) {
      if (docs) {
         Item.findOneAndUpdate({item_id: item_id}, data, function(err, result) {
           if (err) {
                       res.send("Fail")
                      
           } else {
             console.log(result)
                       res.send({msg: "Update successfully", data: data})
                      
            }
        })
      } else {    
          Item.create(data, function(err, newlyCreated) {
            if (err) {
                  res.send({msg: "False"});
                          
            } else {
                  res.send({msg: "True", data: data});
            }
          })
      }
    })   
})

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
    const pageNumber = req.query.page || 1
    Item.find({
      category: req.query.category
    }).skip((pageNumber - 1) * itemsPerPage).then(async (items) => {
      let results = items.map(i => i._doc);

      let ret = {
        numItems: results.length,
        itemsPerPage: itemsPerPage,
        items: results.slice(0, itemsPerPage)
      };

      res.json(ret);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'category not found' });
    });
  }
});

router.get('/:id', function(req,res) {
  var item_id = req.params.id
  Item.find({item_id: item_id}, function(err, docs) {
     if (err) {
       res.send(err)
     } else {
       res.send(docs)
     }
  })

});

module.exports = router;