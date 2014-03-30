var fs = require('fs');
var request = require('superagent');

exports.proxy = function(req, res) {
  var url = req.query.url;

  res.writeHead(200, {
    'Content-Type' : 'image/jpeg'
  });

  request
  .get(url)
  .pipe(res);
};
