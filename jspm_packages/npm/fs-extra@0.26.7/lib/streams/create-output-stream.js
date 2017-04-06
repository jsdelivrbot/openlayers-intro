/* */ 
var path = require('path');
var fs = require('fs');
var mkdir = require('../mkdirs/index');
var WriteStream = fs.WriteStream;
function createOutputStream(file, options) {
  var dirExists = false;
  var dir = path.dirname(file);
  options = options || {};
  if (options.fd) {
    return fs.createWriteStream(file, options);
  } else {
    options.fd = -1;
  }
  var ws = new WriteStream(file, options);
  var oldOpen = ws.open;
  ws.open = function() {
    ws.fd = null;
    if (dirExists)
      return oldOpen.call(ws);
    mkdir.mkdirs(dir, function(err) {
      if (err) {
        ws.destroy();
        ws.emit('error', err);
        return;
      }
      dirExists = true;
      oldOpen.call(ws);
    });
  };
  ws.open();
  return ws;
}
module.exports = createOutputStream;
