var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var purchase_order = require ('../api/purchase-invoice-service/purchaseorder');
var purchase_bill = require ('../api/purchase_bill/purchasebill');
var dependencies=require ('../api/dependencies/ACT-retrieve');
var payment=require ('../api/purchase-payment/payment_purchase');
var cors=require('cors');
var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/purchase',purchase_order);
app.use('/purchaseb',purchase_bill);
app.use('/purchase/dependencies',dependencies);
app.use('/purchase/payment',payment);
app.use(function(req, res, next){
    var err = new Error ('Not Found');
    err.status = 404;
    next(err);
});


module.exports=app;
