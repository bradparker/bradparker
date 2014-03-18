var express  = require('express')
,   fs       = require('fs')
,   passport = require('passport');

//Load configurations
var env      = process.env.NODE_ENV || 'development',
    config   = require('./config/config')[env],
    mongoose = require('mongoose');

// db connection
var db = mongoose.connect(config.db);

// Models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});

// Passport config
require('./config/passport')(passport, config);

// Init Express
var app = express();

// Express settings
require('./config/express')(app, config, passport);

// Routes
require('./config/routes')(app, passport);

//Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);

// expose app
exports = module.exports = app;
