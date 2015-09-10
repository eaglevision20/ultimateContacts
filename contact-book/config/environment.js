/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'contact-book',
    podModulePrefix: 'contact-book/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      serverTokenEndpoint: 'http://localhost:1337/api/users/login',
      host: 'http://localhost:1337'
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if ( environment === 'staging'){
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'http://server.brochachos.com/api/users/login'
    }; 
    ENV.APP.host = 'http://server.brochachos.com';
    ENV.APP.serverTokenEndpoint = 'http://server.brochachos.com/api/users/login';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['simple-auth-oauth2'] = {
    serverTokenEndpoint: ENV.APP.serverTokenEndpoint
  };

  return ENV;
};
