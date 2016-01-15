var http = require('http');
var fs = require('fs');

var fileStream = fs.createReadStream(process.argv[3]);

var server = http.createServer(function(request, response) {
  fileStream.pipe(response);
});

server.listen(process.argv[2]);
