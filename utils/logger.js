module.exports = {
  init: fastify => {
    if (config.environment != config.local_env) {
      // we will consider this when we deploy
    } else {
      global.log = require('pino')({
        level: 'debug'
      });
    }

    const loggerstream = {
      write: function(message) {
        if (message) {
          log.info(JSON.parse(message));
        }
      }
    };

    const logFormat = (tokens, req, res) => {
      const user_agent = tokens['user-agent'](req, res);
      const headers = req.headers;
      if (
        (user_agent &&
          (user_agent.indexOf('ELB-HealthChecker') != -1 ||
            user_agent.indexOf('kube-probe') != -1)) ||
        (headers && Object.keys(headers).length == 1 && headers.host)
      ) {
        return null;
      }

      if (req.headers['accept-charset']) {
        delete req.headers['accept-charset'];
      }
      if (req.headers['access_token']) {
        delete req.headers['access_token'];
      }
      if (req.headers['cookie']) {
        delete req.headers['cookie'];
      }

      return JSON.stringify(
        {
          'remote-address': tokens['remote-addr'](req, res),
          headers: req.headers,
          time: tokens['date'](req, res, 'iso'),
          method: tokens['method'](req, res),
          url: tokens['url'](req, res),
          'http-version': tokens['http-version'](req, res),
          'status-code': tokens['status'](req, res),
          'content-length': tokens['res'](req, res, 'content-length'),
          referrer: tokens['referrer'](req, res),
          'user-agent': tokens['user-agent'](req, res),
          'response-time-ms': tokens['response-time'](req, res)
        },
        null,
        4
      );
    };

    fastify.use(require('morgan')(logFormat, {stream: loggerstream}));
  }
};
