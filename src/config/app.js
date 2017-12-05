'use strict';

const properties = require('../../properties.json');
const port = properties.SERVER_PORT;

const express = require('express');

const app = express();

const cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/resources',express.static(__dirname +  '/../../resources'));

app.listen(port);

module.exports = app;