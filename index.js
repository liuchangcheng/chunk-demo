const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Hello, chunk-demo202609!');
});

module.exports = app;
