const express = require('express')
const router = express.Router();
var multer = require('multer')
var Unzipper = require("decompress-zip");
var path = require("path");
var del = require('delete');
var fs = require('fs')

const FileUpload = require('../schema/FileUpload')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public/uploads/')
    },
    filename: function(req, file, cd) {
        console.log("this is " + req.body.item_id)
       
        cd(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, true);
    }
  
}

const fileUpload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.use(multer({dest: '../client/public/uploads/'}).single('filename'))

router.post("/fileUploadZip", function(req, res){
    console.log("req.file")
    console.log(req.file)
    var item_id = req.body.item_id
    var file_name = req.file.originalname
    file_name = file_name.slice(0, -4)
    var upload_time = Date.now()
    var file_path = "/uploads/" + file_name

    if (req.file){

        FileUpload.findOne({item_id, item_id}, function(err, docs) {
            var filepath = path.join(req.file.destination, req.file.filename);
            var unzipper = new Unzipper(filepath);

            unzipper.on("extract", function () {
                console.log("Finished extracting");
            });

            unzipper.extract({ path: "../client/public/uploads/"})
            //unzip(unzipper, req.file.filename, deleteFile)
              
            console.log(req.file.filename)



            var data = {
                item_id,
                file_name,
                upload_time,
                file_path
            }

            if (docs) {
                FileUpload.findOneAndUpdate({item_id, item_id}, data, function(err, result) {
                    if (err) {
                        res.send("Fail")
                    } else {
                        console.log(result)
                       
                       
                        res.send("Update successfully")
                        del(['../client/public/uploads/' + req.file.filename], {force: true}, function(err, deleted) {
                            if (err) throw err;
                            // deleted files
                            console.log("delete")
                           
                          });

                          del(['../client/public/uploads/__MACOSX'], {force: true}, function(err, deleted) {
                            if (err) throw err;
                            // deleted files
                            console.log("delete")
                           
                          });
                        

                    }
                })
            } else {
                FileUpload.create(data, function(err, newlyCreated) {
					if (err) {
						console.log("Error Data");
						 res.send({msg: "False"});
					} else {
                        
                         res.send({msg: "True"});
                         del(['../client/public/uploads/' + req.file.filename], {force: true}, function(err, deleted) {
                            if (err) throw err;
                            // deleted files
                            console.log("delete")
                           
                          });

                          del(['../client/public/uploads/__MACOSX'], {force: true}, function(err, deleted) {
                            if (err) throw err;
                            // deleted files
                            console.log("delete")
                           
                          });
					}
			   })
            }
        })
     
           
    }

  

    
});


 
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
