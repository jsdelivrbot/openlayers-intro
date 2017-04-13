/* */ 
var temp = require('./lib/temp').track();
var p = temp.mkdirSync("shouldBeDeletedOnExitNotJasmine");
console.log('created dir ' + p);
