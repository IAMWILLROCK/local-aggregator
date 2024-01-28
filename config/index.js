/* eslint-disable no-console */

const _ = require('lodash');

const defaultConfig = require(appPath + '/config/env/all');
let config = {},
  configFile;

config = {
  init: function() {
    let self = this;

    //if configuration is already initialized, return
    if (self.initialized && self.initialized === true) {
      return self;
    }

    //fastify is not initialized yet, falling back to good old console.log
    console.log(
      '\nLoading configuration properties based on environment variable.\n'
    );

    let env = 'local';
    if (!process.env.NODE_ENV || process.env.NODE_ENV === '') {
      console.warn(
        `Environment variable not set. Initializing it to '${env}'.`
      );
    } else {
      env = process.env.NODE_ENV;
    }
    console.log(`Node environment set to '${env}'`);

    try {
      configFile = load(`config/env/${env}`);
    } catch (e) {
      console.error(e);
      process.exit(0);
    }

    // merge default config and environment config
    _.merge(self, defaultConfig, configFile, {env, initialized: true});

    return self;
  }
};

/** Invoke the init method so the configuration object is ready before the application bootstraps.*/
config.init();

module.exports = config;

/* eslint-enable no-console */
