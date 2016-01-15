var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {
  response.writeHeader('200', {"Content-Type": "application/json"});
  var parsedInfo = url.parse(request.url, true);
  var date = new Date(parsedInfo.query.iso);

  if (parsedInfo.pathname == "/api/parsetime") {
    var parsedTime = {"hour": date.getHours(), "minute": date.getMinutes(), "second": date.getSeconds()};
    var json = JSON.stringify(parsedTime);
    response.end(json);
  } else if (parsedInfo.pathname == "/api/unixtime") {
    var parsedTime = date.getTime();
    var json = JSON.stringify({"unixtime": parsedTime});
    response.end(json);
  }
});

server.listen(process.argv[2]);
