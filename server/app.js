const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

module.exports = app;
