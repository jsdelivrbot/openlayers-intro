/* */ 
'use strict';
var EventEmitter = require('events').EventEmitter;
var enable = require('enable');
module.exports = function(input, ctx, methods) {
  return wrapify(input, ctx, methods, thunkify);
};
function wrapify(input, ctx, methods, wrapfn) {
  var type = typeof input;
  if (type === 'function') {
    return wrapfn(input, ctx);
  }
  if (type === 'object') {
    if (Array.isArray(ctx)) {
      methods = ctx;
      ctx = input;
    }
    if (typeof ctx === 'string') {
      methods = [ctx];
      ctx = input;
    }
    ctx = ctx === undefined ? input : ctx;
    if (methods && methods.length) {
      methods.forEach(function(method) {
        input[method] = wrapfn(input[method], ctx);
      });
    } else {
      for (var key in input) {
        if (typeof input[key] === 'function') {
          input[key] = wrapfn(input[key], ctx);
        }
      }
    }
    return input;
  }
  throw new TypeError('thunkify accept only `function` or `object`');
}
var slice = Array.prototype.slice;
function thunkify(fn, ctx) {
  if (!fn) {
    return fn;
  }
  if (isGeneratorFunction(fn)) {
    return fn;
  }
  if (fn.toString() === thunk.toString()) {
    return fn;
  }
  function thunk() {
    var args = slice.call(arguments);
    var results;
    var called;
    var cb;
    args.push(function() {
      results = arguments;
      if (cb && !called) {
        called = true;
        cb.apply(this, results);
      }
    });
    fn.apply(ctx || this, args);
    return function(fn) {
      cb = fn;
      if (results && !called) {
        called = true;
        fn.apply(ctx || this, results);
      }
    };
  }
  return thunk;
}
module.exports.event = function(e, globalEvents) {
  globalEvents = globalEvents || ['end'];
  return function(endEvents) {
    var called = false;
    endEvents = endEvents || globalEvents;
    if (!Array.isArray(endEvents)) {
      endEvents = [endEvents];
    }
    return function(done) {
      function _done(err, data) {
        if (called) {
          return;
        }
        called = true;
        e.removeListener('error', _done);
        endEvents.forEach(function(name) {
          e.removeListener(name, end);
        });
        done(err, data);
      }
      function end(data) {
        _done(null, data);
      }
      e.once('error', _done);
      endEvents.forEach(function(name) {
        e.once(name, end);
      });
    };
  };
};
if (enable.generator) {
  var genify = require('./genify')(thunkify);
  module.exports.genify = function(input, ctx, methods) {
    return wrapify(input, ctx, methods, genify);
  };
}
function isGeneratorFunction(fn) {
  return typeof fn === 'function' && fn.constructor.name === 'GeneratorFunction';
}
