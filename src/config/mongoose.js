const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error);
mongoose.connect('mongodb://localhost/node-test');

module.exports = mongoose;