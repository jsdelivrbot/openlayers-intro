/* */ 
var temp = require('../temp@0.8.3.json!systemjs-json').track();
var p = temp.mkdirSync("shouldBeDeletedOnExitNotJasmine");
console.log('created dir ' + p);
