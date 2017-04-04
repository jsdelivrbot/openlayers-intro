/* */ 
'use strict';
var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('./lib/parsers');
module.exports = matter;
function matter(str, options) {
  if (typeof str !== 'string') {
    throw new Error('gray-matter expects a string');
  }
  var res = {
    orig: str,
    data: {},
    content: str
  };
  if (str === '') {
    return res;
  }
  var delims = arrayify((options && options.delims) || '---');
  var a = delims[0];
  str = stripBom(str);
  if (!isFirst(str, a)) {
    return res;
  }
  var b = '\n' + (delims[1] || delims[0]);
  var alen = a.length;
  if (a.indexOf(str.charAt(alen + 1)) !== -1) {
    return res;
  }
  var len = str.length;
  var end = str.indexOf(b, alen + 1);
  if (end === -1) {
    end = len;
  }
  var lang = str.slice(alen, str.indexOf('\n'));
  var start = alen + lang.length;
  var opts = options || {};
  opts.lang = opts.lang || 'yaml';
  lang = (lang && lang.trim()) || opts.lang;
  var data = str.slice(start, end).trim();
  if (data) {
    var fn = opts.parser || parsers[lang];
    if (typeof fn === 'function') {
      res.data = fn(data, opts);
    } else {
      throw new Error('gray-matter cannot find a parser for: ' + str);
    }
  }
  var con = str.substr(end + b.length);
  if (con.charAt(0) === '\n') {
    con = con.substr(1);
  } else if (con.charAt(0) === '\r' && con.charAt(1) === '\n') {
    con = con.substr(2);
  }
  res.content = con;
  return res;
}
matter.parsers = parsers;
var YAML = matter.parsers.requires.yaml || (matter.parsers.requires.yaml = require('js-yaml'));
matter.read = function(fp, options) {
  var str = fs.readFileSync(fp, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {path: fp});
};
matter.stringify = function(str, data, options) {
  var delims = arrayify(options && options.delims || '---');
  var res = '';
  res += delims[0] + '\n';
  res += YAML.safeDump(data, options);
  res += (delims[1] || delims[0]) + '\n';
  res += str + '\n';
  return res;
};
matter.test = function(str, options) {
  var delims = arrayify(options && options.delims || '---');
  return isFirst(str, delims[0]);
};
function isFirst(str, ch) {
  return str.substr(0, ch.length) === ch;
}
function stripBom(str) {
  return str.charAt(0) === '\uFEFF' ? str.slice(1) : str;
}
function arrayify(val) {
  return !Array.isArray(val) ? [val] : val;
}
