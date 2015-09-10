import Ember from 'ember';

export default Ember.Controller.extend({
	contactSort: ['Last Name','First Name'],
	selectedC: 'First Name',
	user: function () {
        return this.store.findById('user', this.get('session.content.userId'));
    }.property('session'),
    contacts: function () {
    	return this.store.find('contact', {user: this.get('session.content.userId')});
    }.property('session'),
    extras: [],

    activeContacts: function () {
		if (this.get('selectedC') === 'All'){
			return this.get('contacts').sortBy('updatedAt');
		} else if (this.get('selectedC') === 'Last Name'){
			return this.get('contacts').sortBy('lastName');
		} else if (this.get('selectedC') === 'First Name'){
			return this.get('contacts').sortBy('firstName');
		} else {
			return this.get('contacts');
		}
	}.property('selectedC', 'contacts.@each'),
});