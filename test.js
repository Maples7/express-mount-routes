const path = require('path');
const test = require('ava');
const request = require('supertest');
const express = require('express');
const routes = require('./index.js');

function makeApp() {
  const app = express();
  routes(app, path.join(__dirname, 'controllers'), {urlPrefix: '/api/v1/'});
  return app;
}

test('GET /api/v1/weibos/', async t => {
  t.plan(2);

  const res = await request(makeApp())
    .get('/api/v1/weibos/');

  t.is(res.status, 200);
  t.is(res.text, 'Weibos Index');
});

test('GET /api/v1/weibos/:id', async t => {
  t.plan(2);

  const res = await request(makeApp())
    .get('/api/v1/weibos/7');

  t.is(res.status, 200);
  t.is(res.text, 'get weibo: 7');
});

test('POST /api/v1/weibos/:id', async t => {
  t.plan(2);

  const res = await request(makeApp())
    .post('/api/v1/weibos/6');

  t.is(res.status, 200);
  t.is(res.text, 'post weibo: 6');
});

test('DELETE /api/v1/weibos/temp', async t => {
  t.plan(2);

  const res = await request(makeApp())
    .delete('/api/v1/weibos/temp');

  t.is(res.status, 200);
  t.is(res.text, 'ordinary api');
});

test('GET /api/v1/users/temp', async t => {
  t.plan(2);

  const res = await request(makeApp())
    .delete('/api/v1/weibos/temp');

  t.is(res.status, 200);
  t.is(res.text, 'ordinary api');
});
