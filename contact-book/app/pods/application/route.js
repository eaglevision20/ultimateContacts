import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{
    beforeModel: function (params) {
        console.log(params.targetName)
        if(params.targetName === 'index'){
            this.transitionTo('contactbook');
        }
    },
});
