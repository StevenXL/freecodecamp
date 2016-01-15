var express = require('express');
var stylus = require('stylus');

var app = express();

// settings
app.listen(process.argv[2]);
app.set('views', process.argv[3]);
app.set('view engine', 'jade');

// middleware
app.use(stylus.middleware(process.argv[3]));
app.use(express.static(process.argv[3]));
