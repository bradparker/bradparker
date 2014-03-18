var mongoose = require('mongoose')
,   Schema   = mongoose.Schema

var apikeySchema = new Schema({ 
  userId: String,
  key: String
});

mongoose.model('Apikey', apikeySchema);
