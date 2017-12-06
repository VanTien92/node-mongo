"use strict";

const Log = require('log');
const log = new Log('debug');

require("./home");
require("../service/triggerDataService");

log.debug('Server is running at PID: ' + process.pid);