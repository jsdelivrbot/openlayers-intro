/* */ 
(function(Buffer) {
  goog.provide('ol.size');
  ol.size.buffer = function(size, buffer, opt_size) {
    if (opt_size === undefined) {
      opt_size = [0, 0];
    }
    opt_size[0] = size[0] + 2 * buffer;
    opt_size[1] = size[1] + 2 * buffer;
    return opt_size;
  };
  ol.size.hasArea = function(size) {
    return size[0] > 0 && size[1] > 0;
  };
  ol.size.scale = function(size, ratio, opt_size) {
    if (opt_size === undefined) {
      opt_size = [0, 0];
    }
    opt_size[0] = (size[0] * ratio + 0.5) | 0;
    opt_size[1] = (size[1] * ratio + 0.5) | 0;
    return opt_size;
  };
  ol.size.toSize = function(size, opt_size) {
    if (Array.isArray(size)) {
      return size;
    } else {
      if (opt_size === undefined) {
        opt_size = [size, size];
      } else {
        opt_size[0] = opt_size[1] = (size);
      }
      return opt_size;
    }
  };
})(require('buffer').Buffer);
