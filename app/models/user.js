var mongoose = require('mongoose')
,   Schema   = mongoose.Schema
,   bcrypt   = require('bcrypt');

var userSchema = new Schema({ 
  first_name: String,
  last_name: String,
  email: String,
  created_at: Date,
  updated_at: Date,
  password: String,
  apikey: { type: Schema.Types.ObjectId, ref: 'Apikey' }
});

userSchema.pre('save', function(next, done){
  var user = this;

  if (this.isNew) {
    user.created_at = new Date;
    return next();
  } else {
    user.updated_at = new Date;
    return next();
  }
});

userSchema.pre('save', function(next, done){
  var user = this;
  
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      user.password = hash;  
      return next();
    });
  } else {
    return next();
  }
});

userSchema.statics.verifyPassword = function(reqPassword, userPassword, cb) {
  bcrypt.compare(reqPassword, userPassword, function(err, res) {
    if (err) return cb(err);
    cb(null, res);
  });
}

mongoose.model('User', userSchema);
