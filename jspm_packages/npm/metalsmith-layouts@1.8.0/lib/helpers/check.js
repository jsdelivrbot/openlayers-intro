/* */ 
(function(process) {
  var match = require('multimatch');
  var utf8 = require('is-utf8');
  module.exports = check;
  function check(files, file, pattern, def) {
    var data = files[file];
    if (!utf8(data.contents)) {
      return false;
    }
    if (pattern && !match(file, pattern)[0]) {
      return false;
    }
    return 'layout' in data ? data.layout : def;
  }
})(require('process'));
