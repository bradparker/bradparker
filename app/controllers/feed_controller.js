var env = require('node-env-file');
env('./.env');

var mongoose    = require('mongoose')
,   db          = mongoose.connection.db
,   FeedItem    = mongoose.model('FeedItem')
,   request     = require('superagent')
,   moment      = require('moment')
,   Q           = require('q')
,   twitter     = require('twitter')
,   twit        = new twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

function handleResources (resources, resourceName, timeAttribute) {
  var promises = [];

  resources.forEach(function (resource) {
    var deferred = Q.defer();
    var time = moment(resource[timeAttribute]);

    if (time.isValid()) {
      time = time.toDate();
    } else {
      time = moment(parseInt(resource[timeAttribute] + '000')).toDate();
    }

    var payload = { type: resourceName, time: time, data: resource };

    FeedItem.create(payload, function (err, resource) {
      if (err) return deferred.reject(err);

      deferred.resolve(resource);
    });

    promises.push(deferred.promise);
  });

  return Q.all(promises);
}

function handleError () {
  var deferred = Q.defer();
  deferred.resolve([])
  return deferred.promise;
}

function saveResources (resourceName, timeAttribute) {
  return get[resourceName.toLowerCase()]()
    .then(function (resources) {
      if (!resources) return handleError();

      return handleResources(resources, resourceName, timeAttribute);
    });
}

function getInstagrams () {
  var deferred = Q.defer();

  request.get('https://api.instagram.com/v1/users/self/media/recent')
    .query({ access_token: process.env.INSTAGRAM_TOKEN })
    .end(function(result){
      deferred.resolve(JSON.parse(result.text).data)
    });

  return deferred.promise;
}

function getTweets () {
  var deferred = Q.defer();

  twit.get('/statuses/user_timeline.json',
    { include_entities: true },
    function(response) {
      deferred.resolve(response);
    });

  return deferred.promise;
}

var get = {
  tweet: getTweets,
  instagram: getInstagrams
}

exports.index = function(req, res) {
  FeedItem.find()
  .sort({ time: -1 })
  .exec(function (err, items) {
    if (err) { res.send(err) }

    res.send(items);
  });
}

exports.refresh = function(req, res) {
  db.dropCollection('feeditems', function (err, result) {
    if (err) { console.log(err) }

    Q.all([
      saveResources('Tweet', 'created_at'),
      saveResources('Instagram', 'created_time')
    ]).done(function (feed) {
      res.send(feed);
    });
  });
};
