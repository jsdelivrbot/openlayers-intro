/* */ 
(function(process) {
  'use strict';
  var _ = require('underscore');
  var dump = require('../util/dumper').dump;
  var env = require('../env');
  var util = require('util');
  var conf = env.conf.eventDumper || {};
  var events = conf.include || ['parseBegin', 'fileBegin', 'beforeParse', 'jsdocCommentFound', 'symbolFound', 'newDoclet', 'fileComplete', 'parseComplete', 'processingComplete'];
  if (conf.exclude) {
    events = _.difference(events, conf.exclude);
  }
  function replaceNodeObjects(o) {
    var doop = require('../util/doop');
    var OBJECT_PLACEHOLDER = '<Object>';
    if (o.code && o.code.node) {
      o.code = doop(o.code);
      o.code.node = OBJECT_PLACEHOLDER;
    }
    if (o.doclet && o.doclet.meta && o.doclet.meta.code && o.doclet.meta.code.node) {
      o.doclet.meta.code = doop(o.doclet.meta.code);
      o.doclet.meta.code.node = OBJECT_PLACEHOLDER;
    }
    if (o.astnode) {
      o.astnode = OBJECT_PLACEHOLDER;
    }
    return o;
  }
  function cleanse(e) {
    var result = {};
    Object.keys(e).forEach(function(prop) {
      if (!conf.includeFunctions && util.isArray(e[prop]) && e[prop][0] && String(typeof e[prop][0]) === 'function') {
        result[prop] = 'function[' + e[prop].length + ']';
      } else if (typeof e[prop] !== 'function') {
        result[prop] = e[prop];
      }
    });
    if (conf.omitNodes) {
      result = replaceNodeObjects(result);
    }
    return result;
  }
  exports.handlers = {};
  events.forEach(function(eventType) {
    exports.handlers[eventType] = function(e) {
      console.log(dump({
        type: eventType,
        content: cleanse(e)
      }));
    };
  });
})(require('process'));
