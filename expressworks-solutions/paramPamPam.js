// dependencies
var express = require('express');
var crypto = require('crypto');

// app
var app = express();

// settings
app.listen(process.argv[2]);

// middleware

// routes
app.put("/message/:id", function(req, res) {
  var id = req.params.id;

  var sha = crypto
  .createHash('sha1')
  .update( new Date().toDateString() + id)
  .digest('hex');

  res.end(sha);
});
