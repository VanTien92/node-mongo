'use strict';

const Log = require('log');
const log = new Log('debug');

const app = require('../config/app');

const Tickers = require('../model/tickers');

app.get('/', function(req, res) {
    Tickers.find({}, function(err, users) {
        if (err) throw err;

        users.forEach(function(user) {
            console.log(user._id);
        });
    });
    res.render('index');
});

log.debug('Server is running at PID: ' + process.pid);
