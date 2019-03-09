/*
function doHomework(subject, callback) {
    console.log(`Starting my ${subject} homework.`);
    callback();
  }
  
  doHomework('math', function() {
    console.log('Finished my homework');
  });
  */

 var async = require('async');

 async.waterfall(
     [
         function(callback) {
             callback(null, 'Yes', 'it');
         },
         function(arg1, arg2, callback) {
             var caption = arg1 +' and '+ arg2;
             callback(null, caption);
         },
         function(caption, callback) {
             caption += ' works!';
             callback(null, caption);
         }
     ],
     function (err, caption) {
         console.log(caption);
         // Node.js and JavaScript Rock!
     }
 );

 const crypto = require('crypto');
crypto.randomBytes(10, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});
console.log(Date.now())