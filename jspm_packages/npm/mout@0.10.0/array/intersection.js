/* */ 
var unique = require('./unique');
var filter = require('./filter');
var every = require('./every');
var contains = require('./contains');
var slice = require('./slice');
function intersection(arr) {
  var arrs = slice(arguments, 1),
      result = filter(unique(arr), function(needle) {
        return every(arrs, function(haystack) {
          return contains(haystack, needle);
        });
      });
  return result;
}
module.exports = intersection;
