/* */ 
(function(process) {
  var path = require('path');
  var read = require('fs-readdir-recursive');
  module.exports = readPartials;
  function readPartials(partialsPath, partialExtension, layoutsPath, metalsmith) {
    var partialsAbs = path.isAbsolute(partialsPath) ? partialsPath : path.join(metalsmith.path(), partialsPath);
    var layoutsAbs = path.isAbsolute(layoutsPath) ? layoutsPath : path.join(metalsmith.path(), layoutsPath);
    var files = read(partialsAbs);
    var partials = {};
    if (files.length === 0) {
      return partials;
    }
    for (var i = 0; i < files.length; i++) {
      var fileInfo = path.parse(files[i]);
      var name = path.join(fileInfo.dir, fileInfo.name);
      var partialAbs = path.join(partialsAbs, name);
      var partialPath = path.relative(layoutsAbs, partialAbs);
      if (!partialExtension || fileInfo.ext == partialExtension) {
        partials[name.replace(/\\/g, '/')] = partialPath;
      }
    }
    return partials;
  }
})(require('process'));
