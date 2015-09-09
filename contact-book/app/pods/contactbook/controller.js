import Ember from 'ember';

export default Ember.Controller.extend({
	user: function () {
        return this.store.findById('user', this.get('session.content.userId'));
    }.property('session'),
    contacts: function () {
    	return this.store.find('contact', {user: this.get('session.content.userId')});
    }.property('session')
});