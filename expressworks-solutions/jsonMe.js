// dependencies
var express = require('express');
var fs = require('fs');

// server
var app = express();

// settings

// routes
app.get('/books', function(req, res) {
  var filePath = process.argv[3];

  fs.readFile(filePath, function(err, data) {
    var books = JSON.parse(data);
    res.end(JSON.stringify(books));
  });

});

app.listen(process.argv[2]);
