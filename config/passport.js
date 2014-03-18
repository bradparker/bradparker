var mongoose       = require('mongoose')
,   BearerStrategy = require('passport-http-bearer').Strategy
,   User           = mongoose.model('User')
,   Apikey         = mongoose.model('Apikey');


module.exports = function(passport, config) {
  passport.use(new BearerStrategy(
    function(token, done) {
      Apikey.findOne({ key: token })
      .exec(function(err, apikey){
        if (err) { return done(err); }
        if (!apikey) { return done(null, false); }
        User.findById(apikey.userId)
        .exec(function(err, user){
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user, { scope: 'all' });
        });
      });
    }
  ));
};
