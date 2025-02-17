/* */ 
var tokenize = require('./tokenize');
var MAX_RANGE = 0x1FFFFFFF;
var onfieldoptions = function(tokens) {
  var opts = {};
  while (tokens.length) {
    switch (tokens[0]) {
      case '[':
      case ',':
        tokens.shift();
        var name = tokens.shift();
        if (name === '(') {
          name = tokens.shift();
          tokens.shift();
        }
        if (tokens[0] !== '=')
          throw new Error('Unexpected token in field options: ' + tokens[0]);
        tokens.shift();
        if (tokens[0] === ']')
          throw new Error('Unexpected ] in field option');
        opts[name] = tokens.shift();
        break;
      case ']':
        tokens.shift();
        return opts;
      default:
        throw new Error('Unexpected token in field options: ' + tokens[0]);
    }
  }
  throw new Error('No closing tag for field options');
};
var onfield = function(tokens) {
  var field = {
    name: null,
    type: null,
    tag: 0,
    map: null,
    oneof: null,
    required: false,
    repeated: false,
    options: {}
  };
  while (tokens.length) {
    switch (tokens[0]) {
      case '=':
        tokens.shift();
        field.tag = Number(tokens.shift());
        break;
      case 'map':
        field.type = 'map';
        field.map = {
          from: null,
          to: null
        };
        tokens.shift();
        if (tokens[0] !== '<')
          throw new Error('Unexpected token in map type: ' + tokens[0]);
        tokens.shift();
        field.map.from = tokens.shift();
        if (tokens[0] !== ',')
          throw new Error('Unexpected token in map type: ' + tokens[0]);
        tokens.shift();
        field.map.to = tokens.shift();
        if (tokens[0] !== '>')
          throw new Error('Unexpected token in map type: ' + tokens[0]);
        tokens.shift();
        field.name = tokens.shift();
        break;
      case 'repeated':
      case 'required':
      case 'optional':
        var t = tokens.shift();
        field.required = t === 'required';
        field.repeated = t === 'repeated';
        field.type = tokens.shift();
        field.name = tokens.shift();
        break;
      case '[':
        field.options = onfieldoptions(tokens);
        break;
      case ';':
        tokens.shift();
        return field;
      default:
        throw new Error('Unexpected token in message field: ' + tokens[0]);
    }
  }
  throw new Error('No ; found for message field');
};
var onmessagebody = function(tokens) {
  var body = {
    enums: [],
    messages: [],
    fields: [],
    extensions: null
  };
  while (tokens.length) {
    switch (tokens[0]) {
      case 'map':
      case 'repeated':
      case 'optional':
      case 'required':
        body.fields.push(onfield(tokens));
        break;
      case 'enum':
        body.enums.push(onenum(tokens));
        break;
      case 'message':
        body.messages.push(onmessage(tokens));
        break;
      case 'extensions':
        body.extensions = onextensions(tokens);
        break;
      case 'oneof':
        tokens.shift();
        var name = tokens.shift();
        if (tokens[0] !== '{')
          throw new Error('Unexpected token in oneof: ' + tokens[0]);
        tokens.shift();
        while (tokens[0] !== '}') {
          tokens.unshift('optional');
          var field = onfield(tokens);
          field.oneof = name;
          body.fields.push(field);
        }
        tokens.shift();
        break;
      case ';':
        tokens.shift();
        break;
      default:
        tokens.unshift('optional');
        body.fields.push(onfield(tokens));
    }
  }
  return body;
};
var onextend = function(tokens) {
  var out = {
    name: tokens[1],
    message: onmessage(tokens)
  };
  return out;
};
var onextensions = function(tokens) {
  tokens.shift();
  var from = Number(tokens.shift());
  if (isNaN(from))
    throw new Error('Invalid from in extensions definition');
  if (tokens.shift() !== 'to')
    throw new Error("Expected keyword 'to' in extensions definition");
  var to = tokens.shift();
  if (to === 'max')
    to = MAX_RANGE;
  to = Number(to);
  if (isNaN(to))
    throw new Error('Invalid to in extensions definition');
  if (tokens.shift() !== ';')
    throw new Error('Missing ; in extensions definition');
  return {
    from: from,
    to: to
  };
};
var onmessage = function(tokens) {
  tokens.shift();
  var lvl = 1;
  var body = [];
  var msg = {
    name: tokens.shift(),
    enums: [],
    messages: [],
    fields: []
  };
  if (tokens[0] !== '{')
    throw new Error('Expected { but found ' + tokens[0]);
  tokens.shift();
  while (tokens.length) {
    if (tokens[0] === '{')
      lvl++;
    else if (tokens[0] === '}')
      lvl--;
    if (!lvl) {
      tokens.shift();
      body = onmessagebody(body);
      msg.enums = body.enums;
      msg.messages = body.messages;
      msg.fields = body.fields;
      msg.extensions = body.extensions;
      return msg;
    }
    body.push(tokens.shift());
  }
  if (lvl)
    throw new Error('No closing tag for message');
};
var onpackagename = function(tokens) {
  tokens.shift();
  var name = tokens.shift();
  if (tokens[0] !== ';')
    throw new Error('Expected ; but found ' + tokens[0]);
  tokens.shift();
  return name;
};
var onsyntaxversion = function(tokens) {
  tokens.shift();
  if (tokens[0] !== '=')
    throw new Error('Expected = but found ' + tokens[0]);
  tokens.shift();
  var version = tokens.shift();
  switch (version) {
    case '"proto2"':
      version = 2;
      break;
    case '"proto3"':
      version = 3;
      break;
    default:
      throw new Error('Expected protobuf syntax version but found ' + version);
  }
  if (tokens[0] !== ';')
    throw new Error('Expected ; but found ' + tokens[0]);
  tokens.shift();
  return version;
};
var onenumvalue = function(tokens) {
  if (tokens.length < 4)
    throw new Error('Invalid enum value: ' + tokens.slice(0, 3).join(' '));
  if (tokens[1] !== '=')
    throw new Error('Expected = but found ' + tokens[1]);
  if (tokens[3] !== ';')
    throw new Error('Expected ; but found ' + tokens[1]);
  var name = tokens.shift();
  tokens.shift();
  var value = Number(tokens.shift());
  tokens.shift();
  return {
    name: name,
    value: value
  };
};
var onenum = function(tokens) {
  tokens.shift();
  var e = {
    name: tokens.shift(),
    values: {}
  };
  if (tokens[0] !== '{')
    throw new Error('Expected { but found ' + tokens[0]);
  tokens.shift();
  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      if (tokens[0] === ';')
        tokens.shift();
      return e;
    }
    if (tokens[0] === 'option') {
      while (tokens.shift() !== ';') {}
    }
    var val = onenumvalue(tokens);
    e.values[val.name] = val.value;
  }
  throw new Error('No closing tag for enum');
};
var onoption = function(tokens) {
  var name = null;
  var value = null;
  var parse = function(value) {
    if (value === 'true')
      return true;
    if (value === 'false')
      return false;
    return value.replace(/^"+|"+$/gm, '');
  };
  while (tokens.length) {
    if (tokens[0] === ';') {
      tokens.shift();
      return {
        name: name,
        value: value
      };
    }
    switch (tokens[0]) {
      case 'option':
        tokens.shift();
        var hasBracket = tokens[0] === '(';
        if (hasBracket)
          tokens.shift();
        name = tokens.shift();
        if (hasBracket) {
          if (tokens[0] !== ')')
            throw new Error('Expected ) but found ' + tokens[0]);
          tokens.shift();
        }
        break;
      case '=':
        tokens.shift();
        if (name === null)
          throw new Error('Expected key for option with value: ' + tokens[0]);
        value = parse(tokens.shift());
        if (name === 'optimize_for' && !/^(SPEED|CODE_SIZE|LITE_RUNTIME)$/.test(value)) {
          throw new Error('Unexpected value for option optimize_for: ' + value);
        } else if (value === '{') {
          value = onoptionMap(tokens);
        }
        break;
      default:
        throw new Error('Unexpected token in option: ' + tokens[0]);
    }
  }
};
var onoptionMap = function(tokens) {
  var parse = function(value) {
    if (value === 'true')
      return true;
    if (value === 'false')
      return false;
    return value.replace(/^"+|"+$/gm, '');
  };
  var map = {};
  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      return map;
    }
    var hasBracket = tokens[0] === '(';
    if (hasBracket)
      tokens.shift();
    var key = tokens.shift();
    if (hasBracket) {
      if (tokens[0] !== ')')
        throw new Error('Expected ) but found ' + tokens[0]);
      tokens.shift();
    }
    var value = null;
    switch (tokens[0]) {
      case ':':
        if (map[key] !== undefined)
          throw new Error('Duplicate option map key ' + key);
        tokens.shift();
        value = parse(tokens.shift());
        if (value === '{') {
          value = onoptionMap(tokens);
        }
        map[key] = value;
        break;
      case '{':
        tokens.shift();
        value = onoptionMap(tokens);
        if (map[key] === undefined)
          map[key] = [];
        if (!Array.isArray(map[key]))
          throw new Error('Duplicate option map key ' + key);
        map[key].push(value);
        break;
      default:
        throw new Error('Unexpected token in option map: ' + tokens[0]);
    }
  }
  throw new Error('No closing tag for option map');
};
var onimport = function(tokens) {
  tokens.shift();
  var file = tokens.shift().replace(/^"+|"+$/gm, '');
  if (tokens[0] !== ';')
    throw new Error('Unexpected token: ' + tokens[0] + '. Expected ";"');
  tokens.shift();
  return file;
};
var onservice = function(tokens) {
  tokens.shift();
  var service = {
    name: tokens.shift(),
    methods: [],
    options: {}
  };
  if (tokens[0] !== '{')
    throw new Error('Expected { but found ' + tokens[0]);
  tokens.shift();
  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      if (tokens[0] === ';')
        tokens.shift();
      return service;
    }
    switch (tokens[0]) {
      case 'option':
        var opt = onoption(tokens);
        if (service.options[opt.name] !== undefined)
          throw new Error('Duplicate option ' + opt.name);
        service.options[opt.name] = opt.value;
        break;
      case 'rpc':
        service.methods.push(onrpc(tokens));
        break;
      default:
        throw new Error('Unexpected token in service: ' + tokens[0]);
    }
  }
  throw new Error('No closing tag for service');
};
var onrpc = function(tokens) {
  tokens.shift();
  var rpc = {
    name: tokens.shift(),
    input_type: null,
    output_type: null,
    client_streaming: false,
    server_streaming: false,
    options: {}
  };
  if (tokens[0] !== '(')
    throw new Error('Expected ( but found ' + tokens[0]);
  tokens.shift();
  if (tokens[0] === 'stream') {
    tokens.shift();
    rpc.client_streaming = true;
  }
  rpc.input_type = tokens.shift();
  if (tokens[0] !== ')')
    throw new Error('Expected ) but found ' + tokens[0]);
  tokens.shift();
  if (tokens[0] !== 'returns')
    throw new Error('Expected returns but found ' + tokens[0]);
  tokens.shift();
  if (tokens[0] !== '(')
    throw new Error('Expected ( but found ' + tokens[0]);
  tokens.shift();
  if (tokens[0] === 'stream') {
    tokens.shift();
    rpc.server_streaming = true;
  }
  rpc.output_type = tokens.shift();
  if (tokens[0] !== ')')
    throw new Error('Expected ) but found ' + tokens[0]);
  tokens.shift();
  if (tokens[0] === ';') {
    tokens.shift();
    return rpc;
  }
  if (tokens[0] !== '{')
    throw new Error('Expected { but found ' + tokens[0]);
  tokens.shift();
  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      if (tokens[0] === ';')
        tokens.shift();
      return rpc;
    }
    if (tokens[0] === 'option') {
      var opt = onoption(tokens);
      if (rpc.options[opt.name] !== undefined)
        throw new Error('Duplicate option ' + opt.name);
      rpc.options[opt.name] = opt.value;
    } else {
      throw new Error('Unexpected token in rpc options: ' + tokens[0]);
    }
  }
  throw new Error('No closing tag for rpc');
};
var parse = function(buf) {
  var tokens = tokenize(buf.toString());
  for (var i = 0; i < tokens.length; i++) {
    if (/^(\"|\')([^\'\"]*)$/.test(tokens[i])) {
      var j;
      if (tokens[i].length === 1) {
        j = i + 1;
      } else {
        j = i;
      }
      for (j; j < tokens.length; j++) {
        if (/^([^\'\"]*)(\"|\')$/.test(tokens[j])) {
          tokens = tokens.slice(0, i).concat(tokens.slice(i, j + 1).join('')).concat(tokens.slice(j + 1));
          break;
        }
      }
    }
  }
  var schema = {
    syntax: 3,
    package: null,
    imports: [],
    enums: [],
    messages: [],
    options: {},
    extends: []
  };
  var firstline = true;
  while (tokens.length) {
    switch (tokens[0]) {
      case 'package':
        schema.package = onpackagename(tokens);
        break;
      case 'syntax':
        if (!firstline)
          throw new Error('Protobuf syntax version should be first thing in file');
        schema.syntax = onsyntaxversion(tokens);
        break;
      case 'message':
        schema.messages.push(onmessage(tokens));
        break;
      case 'enum':
        schema.enums.push(onenum(tokens));
        break;
      case 'option':
        var opt = onoption(tokens);
        if (schema.options[opt.name])
          throw new Error('Duplicate option ' + opt.name);
        schema.options[opt.name] = opt.value;
        break;
      case 'import':
        schema.imports.push(onimport(tokens));
        break;
      case 'extend':
        schema.extends.push(onextend(tokens));
        break;
      case 'service':
        if (!schema.services)
          schema.services = [];
        schema.services.push(onservice(tokens));
        break;
      default:
        throw new Error('Unexpected token: ' + tokens[0]);
    }
    firstline = false;
  }
  schema.extends.forEach(function(ext) {
    schema.messages.forEach(function(msg) {
      if (msg.name === ext.name) {
        ext.message.fields.forEach(function(field) {
          if (!msg.extensions || field.tag < msg.extensions.from || field.tag > msg.extensions.to) {
            throw new Error(msg.name + ' does not declare ' + field.tag + ' as an extension number');
          }
          msg.fields.push(field);
        });
      }
    });
  });
  return schema;
};
module.exports = parse;
