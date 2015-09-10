import DS from 'ember-data';

export default DS.Model.extend({
	contacts: DS.attr(),
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	imageUrl: DS.attr('string'),
	email: DS.attr('string'),
	phoneNumber: DS.attr('string'),
	isAdmin: DS.attr('boolean'),
	password: DS.attr('string')
});
