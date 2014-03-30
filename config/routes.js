module.exports = function(app, passport) {
  var feed = require('../app/controllers/feed_controller');
  var imageProxy = require('../app/controllers/image_proxy_controller');

  // Feed api
  app.get('/feed', feed.index);
  app.get('/feed/refresh', feed.refresh);

  // Image proxy api
  app.get('/image-proxy', imageProxy.proxy);


};
