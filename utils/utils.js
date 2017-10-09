var config = require('config');

// Add Myob headers to a object and return headers object

  var headers = {
          'Authorization': config.get('myob.header.accessToken'),
          'x-myobapi-version': config.get('myob.header.api-version')
        }

module.exports =headers;
