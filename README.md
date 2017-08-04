# express-mount-routes
[![Build Status](https://travis-ci.org/Maples7/express-mount-routes.svg?branch=master)](https://travis-ci.org/Maples7/express-mount-routes)
[![Coverage Status](https://coveralls.io/repos/github/Maples7/express-mount-routes/badge.svg?branch=master)](https://coveralls.io/github/Maples7/express-mount-routes?branch=master)
[![npm version](https://badge.fury.io/js/express-mount-routes.svg)](https://badge.fury.io/js/express-mount-routes)           
[![NPM](https://nodei.co/npm/express-mount-routes.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-mount-routes/)
[![NPM](https://nodei.co/npm-dl/express-mount-routes.png?months=6&height=3)](https://nodei.co/npm/express-mount-routes/)              
An express package to mount routes automatically from file system.

## Why?
- Avoid multiple router definition codes
- Reduce check point with auto-defined routes while debugging
- [CoC(Configuration over Convention)](https://en.wikipedia.org/wiki/Convention_over_configuration)

## Usage    
After `yarn add express-mount-routes` or `npm install express-mount-routes --save`:
```js
const path = require('path');
const express = require('express');
const routes = require('express-mount-routes');

const app = express();
routes(app, path.join(__dirname, 'controllers'), {urlPrefix: '/api/v1/'});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

### API Doc  
```js 
routes(
  app,    // app = require('express')();
  path,   // *absolute* path to the controllers dir
  {       // optional parameters, the 3rd param is not required
    ignore,     // files you want to ignore while scanning controllers dir such as index.js, see parameter options of module glob(https://github.com/isaacs/node-glob#options) for more infomation. Default value: ''
    urlPrefix,  // prefix for routes, such as /api/v1/. Default value: '/'
    logger,     // logger to print mounted routes. Default value: console, use `null` to disable log,
    autoPlural  // whether apply pluralized file name as part of routes automatically. Default value: true
  }
)
```

### How to write Controllers
You must export an object whose keys are last part of routes and values are objects (or array) with HTTP method and handlers. For example:
```js
// FileName: controllers/weibo.js

module.exports = {
  // when value is a function or an array of functions, the HTTP method would be default value GET
  '/': (req, res, next) => {
    res.end('Weibos Index');
  },
  // also you can provide one more handlers with an array of functions: these handlers except last one are called middlerwares in Express
  '/getArr': [
    (req, res, next) => {
      res.end('GET for one more handlers');
    }
  ]
  // also you can make URL params
  '/:id': {
    // explicitly identifing an HTTP method can never be wrong
    'get': (req, res, next) => {
      res.end(`get weibo: ${req.params.id}`);
    },
    'post': (req, res, next) => {
      res.end(`post weibo: ${req.params.id}`);
    }
  },
  // another example for usage of middlerwares
  '/temp': {
    'delete': [
      (req, res, next) => {
        res.myOwnVar = 'this is a middleware.';
        next();
      },
      (req, res, next) => {
        res.end(`${res.myOwnVar}ordinary api`);
      }
    ]
  }
};
```

At last, routes would be combined with `${urlPrefix} + ${pluralized file name of controllers} + ${identified keys}`. Therefore, examples above would mount these routes:
```
GET /api/v1/weibos/
GET /api/v1/weibos/getArr
GET /api/v1/weibos/:id
POST /api/v1/weibos/:id
DELETE /api/v1/weibos/temp
```

You are welcomed to review _test.js_ and _controllers_ dir in this project for more information of usage.

## LICENSE
[MIT](LICENSE)
