var request = require('request');
var express = require('express');
var config = require('config');
var router = express.Router();
///var log=require ('../../logs/sale_invoice_logs').logs();
var header=require('../../utils/utils');
// Retrieve all invoices for a given company
router.get('/:companyId/bill/', function(req, res) {

    var companyId = req.params.companyId;
    var requrl=config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/Bill/Service?format=json";
    var options = { headers: header,
        url: requrl

    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
          //  log.info({request_url:requrl,response_body:body,status_code:response.statusCode},"Request for list of invoices");
            res.status(response.statusCode).send(body);
        } else {
          //  log.error({response_body:body,request_url:requrl,status_code:response.statusCode},"Request for list of invoice");
            res.status(response.statusCode).send(body);

        }
    });
})

//Retrieve a Invoice for a given company
router.get('/:companyId/bill/:id', function(req, res) {
    var companyId = req.params.companyId;
    var id = req.params.id;
    var requrl=config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/Bill/Service/"+id+"?format=json"

    var options = { headers: header,
     url: requrl
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
        // log.info({request_url:requrl,response_body:body,status_code:response.statusCode},"Request for single invoice");
            res.status(response.statusCode).send(body);
        } else {
          // log.error({response_body:body,request_url:requrl,status_code:response.statusCode},"Request for single invoice");
          //  console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

// Create a Invoice
router.post('/:companyId/bill/:id',function(req, res) {
    var companyId = req.params.companyId;
	var id=req.params.id;
    var requestBody = JSON.stringify(req.body);
    var requrl=config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/Bill/Service/"+id+"?format=json"
    var options = { headers:header,
        url: requrl,
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
      //   log.info({request_url:requrl,request_body:requestBody,status_code:response.statusCode},"creating single invoice");
            res.status(response.statusCode).send(body);

      } else {
        //   log.error({response_body:body,request_body:requestBody,request_url:requrl,status_code:response.statusCode},"Request to create invoice");
           res.status(response.statusCode).send(body);

        }
    });
})

router.post('/:companyId/bill/',function(req, res) {
    var companyId = req.params.companyId;
	var requestBody = JSON.stringify(req.body);
    var requrl=config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/Bill/Service/?format=json"
    var options = { headers:header,
        url: requrl,
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
      //   log.info({request_url:requrl,request_body:requestBody,status_code:response.statusCode},"creating single invoice");
            res.status(response.statusCode).send(body);

      } else {
        //   log.error({response_body:body,request_body:requestBody,request_url:requrl,status_code:response.statusCode},"Request to create invoice");
           res.status(response.statusCode).send(body);

        }
    });
})

router.put('/:companyId/bill/:id', function(req, res) {
    var id = req.params.id;
    var companyId = req.params.companyId;
    var requrl=config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/Bill/Service/"+id+"/?format=json";
    var requestBody = JSON.stringify(req.body);
    var options = { headers:header,
        url: requrl,
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
  //        log.info({request_url:requrl,request_body:requestBody,status_code:response.statusCode},"Updating a single invoice");
            res.status(response.statusCode).send(body);
        } else {
    //     log.error({response_body:body,request_body:requestBody,request_url:requrl,status_code:response.statusCode},"updating a single invoice");
            res.status(response.statusCode).send(body);
        }
    });
})

router.delete('/:companyId/bill/:id', function(req, res) {
    var id = req.params.id;
    var companyId = req.params.companyId;
    var requrl=config.get('myob.host') +"/AccountRight/"+companyId+"/Purchase/Bill/Service/"+id+"/?format=json"

    var options = { headers:header,
        url: requrl,
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
      //     log.info({request_url:requrl,status_code:response.statusCode},"Deleting a single invoice");
            res.status(response.statusCode).send(body);
        } else {
        //   log.error({request_url:requrl,status_code:response.statusCode},"Deleting a single invoice");
            res.status(response.statusCode).send(body);
        }
    });
})

module.exports=router;
