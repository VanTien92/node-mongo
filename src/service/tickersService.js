'use strict';

const Log = require('log');
const log = new Log('debug');

const Tickers = require('../model/tickers');

var TickerService = function () {};

TickerService.prototype = {
    saveTicker: function (id, symbol) {
        Tickers.findOne({}, {id: id, symbol: symbol}, function (err, ticker) {
            if (err) return next(err);
            if (ticker == null) {
                let newTicker = new Tickers({
                    id: id,
                    symbol: symbol,
                    platform: null,
                    new: true
                });
                newTicker.save(function(err){
                    if (err) {
                        log.debug(err);
                    }
                });
            } else {
                Tickers.update({id: id, symbol: symbol}, {
                    new: false,
                }, function(err, numberAffected, rawResponse) {
                    if (err) {
                        log.debug(err);
                    }
                });
            }
        });
    }
};

module.exports = new TickerService();