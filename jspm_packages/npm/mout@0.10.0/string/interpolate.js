/* */ 
var toString = require('../lang/toString');
var get = require('../object/get');
var stache = /\{\{([^\}]+)\}\}/g;
function interpolate(template, replacements, syntax) {
  template = toString(template);
  var replaceFn = function(match, prop) {
    return toString(get(replacements, prop));
  };
  return template.replace(syntax || stache, replaceFn);
}
module.exports = interpolate;
