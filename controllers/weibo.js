'use strict';

module.exports = {
  '/': (req, res, next) => {
    res.end('Weibos Index');
  },
  '/getArr': [
    (req, res, next) => {
      res.end('GET for one more handlers');
    }
  ],
  '/:id': {
    'get': (req, res, next) => {
      res.end(`get weibo: ${req.params.id}`);
    },
    'post': (req, res, next) => {
      res.end(`post weibo: ${req.params.id}`);
    }
  },
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
