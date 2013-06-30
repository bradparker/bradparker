App = Ember.Application.create({});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    url: 'https://api.github.com/repos/bradparker/bradparker',
  })
});

App.Router.map(function() {
  
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Content.find();
  }
});

var attr = DS.attr;

App.Content = DS.Model.extend({
  path: attr('string')
});