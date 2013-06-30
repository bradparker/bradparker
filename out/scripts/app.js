App = Ember.Application.create({});

App.Router.map(function() {
  
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    $.ajax({
      url: 'https://draftin.com/api/v1/documents.json', 
      headers: { email: 'hi@bradparker.com', password: 'Barto<n02' },
      success: function(data){ 
        console.log(data);
        return data 
      } 
    })
  }
});