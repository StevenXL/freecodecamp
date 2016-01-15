var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// settings
app.listen(process.argv[2]);
app.set('views', process.argv[3]);
app.set('view engine', 'jade');

// middleware
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get("/home", function(req, res) {
  res.render('index', {date: new Date().toDateString()});
});

app.post("/form", function(req, res) {
  var originalStr = req.body.str;
  var reversedStr = originalStr.split('').reverse().join('');
  res.end(reversedStr);
});


