/* */ 
(function(process) {
  'use strict';
  var env = require('../env');
  var config = env.conf.markdown || {};
  var defaultTags = ['author', 'classdesc', 'description', 'exceptions', 'params', 'properties', 'returns', 'see'];
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var parse = require('../util/markdown').getParser();
  var tags = [];
  var excludeTags = [];
  function shouldProcessString(tagName, text) {
    var shouldProcess = true;
    if ((tagName === 'author' || tagName === 'see') && text.indexOf('[') === -1) {
      shouldProcess = false;
    }
    return shouldProcess;
  }
  function process(doclet) {
    tags.forEach(function(tag) {
      if (!hasOwnProp.call(doclet, tag)) {
        return;
      }
      if (typeof doclet[tag] === 'string' && shouldProcessString(tag, doclet[tag])) {
        doclet[tag] = parse(doclet[tag]);
      } else if (Array.isArray(doclet[tag])) {
        doclet[tag].forEach(function(value, index, original) {
          var inner = {};
          inner[tag] = value;
          process(inner);
          original[index] = inner[tag];
        });
      } else if (doclet[tag]) {
        process(doclet[tag]);
      }
    });
  }
  if (config.tags) {
    tags = config.tags.slice();
  }
  if (config.excludeTags) {
    excludeTags = config.excludeTags.slice();
  }
  defaultTags.forEach(function(tag) {
    if (excludeTags.indexOf(tag) === -1 && tags.indexOf(tag) === -1) {
      tags.push(tag);
    }
  });
  exports.handlers = {newDoclet: function(e) {
      process(e.doclet);
    }};
})(require('process'));
