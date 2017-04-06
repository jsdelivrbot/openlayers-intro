/* */ 
var path = require('path');
var cachedPathRelative = require('./lib/index');
path.relative = cachedPathRelative;
