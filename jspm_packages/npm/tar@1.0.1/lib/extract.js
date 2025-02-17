/* */ 
module.exports = Extract;
var tar = require('../tar'),
    fstream = require('fstream'),
    inherits = require('inherits'),
    path = require('path');
function Extract(opts) {
  if (!(this instanceof Extract))
    return new Extract(opts);
  tar.Parse.apply(this);
  opts.type = "Directory";
  opts.Directory = true;
  if (typeof opts !== "object") {
    opts = {path: opts};
  }
  opts.path = opts.path || path.resolve("node-tar-extract");
  opts.type = "Directory";
  opts.Directory = true;
  opts.strip = +opts.strip;
  if (!opts.strip || opts.strip <= 0)
    opts.strip = 0;
  this._fst = fstream.Writer(opts);
  this.pause();
  var me = this;
  me.on("entry", function(entry) {
    if (opts.strip) {
      var p = entry.path.split("/").slice(opts.strip).join("/");
      entry.path = entry.props.path = p;
      if (entry.linkpath) {
        var lp = entry.linkpath.split("/").slice(opts.strip).join("/");
        entry.linkpath = entry.props.linkpath = lp;
      }
    }
    if (entry.type !== "Link")
      return;
    entry.linkpath = entry.props.linkpath = path.join(opts.path, path.join("/", entry.props.linkpath));
  });
  this._fst.on("ready", function() {
    me.pipe(me._fst, {end: false});
    me.resume();
  });
  this._fst.on("close", function() {
    me.emit("end");
    me.emit("close");
  });
}
inherits(Extract, tar.Parse);
Extract.prototype._streamEnd = function() {
  var me = this;
  if (!me._ended)
    me.error("unexpected eof");
  me._fst.end();
};
