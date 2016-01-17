'use strict';

var express = require('express'),
    routes  = require('./app/routes/index.js'),
    app     = express();


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
