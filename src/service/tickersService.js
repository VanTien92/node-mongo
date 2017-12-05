'use strict';

const Log = require('log');
const log = new Log('debug');

const Tickers = require('../model/tickers');

var TickerService = function () {};

TickerService.prototype = {
    saveTicker: function (id, symbol) {
        var usersProjection = {
            __v: false,
            _id: false
        };

        Tickers.find({}, {id: id, symbol: symbol}, function (err, users) {
            if (err) return next(err);
            if (users.length == 0) {
                var tickers = new Tickers({
                    id: id,
                    symbol: symbol,
                    platform: null
                });
                tickers.save(function(err){
                    if (err) {
                        log.debug(err);
                    }
                });
            }
        });
    }
};

module.exports = TickerService;