'use strict';

const assert = require('assert');
const glob = require('glob');
const _ = require('lodash');
const pluralize = require('pluralize');

module.exports = function mountRoutes(
  app,
  dir,
  { ignore = '', urlPrefix = '/', logger = console } = {}
) {
  logger = logger || { log: () => {} };

  logger.log('\nMounted Routes:\n');

  glob.sync(`${dir}/**/*.js`, { ignore }).forEach(file => {
    const controllers = require(file);

    assert(_.isPlainObject(controllers));

    _.forOwn(controllers, (value, key) => {
      const moduleName = file.slice(file.lastIndexOf('/') + 1, -3);
      const url = `${urlPrefix}${pluralize(moduleName)}${key}`;

      let handlers = value;
      if (_.isFunction(handlers)) handlers = [handlers];

      if (_.isArray(handlers)) {
        app.get(url, handlers);
        logger.log(`GET ${url}`);
      } else if (_.isPlainObject(handlers)) {
        _.forOwn(handlers, (funcs, method) => {
          if (_.isFunction(funcs)) funcs = [funcs];
          app[method](url, funcs);
          logger.log(`${_.toUpper(method)} ${url}`);
        });
      }
    });
  });

  logger.log('');
};
