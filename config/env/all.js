module.exports = {
  service_name: 'location_aggregation',
  port: process.env.PORT || '3011',
  host: process.env.PORT || process.env.HOSTNAME || '0.0.0.0',
  server: {
    keepAliveTimeout: process.env.keepAliveTimeout || 35000
  },
  local_env: 'local',
  development_env: 'development',
  staging_env: 'staging',
  production_env: 'production'
};
