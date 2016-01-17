'use strict';

module.exports = function(app) {
  app.route("/").get(function(res, req) {
    req.sendFile(process.cwd() + '/public/index.html');
  });
};
