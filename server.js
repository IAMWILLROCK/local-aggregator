require(__dirname + '/utils/globals');

const logUtil = load('utils/logger');

const fastify = require('fastify')({
  ignoreTrailingSlash: true,
  logger: false,
  caseSensitive: false,
  maxParamLength: 2048
});

fastify.register(require('@fastify/middie')).after(() => {
  logUtil.init(fastify);
});

const boot = async () => {
  try {
    fastify.server.keepAliveTimeout = parseInt(config.server.keepAliveTimeout);
    await fastify.listen({port: parseInt(config.port), host: config.host});
    log.info(`Server listening at ${fastify.server.address().port}`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};

boot();
