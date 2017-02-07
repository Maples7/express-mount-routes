module.exports = {
  '/': (req, res, next) => {
    res.end('Weibos Index');
  },
  '/:id': {
    'get': (req, res, next) => {
      res.end(`get weibo: ${req.params.id}`);
    },
    'post': (req, res, next) => {
      res.end(`post weibo: ${req.params.id}`);
    }
  },
  '/temp': {
    'delete': (req, res, next) => {
      res.end('ordinary api');
    }
  }
};
