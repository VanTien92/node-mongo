"use strict";

const Log = require('log');
const log = new Log('debug');

const afterLoad = require('after-load');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const tickerService = require('../service/tickersService');

const CronJob = require('cron').CronJob;

var TriggerData = function () {
    this.cronJob();
};

TriggerData.prototype = {
    cronJob: function () {
        var $this = this;
        new CronJob({
            cronTime: '0 * * * * *',
            onTick: function() {
                log.debug("CRON RUN");
                $this.parseAndSavingData();
            },
            start: true,
            timeZone: 'Etc/GMT'
        });
    },
    parseAndSavingData: function () {
        afterLoad('https://coinmarketcap.com/new/', function(html){
            const dom = new JSDOM(html);

            let oTable = dom.window.document.getElementsByClassName('table')[0];

            let rowLength = oTable.rows.length;

            for (let i = 1; i < rowLength; i++){
                let oCells = oTable.rows.item(i).cells;

                let name = oCells.item(0).querySelector("a").innerHTML;
                let symbol = oCells.item(1).innerHTML;

                tickerService.saveTicker(name, symbol);
            }
        });
    }
};

module.exports = new TriggerData();