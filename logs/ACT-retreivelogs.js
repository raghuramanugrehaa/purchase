var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name:'ACT-logs',
  streams:[{
     path: './logfiles/Act-retreive/act.log',
     period: '1d'
  }],
  serializers:bunyan.stdSerializers
});
exports.logs = function(){
  return log ;
};
