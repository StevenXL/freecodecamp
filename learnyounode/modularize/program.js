var aSyncFileReader = require('./myModule.js');

var dir = process.argv[2];
var ext = process.argv[3];
var callback = function(err, data) {
  data.forEach(function(elm, idx, arr) {
    console.log(elm);
  });
};

aSyncFileReader(dir, ext, callback);
