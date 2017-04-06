/* */ 
'use strict';
var _ = require('underscore');
var jsdoc = {
  env: require('../../env'),
  name: require('../../name'),
  src: {
    astnode: require('../../src/astnode'),
    Syntax: require('../../src/syntax').Syntax
  },
  tag: {
    Tag: require('../../tag').Tag,
    dictionary: require('../../tag/dictionary')
  }
};
var path = require('../../path');
var Syntax = jsdoc.src.Syntax;
var util = require('util');
function applyTag(doclet, tag) {
  if (tag.title === 'name') {
    doclet.name = tag.value;
  }
  if (tag.title === 'kind') {
    doclet.kind = tag.value;
  }
  if (tag.title === 'description') {
    doclet.description = tag.value;
  }
}
function fakeMeta(node) {
  return {
    type: node ? node.type : null,
    node: node
  };
}
function codeToKind(code) {
  var isFunction = jsdoc.src.astnode.isFunction;
  var kind = 'member';
  var node = code.node;
  if (isFunction(code.type) && code.type !== Syntax.MethodDefinition) {
    kind = 'function';
  } else if (code.type === Syntax.MethodDefinition) {
    if (code.node.kind === 'constructor') {
      kind = 'class';
    } else if (code.node.kind !== 'get' && code.node.kind !== 'set') {
      kind = 'function';
    }
  } else if (code.type === Syntax.ClassDeclaration || code.type === Syntax.ClassExpression) {
    kind = 'class';
  } else if (code.type === Syntax.ExportAllDeclaration) {
    kind = codeToKind(fakeMeta(node.source));
  } else if (code.type === Syntax.ExportDefaultDeclaration || code.type === Syntax.ExportNamedDeclaration) {
    kind = codeToKind(fakeMeta(node.declaration));
  } else if (code.type === Syntax.ExportSpecifier) {
    kind = codeToKind(fakeMeta(node.local));
  } else if (code.node && code.node.parent && isFunction(code.node.parent)) {
    kind = 'param';
  }
  return kind;
}
function unwrap(docletSrc) {
  if (!docletSrc) {
    return '';
  }
  docletSrc = docletSrc.replace(/^\/\*\*+/, '').replace(/\**\*\/$/, '\\Z').replace(/^\s*(\* ?|\\Z)/gm, '').replace(/\s*\\Z$/g, '');
  return docletSrc;
}
function toTags(docletSrc) {
  var parsedTag;
  var tagData = [];
  var tagText;
  var tagTitle;
  docletSrc.replace(/^(\s*)@(\S)/gm, '$1\\@$2').split('\\@').forEach(function($) {
    if ($) {
      parsedTag = $.match(/^(\S+)(?:\s+(\S[\s\S]*))?/);
      if (parsedTag) {
        tagTitle = parsedTag[1];
        tagText = parsedTag[2];
        if (tagTitle) {
          tagData.push({
            title: tagTitle,
            text: tagText
          });
        }
      }
    }
  });
  return tagData;
}
function fixDescription(docletSrc, meta) {
  var isClass;
  if (!/^\s*@/.test(docletSrc) && docletSrc.replace(/\s/g, '').length) {
    isClass = meta.code && (meta.code.type === Syntax.ClassDeclaration || meta.code.type === Syntax.ClassExpression);
    docletSrc = (isClass ? '@classdesc' : '@description') + ' ' + docletSrc;
  }
  return docletSrc;
}
exports._replaceDictionary = function _replaceDictionary(dict) {
  jsdoc.tag.dictionary = dict;
  require('../../tag')._replaceDictionary(dict);
  require('../../util/templateHelper')._replaceDictionary(dict);
};
var Doclet = exports.Doclet = function(docletSrc, meta) {
  var newTags = [];
  this.comment = docletSrc;
  this.setMeta(meta);
  docletSrc = unwrap(docletSrc);
  docletSrc = fixDescription(docletSrc, meta);
  newTags = toTags.call(this, docletSrc);
  for (var i = 0,
      l = newTags.length; i < l; i++) {
    this.addTag(newTags[i].title, newTags[i].text);
  }
  this.postProcess();
};
Doclet.prototype.postProcess = function() {
  var i;
  var l;
  if (!this.preserveName) {
    jsdoc.name.resolve(this);
  }
  if (this.name && !this.longname) {
    this.setLongname(this.name);
  }
  if (this.memberof === '') {
    delete this.memberof;
  }
  if (!this.kind && this.meta && this.meta.code) {
    this.addTag('kind', codeToKind(this.meta.code));
  }
  if (this.variation && this.longname && !/\)$/.test(this.longname)) {
    this.longname += '(' + this.variation + ')';
  }
  if (this.params && this.meta && this.meta.code && this.meta.code.paramnames) {
    for (i = 0, l = this.params.length; i < l; i++) {
      if (!this.params[i].name) {
        this.params[i].name = this.meta.code.paramnames[i] || '';
      }
    }
  }
};
Doclet.prototype.addTag = function(title, text) {
  var tagDef = jsdoc.tag.dictionary.lookUp(title),
      newTag = new jsdoc.tag.Tag(title, text, this.meta);
  if (tagDef && tagDef.onTagged) {
    tagDef.onTagged(this, newTag);
  }
  if (!tagDef) {
    this.tags = this.tags || [];
    this.tags.push(newTag);
  }
  applyTag(this, newTag);
};
function removeGlobal(longname) {
  var globalRegexp = new RegExp('^' + jsdoc.name.LONGNAMES.GLOBAL + '\\.?');
  return longname.replace(globalRegexp, '');
}
Doclet.prototype.setMemberof = function(sid) {
  this.memberof = removeGlobal(sid).replace(/\.prototype/g, jsdoc.name.SCOPE.PUNC.INSTANCE);
};
Doclet.prototype.setLongname = function(name) {
  this.longname = removeGlobal(name);
  if (jsdoc.tag.dictionary.isNamespace(this.kind)) {
    this.longname = jsdoc.name.applyNamespace(this.longname, this.kind);
  }
};
function getFilepath(doclet) {
  if (!doclet || !doclet.meta || !doclet.meta.filename) {
    return '';
  }
  return path.join(doclet.meta.path || '', doclet.meta.filename);
}
Doclet.prototype.setScope = function(scope) {
  var errorMessage;
  var filepath;
  var scopeNames = _.values(jsdoc.name.SCOPE.NAMES);
  if (scopeNames.indexOf(scope) === -1) {
    filepath = getFilepath(this);
    errorMessage = util.format('The scope name "%s" is not recognized. Use one of the ' + 'following values: %j', scope, scopeNames);
    if (filepath) {
      errorMessage += util.format(' (Source file: %s)', filepath);
    }
    throw new Error(errorMessage);
  }
  this.scope = scope;
};
Doclet.prototype.borrow = function(source, target) {
  var about = {from: source};
  if (target) {
    about.as = target;
  }
  if (!this.borrowed) {
    this.borrowed = [];
  }
  this.borrowed.push(about);
};
Doclet.prototype.mix = function(source) {
  this.mixes = this.mixes || [];
  this.mixes.push(source);
};
Doclet.prototype.augment = function(base) {
  this.augments = this.augments || [];
  this.augments.push(base);
};
Doclet.prototype.setMeta = function(meta) {
  this.meta = this.meta || {};
  if (meta.range) {
    this.meta.range = meta.range.slice(0);
  }
  if (meta.lineno) {
    this.meta.filename = path.basename(meta.filename);
    this.meta.lineno = meta.lineno;
    var pathname = path.dirname(meta.filename);
    if (pathname && pathname !== '.') {
      this.meta.path = pathname;
    }
  }
  this.meta.code = this.meta.code || {};
  if (meta.id) {
    this.meta.code.id = meta.id;
  }
  if (meta.code) {
    if (meta.code.name) {
      this.meta.code.name = meta.code.name;
    }
    if (meta.code.type) {
      this.meta.code.type = meta.code.type;
    }
    if (meta.code.node) {
      Object.defineProperty(this.meta.code, 'node', {
        value: meta.code.node,
        enumerable: false
      });
    }
    if (meta.code.funcscope) {
      this.meta.code.funcscope = meta.code.funcscope;
    }
    if (typeof meta.code.value !== 'undefined') {
      this.meta.code.value = meta.code.value;
    }
    if (meta.code.paramnames) {
      this.meta.code.paramnames = meta.code.paramnames.slice(0);
    }
  }
};
