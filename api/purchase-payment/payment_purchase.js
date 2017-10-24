var request = require('request');
var express = require('express');
var router = express.Router();
//var log=require ('../../logs/payment_logs').logs();
var config = require('config');
var header=require('../../utils/utils');
var async = require("async");
var payment = {
    details: []
};
// gets the list of all the invoice that are having status opened of a company

router.get('/:companyId/supplierPayments', function(req, res) {
    var companyId = req.params.companyId;
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/SupplierPayment?format=json"
    }

    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
          //  log.info({response:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            //log.error({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);

        }
    });
})

//gets total details of a invoice
router.get('/:companyId/supplierPayments/:cname/:id', function(req, res) {

    var companyId = req.params.companyId;
    var id = req.params.id;
	var cnames=req.params.cname;
    var options = { headers: header,

    }
	 var requests = [
    { headers:header,
       url: config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/SupplierPayment/?$filter=Supplier/Name eq'"+cnames+"'"
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


		results[0].Items.map(function(item) {
       var gem=item.Lines[0].Purchase.UID;
	   if(gem==id){
		   payment.details.push({

			  Number:item.PaymentNumber,
              Amount:item.AmountPaid,
				Date:item.Date

		   });
	   }
		});
		console.log(payment.details);
		var response={history:payment.details}
		res.send(response);
		payment.details=[];
	}
  });


})

router.post('/:companyId/supplierPayments', function(req, res) {
	console.log("hitted");
    var companyId = req.params.companyId;
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers:header,
        url: config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/SupplierPayment?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            //log.info({response:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            //log.error({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/:companyId/customerPayments/:id', function(req, res) {
    var id = req.params.id;
    var companyId = req.params.companyId;
    console.log("Request param id: "+id);
    var options = { headers:header,
       url: config.get('myob.host') +"/AccountRight/"+companyId+"/Sale/CustomerPayment/"+id+"?format=json"
    }
    request.delete(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            //log.info({response:body},response.statusCode);
            res.status(response.statusCode).send(body);
        } else {
            //log.error({respose:body},response.statusCode);
            res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
