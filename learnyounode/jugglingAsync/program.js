var http = require('http');
var urls = process.argv.slice(2);

// collect array of urls to array of promises
var promises = urls.map(collectData);

// Use array of promises as argument to Promise.all
Promise.all(promises)
  .then(function(data) {
    data.forEach(function(elm, idx, arr) {
      console.log(elm);
    });
  })
  .catch(function(err) {
    console.log(err);
  });


// given a url, get full response and resolve the promise with full response
function collectData(url) {
  return new Promise(function(resolve, reject) {
    var fullResponse = '';

    http.get(url, function(response) {
      response
      .setEncoding('utf8')
      .on('data', function(data) {
        fullResponse += data;
      }).on('error', function(error) {
        reject(new Error(error));
      }).on('end', function(end) {
        resolve(fullResponse);
      });
    });
  });
}
