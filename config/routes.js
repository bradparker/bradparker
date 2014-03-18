module.exports = function(app, passport) {
  // User Routes
  var users = require('../app/controllers/users_controller');

  // Setting up the users api
  app.post('/users', users.create);
  app.post('/users/session', users.session);

  app.get('/users', users.index);
  app.get('/users/:userId', passport.authenticate('bearer', { session: false }), users.show);

  // Finish with setting up the userId param
  app.param('userId', users.user);

  // Home route
  var index = require('../app/controllers/index_controller');
  app.get('/', index.render);

};
