import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('newUser');
  this.route('contactbook', function() {
    this.route('contact',{path: 'contact/:contact_id'})
  });
});

export default Router;
