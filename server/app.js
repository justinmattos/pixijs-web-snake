const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use('/public', express.static('./public'));
app.use('/dist', express.static('./dist'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
