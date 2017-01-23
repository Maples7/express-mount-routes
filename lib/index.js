const glob = require('glob');

const methods = ['get', 'post', 'put', 'patch', 'delete'];

module.exports = function mountRoutes(app, dir, { ignore = '', urlPrefix = '' }) {
  glob.sync(`${dir}/**/*.js`, { ignore }).forEach((file) => {

  });
};
