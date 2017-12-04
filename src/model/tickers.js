'use strict';

const mongoose = require('../config/mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, unique: true },
    platform: String
});

// the schema is useless so far
// we need to create a model using it
var Tickers = mongoose.model('tickers', userSchema);

// make this available to our users in our Node applications
module.exports = Tickers;