var request = require('request');
var express = require('express');
var router = express.Router();
var async = require("async");
var config = require('config');
var header=require('../../utils/utils');
var payments=require('./paymentmode').payment;
var ship=require('./paymentmode').ship;
var comments=require('./paymentmode').com;
var D_status=require('./paymentmode').d_status      ;
var jobs=require('./saleheads').sales;
var accounts = {
    details: []
};
var supply = {
   details: []
};

var  salesheads= {
    details: []
};

var  taxcodes= {
    details: []
};
var  job= {
    details: []
};
router.get('/:companyid',function(req, res) {
  var companyid = req.params.companyid;
  // create request objects
  var requests = [
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/GeneralLedger/Account/"
    },
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/Contact/Supplier?format=json"
    } ,
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/GeneralLedger/TaxCode?format=json"
    },
    { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyid+"/GeneralLedger/Job?format=json"
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

  /*     payments.map(function(item){
                paymentmodes.details.push({

                     "Name":item.name
                   });
                });*/


      results[0].Items.map(function(item) {
		  var f=item.Classification;
		  if(f=="Expense"||f=="Income"||f=="Cost of Sales"){
         accounts.details.push({
              "Name" : item.Name,
              "UID"  : item.UID,
              "TaxCodeUID":item.TaxCode


          });
		  }
      });
      results[1].Items.map(function(item) {
         supply.details.push({
              "Name" : item.CompanyName,
              "UID"  : item.UID,
			  "PaymentIsDue":item.BuyingDetails.Terms.PaymentIsDue

          });
      });
      results[2].Items.map(function(item) {
		  var e=item.Code;
		  if(e=="GST"||e=="FRE"||e=="N-T"){
         taxcodes.details.push({

              "Name" : item.Code,
              "UID"  : item.UID,
              "Rate":item.Rate
			 
          });
		  }
      });
	  results[3].Items.map(function(item) {
         job.details.push({
              "Name" : item.Number,
              "UID"  : item.UID

          });
      });

      var response = '{"Account":' +JSON.stringify(accounts.details) +',"Suppliers":' +JSON.stringify(supply.details) +',"paymentmode":'+JSON.stringify(payments)+',"salesheads":'+JSON.stringify(salesheads.details)+',"salesheads":'+JSON.stringify(salesheads.details)+',"TaxCode":'+JSON.stringify(taxcodes.details)+',"Shipping":'+JSON.stringify(ship)+',"Comments":'+JSON.stringify(comments)+',"delivery_status":'+JSON.stringify(D_status)+',"Job":'+JSON.stringify(job.details)+'}';
accounts.details=[];
supply.details=[];
salesheads.details=[];
taxcodes.details=[];
job.details=[];
      res.send(JSON.parse(response));
    }
  });

});

module.exports=router;
