var fs = require('fs');

module.exports = function(dirName, extFilter, callback) {
  fs.readdir(dirName, function(err, dirContents) {
    if (err) {
      callback(err);
    } else {
      var filtered = dirContents.filter(function(elm, idx, arr) {
        var sliceFrom = -1 * (extFilter.length + 1);
        var filter = '.' + extFilter;
        return elm.slice(sliceFrom) === filter;
      });

      callback(null, filtered);
    }
  });
}
