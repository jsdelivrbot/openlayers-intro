/* */ 
var assert = require('assert');
var absolute = require('../absolute');
assert(absolute('/home/dave') === true);
assert(absolute('/something') === true);
assert(absolute('./myfile') === false);
assert(absolute('temp') === false);
