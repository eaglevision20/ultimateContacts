import Ember from 'ember';

export default Ember.Controller.extend({
	user: function () {
        return this.store.findById('user', this.get('session.content.userId'));
    }.property('session'),
});