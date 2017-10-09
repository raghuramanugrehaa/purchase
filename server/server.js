var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var purchase_order = require ('../api/purchase-invoice-service/purchaseorder');
var dependencies=require ('../api/dependencies/ACT-retrieve');
var cors=require('cors');
var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/purchase',purchase_order);
app.use('/sales/dependencies',dependencies);
app.use(function(req, res, next){
    var err = new Error ('Not Found');
    err.status = 404;
    next(err);
});


module.exports=app;
