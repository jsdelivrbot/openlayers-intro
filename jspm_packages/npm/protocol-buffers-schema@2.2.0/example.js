/* */ 
var schema = require('../protocol-buffers-schema@2.2.0.json!systemjs-json');
var fs = require('fs');
var sch = schema.parse(fs.readFileSync('example.proto'));
console.log('Parsed schema:');
console.log(JSON.stringify(sch, null, 2));
console.log('');
console.log('Stringified schema:');
console.log(schema.stringify(sch));
