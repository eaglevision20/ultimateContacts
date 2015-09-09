import DS from 'ember-data';

export default DS.Model.extend({
	user: DS.belongsTo('user', {async: true}),
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	imageUrl: DS.attr('string'),
	email: DS.attr('string'),
	phoneNumber: DS.attr('string'),
	tags: DS.attr(),
	groups: DS.attr()
});
