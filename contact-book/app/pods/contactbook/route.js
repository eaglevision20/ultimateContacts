import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	// The session stores Both the Returned token and also any account information 
	// Returned by the authentication end-point. This information is accessible under 'content'

});