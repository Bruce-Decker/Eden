const express = require('express')
const router = express.Router();
var multer = require('multer')

const FileUpload = require('../schema/FileUpload')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public/uploads/')
    },
    filename: function(req, file, cd) {
        console.log("this is " + req.body.item_id)
        file.originalname = req.body.item_id + '.jpg'
        cd(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
  
}

const fileUpload = multer({
    storage: storage,
    fileFilter: fileFilter
})


router.post('/fileUpload', fileUpload.single('filename'), function(req, res) {
    var item_id = req.body.item_id
    var file_name = req.body.file_name
    var upload_time = Date.now()
    var file_path = "uploads/" + req.body.item_id + '.jpg'
   
    

    var data = {
       item_id,
       file_name,
       upload_time,
       file_path
    }
   
    FileUpload.findOne({item_id: item_id}, function(err, docs) {
		if (docs) {
			FileUpload.findOneAndUpdate({item_id: item_id}, data, function(err, result) {
				 if (err) {
				 	res.send("Fail")
				 } else {
				 	console.log(result)
	 				res.send("Update successfully")
	 			 }
			})
		} else {
			 
            FileUpload.create(data, function(err, newlyCreated) {
					if (err) {
						console.log("Error Data");
						 res.send({msg: "False"});
					} else {
						 res.send({msg: "True"});
					}
			   })

		}

	})
    
})

router.get('/retrieveFile/:item_id', function(req, res) {
     var item_id = req.params.item_id
     FileUpload.findOne({item_id: item_id}, function(err, docs) {
          if (err) {
            console.log("Error Data");
            res.send({msg: "False"});
          } else {
              res.send(docs)
          }
     })
})

module.exports = router;
