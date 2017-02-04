const glob = require('glob');
const _ = require('lodash');

module.exports = function mountRoutes(app, dir, { ignore = '', urlPrefix = '' }) {
  glob.sync(`${dir}/**/*.js`, { ignore }).forEach((file) => {
    const controller = require(file);

    _.forOwn(controller, (value, key) => {
      const url = `${urlPrefix}${key}`;
      if (_.isFunction(value)) {
        app.get(url, value);
      } else {
        _.forOwn(value, (func, method) => {
          app[method](url, func);
        });
      }
    });
  });
};
