var request = require('request');
var express = require('express');
var router = express.Router();
var async = require("async");
var config = require('config');
var header=require('../../utils/utils');
var payments=require('./paymentmode').paymentmodes;
var jobs=require('./saleheads').sales;
var accounts = {
    details: []
};
var customer = {
   details: []
};
var  taxcodes= {
    details: []
};
var  salesheads= {
    details: []
};
var  paymentmodes= {
    details: []
};
router.get('/:companyid',function(req, res) {
  var companyid = req.params.companyid;
  // create request objects
  var requests = [
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/GeneralLedger/Account/?$filter=Classification eq'Income'"
    },
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Customer?format=json"
    },
        { headers:header,
            url: config.get('myob.host') +"/AccountRight/"+companyid+"/GeneralLedger/TaxCode?format=json"
        }
];
  async.map(requests, function(obj, callback) {
    // iterator function
    request(obj, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // transform data here or pass it on
        var body = JSON.parse(body);
        callback(null, body);
      } else {
        callback(error || response.statusCode);
      }
    });
  }, function(err, results) {
    // all requests have been made
    if (err) {
      // handle your error
      console.log("checking"+err);
    } else {







       jobs.map(function(item){
         salesheads.details.push({

              "Name":item.name,
              "Price":item.price
            });
         });

       payments.map(function(item){
                paymentmodes.details.push({

                     "Name":item.name
                   });
                });


      results[0].Items.map(function(item) {
         accounts.details.push({
              "Name" : item.Name,
              "UID"  : item.UID,
              "TaxCodeUID":item.TaxCode


          });
      });
      results[1].Items.map(function(item) {
         customer.details.push({
              "Name" : item.CompanyName,
              "UID"  : item.UID

          });
      });
      results[2].Items.map(function(item) {
               taxcodes.details.push({
                    "Name" : item.Code,
                    "UID"  : item.UID

                });
            });

      var response = '{"Account":' +JSON.stringify(accounts.details) +',"Suppliers":' +JSON.stringify(customer.details) +',"paymentmode":'+JSON.stringify(paymentmodes.details)+',"salesheads":'+JSON.stringify(salesheads.details)+'}';
accounts.details=[];
customer.details=[];
paymentmodes.details=[];
salesheads.details=[];
//console.log(taxcodes.details);
      res.send(JSON.parse(response));
    }
  });

});

module.exports=router;
