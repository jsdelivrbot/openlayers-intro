/* */ 
(function(process) {
  var path = require('path');
  var relative = path.relative;
  var lastCwd = process.cwd();
  var cache = {};
  module.exports = cachedPathRelative;
  function cachedPathRelative(from, to) {
    var cwd = process.cwd();
    if (cwd !== lastCwd) {
      cache = {};
      lastCwd = cwd;
    }
    if (cache[from] && cache[from][to])
      return cache[from][to];
    var result = relative.call(path, from, to);
    cache[from] = cache[from] || {};
    cache[from][to] = result;
    return result;
  }
})(require('process'));
