import DS from 'ember-data';
import config from './../config/environment';

export default DS.RESTAdapter.extend({
    // Mocks
    // namespace: 'api',
    // host: 'http://localhost:4200'

    // Live Server
    namespace: 'api',
    host: config.APP.host
});
