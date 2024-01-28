module.exports = (function() {
  // register globals
  global.appPath = process.cwd();
  global.getFullPath = path => `${appPath}/${path}`;
  global.load = path => require(getFullPath(path));
  global.config = require(appPath + '/config/');
})();
