/* */ 
var thunkify = require('thunkify-wrap');
var stream = require('co-from-stream');
var methods = require('./methods');
var fs = require('fs-extra');
for (var key in fs) {
  exports[key] = fs[key];
}
exports.exists = function(path) {
  return function(done) {
    fs.stat(path, function(err, res) {
      done(null, !err);
    });
  };
};
exports.createReadStream = function() {
  return stream(fs.createReadStream.apply(null, arguments));
};
thunkify(module.exports, methods);
