'use strict';

const app = require('../config/app');

const afterLoad = require('after-load');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const TableData = require('../dto/tableData');

app.get('/', function(req, res) {
    afterLoad('https://coinmarketcap.com/new/', function(html){
        const dom = new JSDOM(html);

        var oTable = dom.window.document.getElementsByClassName('table')[0];

        var rowLength = oTable.rows.length;

        var data = [];

        for (var i = 1; i < rowLength; i++){
            var oCells = oTable.rows.item(i).cells;

            var tableData = new TableData();

            tableData.url = oCells.item(0).querySelector("img").src ;
            tableData.name = oCells.item(0).querySelector("a").innerHTML;
            tableData.symbol = oCells.item(1).innerHTML;
            tableData.addedDate = oCells.item(2).innerHTML;
            tableData.marketCap = oCells.item(3).innerHTML;
            tableData.price = oCells.item(4).querySelector("a").innerHTML;
            var dataSupply = oCells.item(5).querySelector("a") || oCells.item(5).querySelector("span");
            tableData.circulating = (dataSupply != null) ? dataSupply.innerHTML : "";
            tableData.volume = (oCells.item(6) != null && oCells.item(6).querySelector("a") != null)? oCells.item(6).querySelector("a").innerHTML : "";
            tableData.percent = (oCells.item(7) != null && oCells.item(7).getAttribute("data-usd") != null)? parseFloat(oCells.item(7).getAttribute("data-usd")) : null;

            data.push(tableData);
        }
        res.render('index', {data: data});
    });

});

module.exports = this;