/* */ 
(function(process) {
  'use strict';
  var jsdoc = {
    env: require('../../env'),
    tag: {
      dictionary: require('../../tag/dictionary'),
      validator: require('../../tag/validator'),
      type: require('../../tag/type')
    },
    util: {logger: require('../../util/logger')}
  };
  var path = require('../../path');
  var util = require('util');
  function mustPreserveWhitespace(text, meta) {
    return meta && meta.code && meta.code.name === text && text.match(/(?:^\s+)|(?:\s+$)/);
  }
  function trim(text, opts, meta) {
    var indentMatcher;
    var match;
    opts = opts || {};
    text = String(typeof text !== 'undefined' ? text : '');
    if (mustPreserveWhitespace(text, meta)) {
      text = util.format('"%s"', text);
    } else if (opts.keepsWhitespace) {
      text = text.replace(/^[\n\r\f]+|[\n\r\f]+$/g, '');
      if (opts.removesIndent) {
        match = text.match(/^([ \t]+)/);
        if (match && match[1]) {
          indentMatcher = new RegExp('^' + match[1], 'gm');
          text = text.replace(indentMatcher, '');
        }
      }
    } else {
      text = text.replace(/^\s+|\s+$/g, '');
    }
    return text;
  }
  function addHiddenProperty(obj, propName, propValue) {
    Object.defineProperty(obj, propName, {
      value: propValue,
      writable: true,
      enumerable: !!jsdoc.env.opts.debug,
      configurable: true
    });
  }
  function parseType(tag, tagDef, meta) {
    try {
      return jsdoc.tag.type.parse(tag.text, tagDef.canHaveName, tagDef.canHaveType);
    } catch (e) {
      jsdoc.util.logger.error('Unable to parse a tag\'s type expression%s with tag title "%s" and text "%s": %s', meta.filename ? (' for source file ' + path.join(meta.path, meta.filename)) : '', tag.originalTitle, tag.text, e.message);
      return {};
    }
  }
  function processTagText(tag, tagDef, meta) {
    var tagType;
    if (tagDef.onTagText) {
      tag.text = tagDef.onTagText(tag.text);
    }
    if (tagDef.canHaveType || tagDef.canHaveName) {
      tag.value = {};
      tagType = parseType(tag, tagDef, meta);
      if (tagType.type) {
        if (tagType.type.length) {
          tag.value.type = {names: tagType.type};
          addHiddenProperty(tag.value.type, 'parsedType', tagType.parsedType);
        }
        ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(function(prop) {
          if (typeof tagType[prop] !== 'undefined') {
            tag.value[prop] = tagType[prop];
          }
        });
      }
      if (tagType.text && tagType.text.length) {
        tag.value.description = tagType.text;
      }
      if (tagDef.canHaveName) {
        if (tagType.name && tagType.name !== '-') {
          tag.value.name = tagType.name;
        }
      }
    } else {
      tag.value = tag.text;
    }
  }
  exports._replaceDictionary = function _replaceDictionary(dict) {
    jsdoc.tag.dictionary = dict;
  };
  var Tag = exports.Tag = function(tagTitle, tagBody, meta) {
    var tagDef;
    var trimOpts;
    meta = meta || {};
    this.originalTitle = trim(tagTitle);
    this.title = jsdoc.tag.dictionary.normalise(this.originalTitle);
    tagDef = jsdoc.tag.dictionary.lookUp(this.title);
    trimOpts = {
      keepsWhitespace: tagDef.keepsWhitespace,
      removesIndent: tagDef.removesIndent
    };
    this.text = trim(tagBody, trimOpts, meta);
    if (this.text) {
      processTagText(this, tagDef, meta);
    }
    jsdoc.tag.validator.validate(this, tagDef, meta);
  };
})(require('process'));
