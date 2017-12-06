"use strict";

const properties = require('../../properties.json');

const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error);
mongoose.connect(properties.MONGO_URI);

module.exports = mongoose;