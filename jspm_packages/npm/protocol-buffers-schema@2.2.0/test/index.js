/* */ 
var tape = require('tape');
var path = require('path');
var fs = require('fs');
var schema = require('../index');
var fixture = function(name) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf-8');
};
tape('basic parse', function(t) {
  t.same(schema.parse(fixture('basic.proto')), require('./fixtures/basic.json!systemjs-json'));
  t.end();
});
tape('basic parse + stringify', function(t) {
  var syntax = 'syntax = "proto3";\n\n';
  t.same(schema.stringify(schema.parse(fixture('basic.proto'))), syntax + fixture('basic.proto'));
  t.end();
});
tape('complex parse', function(t) {
  t.same(schema.parse(fixture('complex.proto')), require('./fixtures/complex.json!systemjs-json'));
  t.end();
});
tape('complex parse + stringify', function(t) {
  var syntax = 'syntax = "proto3";\n\n';
  t.same(schema.stringify(schema.parse(fixture('complex.proto'))), syntax + fixture('complex.proto'));
  t.end();
});
tape('throws on invalid', function(t) {
  t.plan(2);
  try {
    schema.parse('hello world');
  } catch (err) {
    t.ok(true, 'should fail');
  }
  try {
    schema.parse('message Foo { lol }');
  } catch (err) {
    t.ok(true, 'should fail');
  }
});
tape('comments parse', function(t) {
  t.same(schema.parse(fixture('comments.proto')), require('./fixtures/comments.json!systemjs-json'));
  t.end();
});
tape('schema with imports', function(t) {
  t.same(schema.parse(fixture('search.proto')), require('./fixtures/search.json!systemjs-json'));
  t.end();
});
tape('schema with imports loaded by path', function(t) {
  t.same(schema.parse(fixture('search.proto')), require('./fixtures/search.json!systemjs-json'));
  t.end();
});
tape('schema with extends', function(t) {
  t.same(schema.parse(fixture('extend.proto')), require('./fixtures/extend.json!systemjs-json'));
  t.end();
});
tape('comparing extended and not extended schema', function(t) {
  var sch = schema.parse(fixture('extend.proto'));
  t.same(sch.messages.MsgNormal, sch.messages.MsgExtend);
  t.end();
});
tape('schema with oneof', function(t) {
  t.same(schema.parse(fixture('oneof.proto')), require('./fixtures/oneof.json!systemjs-json'));
  t.end();
});
tape('schema with map', function(t) {
  t.same(schema.parse(fixture('map.proto')), require('./fixtures/map.json!systemjs-json'));
  t.end();
});
tape('schema with syntax version', function(t) {
  t.same(schema.parse(fixture('version.proto')), require('./fixtures/version.json!systemjs-json'));
  t.end();
});
tape('throws on misplaced syntax version', function(t) {
  t.plan(1);
  try {
    schema.parse('message Foo { required int32 a = 1; }\n syntax = "proto3"');
  } catch (err) {
    t.ok(true, 'should fail');
  }
});
tape('schema with reserved characters in options', function(t) {
  t.same(schema.parse(fixture('options.proto')), require('./fixtures/options.json!systemjs-json'));
  t.end();
});
tape('service parse', function(t) {
  t.same(schema.parse(fixture('service.proto')), require('./fixtures/service.json!systemjs-json'));
  t.end();
});
tape('service parse + stringify', function(t) {
  var syntax = 'syntax = "proto3";\n\n';
  t.same(schema.stringify(schema.parse(fixture('service.proto'))), syntax + fixture('service.proto'));
  t.end();
});
