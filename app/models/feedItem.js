var mongoose = require('mongoose')
,   Schema   = mongoose.Schema

var feedItemSchema = new Schema({
  type: String,
  data: Schema.Types.Mixed,
  time: Date
});

mongoose.model('FeedItem', feedItemSchema);
