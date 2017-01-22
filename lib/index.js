const glob = require('glob');

module.exports = function mountRoutes(app, dir, options) {
  glob.sync(`${dir}/**/*.js`)
};
