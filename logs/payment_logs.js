var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name:'payment-logs',
  streams:[{
     path: './logfiles/payment/payment.log',
     period: '1d'
  }],
  serializers:bunyan.stdSerializers
});
exports.logs = function(){
  return log ;
};
