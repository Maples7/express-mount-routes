'use strict';

const assert = require('assert');
const glob = require('glob');
const _ = require('lodash');
const pluralize = require('pluralize');

module.exports = function mountRoutes(app, dir, options) {
  options = options || {};
  options = _.defaults(options, {
    ignore: '',
    urlPrefix: '/',
    logger: console.log,
    autoPlural: true
  });
  const ignore = options.ignore;
  let urlPrefix = options.urlPrefix;
  let logger = options.logger;
  const autoPlural = options.autoPlural;

  logger = logger || (() => {});
  urlPrefix = _.trimEnd(urlPrefix, '/') + '/';

  logger('\nMounted Routes:\n');

  glob.sync(`${dir}/**/*.js`, { ignore: ignore }).forEach(file => {
    const controllers = require(file);

    assert(_.isPlainObject(controllers));

    _.forOwn(controllers, (value, key) => {
      let moduleName = file.slice(file.lastIndexOf('/') + 1, -3);
      if (autoPlural) moduleName = pluralize(moduleName);
      const url = `${urlPrefix}${moduleName}${key}`;

      let handlers = value;
      if (_.isFunction(handlers)) handlers = [handlers];

      if (_.isArray(handlers)) {
        app.get(url, handlers);
        logger(`GET ${url}`);
      } else if (_.isPlainObject(handlers)) {
        _.forOwn(handlers, (funcs, method) => {
          if (_.isFunction(funcs)) funcs = [funcs];
          app[method](url, funcs);
          logger(`${_.toUpper(method)} ${url}`);
        });
      }
    });
  });

  logger('');
};
