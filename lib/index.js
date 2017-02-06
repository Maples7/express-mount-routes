const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const pluralize = require('pluralize');

module.exports = function mountRoutes(app, dir, { ignore = '', urlPrefix = '', logger = console }) {
  logger.log('\nMounted Routes:\n');

  glob.sync(`${dir}/**/*.js`, { ignore }).forEach((file) => {
    const controller = require(file);

    _.forOwn(controller, (value, key) => {
      const moduleName = file.slice(file.lastIndexOf('/') + 1, -3);
      const url = `${urlPrefix}${pluralize(moduleName)}${key}`;
      if (_.isFunction(value)) {
        app.get(url, value);
        logger.log(`GET ${url}`);
      } else {
        _.forOwn(value, (func, method) => {
          app[method](url, func);
          logger.log(`${_.toUpper(method)} ${url}`);
        });
      }
    });
  });

  logger.log('');
};
