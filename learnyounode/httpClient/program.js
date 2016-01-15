var httpModule = require('http');
var url = process.argv[2];

httpModule.get(url, function(response) {
  response
  .setEncoding('utf8')
  .on('data', function(data) {
    console.log(data);
  })
});
