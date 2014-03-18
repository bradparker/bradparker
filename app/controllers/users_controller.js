var mongoose = require('mongoose')
,   User     = mongoose.model('User')
,   Apikey   = mongoose.model('Apikey')
,   uuid     = require("node-uuid");

exports.session = function(req, res) {
  User.findOne({ email: req.body.email })
  .populate('apikey')
  .exec(function(err, user){
    if (err) { return res.json(err) }
    if (!user) { return res.json({ message: 'Incorrect username or password.' }) }

    User.verifyPassword(req.body.password, user.password, function(err, result){
      if(result) {
        res.json({ user: user });
      } else {
        res.json({ message: 'Incorrect username or password.' });
      }
    });
  });
};

exports.index = function(req, res) {
  User.find()
  .exec(function(err, users){
    if (err) { res.json({ error: err }); }
    res.json({ users: users });
  });
}

exports.create = function(req, res) {
  var new_user = new User(req.body.user);
  
  new_user.save(function(err, saved_user, num_affected){
    var new_apikey = new Apikey({
      userId: saved_user._id,
      key: uuid.v4()
    });
    
    new_apikey.save(function(err, saved_apikey, num_affected){
      saved_user.apikey = saved_apikey._id;

      saved_user.save(function(err, updated_user, num_affected){
        updated_user.populate('apikey', function(err, user){
          if (err) { res.json(err) };
          
          res.json({ user: user });
        });
      })              
    });
  });
};

exports.show = function(req, res) {
  var user = req.profile;

  res.json({ user: user });
};

exports.user = function(req, res, next, id) {
  User.findById(id)
  .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};
