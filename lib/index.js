const glob = require('glob');

module.exports = function mountRoutes(app, dir, { ignore = '', urlPrefix = '' }) {
  glob.sync(`${dir}/**/*.js`, { ignore }).forEach((file) => {
    
  });
};
