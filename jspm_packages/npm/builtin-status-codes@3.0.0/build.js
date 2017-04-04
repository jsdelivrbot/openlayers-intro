/* */ 
'use strict';
var fs = require('fs');
var statusCodes = require('../builtin-status-codes@3.0.0.json!systemjs-json');
var code = 'module.exports = ' + JSON.stringify(statusCodes, null, 2) + '\n';
fs.writeFileSync('browser.js', code);
