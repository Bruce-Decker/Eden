const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const keys = require('../key/keys');
const axios = require('axios');

var shipStationServer = keys.shipStationMockServer;

router.post('/get_rates', function(req,res) {
  const shipment_data = {
    carrierCode: "fedex",
    fromPostalCode: req.body.from_zip,
    toState: req.body.to_state,
    toCountry: req.body.to_country,
    toPostalCode: req.body.to_zip,
    toCity: req.body.to_city,
    confirmation: "delivery"
  };
  axios.post(shipStationServer + '/shipments/getrates', shipment_data)
    .then(function (response) {
      //console.log(response);
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});


router.post('/create_label', function(req,res) {
  const current_date = new Date();
  const shipment_date = new Date();
  shipment_date.setDate(current_date.getDate()+2);
  var dd = String(shipment_date.getDate()).padStart(2, '0');
  var mm = String(shipment_date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = shipment_date.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  const shipment_data = {
    "carrierCode": "fedex",
    "serviceCode": "fedex_ground",
    "packageCode": "package",
    "confirmation": "delivery",
    "shipDate": yyyy + "-" + mm + "-" + dd,
    "weight": {
      "value": 3,
      "units": "ounces"
    },
    "shipFrom": {
      "name": "Eden Inc.",
      "street1": "1 Washington Sq",
      "street2": "",
      "city": "San Jose",
      "state": "CA",
      "postalCode": "95192",
      "country": "US",
      "residential": false
    },
    "shipTo": {
      "name": req.body.shipTo.name,
      "street1": req.body.shipTo.street1,
      "street2": req.body.shipTo.street2,
      "city": req.body.shipTo.city,
      "state": req.body.shipTo.state,
      "postalCode": req.body.shipTo.postalCode,
      "country": req.body.shipTo.country,
      "residential": false
    },
    "testLabel": false
  };
  //console.log(shipment_data);
  axios.post(shipStationServer + '/shipments/createlabel', shipment_data)
    .then(function (response) {
      //console.log(req.body.shipFrom.name);
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});


module.exports = router;


