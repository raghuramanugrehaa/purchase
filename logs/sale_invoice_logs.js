var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name:'sale-invoice-logs',
  streams:[{
     path: './logfiles/sale-invoice/invoice.log',
     period: '1d'
  }],
  serializers:bunyan.stdSerializers
});
exports.logs = function(){
  return log ;
};
