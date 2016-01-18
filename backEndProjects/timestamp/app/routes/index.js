'use strict';

module.exports = function(app) {
  app.route("/").get(function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
  });

  app.route("/:query").get(function(req, res) {
    var query = req.params.query;

    if (Number(query)) {
      var unix = Number(query);
      var formattedDate = formatDate(new Date(unix * 1000));
    } else if (new Date(query)) {
      var utcDate = createDateAsUTC(new Date(query));
      var formattedDate = formatDate(utcDate);
      var unix = utcDate.getTime() / 1000;
    }

    if (!unix || !formattedDate) {
      res.sendFile(process.cwd() + '/public/index.html');
    }

    res.send({'unix': unix, 'natural': formattedDate});
  });
};

function formatDate(date) {
  if (!(typeof date === 'object')) {
    return;
  }

  var month = monthIntToMonth(date.getUTCMonth());
  var year = date.getUTCFullYear();
  var date = date.getUTCDate();
  return `${month} ${date}, ${year}`;
}

function monthIntToMonth(num) {
  switch (num) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
};

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}
