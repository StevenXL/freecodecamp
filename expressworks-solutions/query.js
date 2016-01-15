// dependencies
var express = require('express');

var app = express();

// settings
app.listen(process.argv[2]);

// routes
app.get("/search", function(req, res) {
  var searchingFor = JSON.stringify(req.query);
  res.end(searchingFor);
});
