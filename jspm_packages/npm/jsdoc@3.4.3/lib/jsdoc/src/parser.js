/* */ 
(function(process) {
  'use strict';
  var events = require('events');
  var fs = require('../../../fs');
  var jsdoc = {
    doclet: require('../../../doclet'),
    env: require('../../../env'),
    name: require('../../../name'),
    src: {
      astnode: require('../../../src/astnode'),
      syntax: require('../../../src/syntax')
    },
    util: {doop: require('../../../util/doop')}
  };
  var logger = require('../../../util/logger');
  var path = require('../../../path');
  var util = require('util');
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var Syntax = jsdoc.src.syntax.Syntax;
  var PARSERS = exports.PARSERS = {js: 'jsdoc/src/parser'};
  var SCHEMA = 'javascript:';
  function DocletCache() {
    this._doclets = {};
  }
  DocletCache.prototype.get = function(name) {
    if (!hasOwnProp.call(this._doclets, name)) {
      return null;
    }
    return this._doclets[name][this._doclets[name].length - 1];
  };
  DocletCache.prototype.put = function(name, value) {
    if (!hasOwnProp.call(this._doclets, name)) {
      this._doclets[name] = [];
    }
    this._doclets[name].push(value);
  };
  exports.createParser = function(type) {
    var modulePath;
    if (!type) {
      type = 'js';
    }
    if (hasOwnProp.call(PARSERS, type)) {
      modulePath = PARSERS[type];
    } else {
      logger.fatal('The parser type "%s" is not recognized.', type);
      return null;
    }
    return new (require(modulePath)).Parser();
  };
  var Parser = exports.Parser = function(builderInstance, visitorInstance, walkerInstance) {
    this.clear();
    this._astBuilder = builderInstance || new (require('../../../src/astbuilder')).AstBuilder();
    this._visitor = visitorInstance || new (require('../../../src/visitor')).Visitor();
    this._walker = walkerInstance || new (require('../../../src/walker')).Walker();
    this._visitor.setParser(this);
    Object.defineProperties(this, {
      astBuilder: {get: function() {
          return this._astBuilder;
        }},
      visitor: {get: function() {
          return this._visitor;
        }},
      walker: {get: function() {
          return this._walker;
        }}
    });
  };
  util.inherits(Parser, events.EventEmitter);
  Parser.prototype.clear = function() {
    this._resultBuffer = [];
    this._byNodeId = new DocletCache();
    this._byLongname = new DocletCache();
    this._byLongname.put(jsdoc.name.LONGNAMES.GLOBAL, {meta: {}});
  };
  Parser.prototype.parse = function(sourceFiles, encoding) {
    encoding = encoding || jsdoc.env.conf.encoding || 'utf8';
    var filename = '';
    var sourceCode = '';
    var parsedFiles = [];
    var e = {};
    if (typeof sourceFiles === 'string') {
      sourceFiles = [sourceFiles];
    }
    e.sourcefiles = sourceFiles;
    logger.debug('Parsing source files: %j', sourceFiles);
    this.emit('parseBegin', e);
    for (var i = 0,
        l = sourceFiles.length; i < l; i++) {
      sourceCode = '';
      if (sourceFiles[i].indexOf(SCHEMA) === 0) {
        sourceCode = sourceFiles[i].substr(SCHEMA.length);
        filename = '[[string' + i + ']]';
      } else {
        filename = sourceFiles[i];
        try {
          sourceCode = fs.readFileSync(filename, encoding);
        } catch (err) {
          logger.error('Unable to read and parse the source file %s: %s', filename, err);
        }
      }
      if (sourceCode.length) {
        this._parseSourceCode(sourceCode, filename);
        parsedFiles.push(filename);
      }
    }
    this.emit('parseComplete', {
      sourcefiles: parsedFiles,
      doclets: this._resultBuffer
    });
    logger.debug('Finished parsing source files.');
    return this._resultBuffer;
  };
  Parser.prototype.fireProcessingComplete = function(doclets) {
    this.emit('processingComplete', {doclets: doclets});
  };
  Parser.prototype.results = function() {
    return this._resultBuffer;
  };
  Parser.prototype.addResult = function(o) {
    this._resultBuffer.push(o);
  };
  Parser.prototype.addAstNodeVisitor = function(visitor) {
    this._visitor.addAstNodeVisitor(visitor);
  };
  Parser.prototype.getAstNodeVisitors = function() {
    return this._visitor.getAstNodeVisitors();
  };
  function pretreat(code) {
    return code.replace(/^(\#\![\S \t]+\r?\n)/, '// $1').replace(/\/\*\!\*/g, '/**').replace(/\*\/\/\*\*+/g, '@also');
  }
  Parser.prototype._parseSourceCode = function(sourceCode, sourceName) {
    var ast;
    var globalScope;
    var e = {filename: sourceName};
    this.emit('fileBegin', e);
    logger.info('Parsing %s ...', sourceName);
    if (!e.defaultPrevented) {
      e = {
        filename: sourceName,
        source: sourceCode
      };
      this.emit('beforeParse', e);
      sourceCode = e.source;
      sourceName = e.filename;
      sourceCode = pretreat(e.source);
      ast = this._astBuilder.build(sourceCode, sourceName);
      if (ast) {
        this._walkAst(ast, this._visitor, sourceName);
      }
    }
    this.emit('fileComplete', e);
  };
  Parser.prototype._walkAst = function(ast, visitor, sourceName) {
    this._walker.recurse(ast, visitor, sourceName);
  };
  Parser.prototype.addDocletRef = function(e) {
    var fakeDoclet;
    var node;
    if (e && e.code && e.code.node) {
      node = e.code.node;
      if (e.doclet) {
        this._byNodeId.put(node.nodeId, e.doclet);
        this._byLongname.put(e.doclet.longname, e.doclet);
      } else if ((node.type === Syntax.FunctionDeclaration || node.type === Syntax.FunctionExpression || node.type === Syntax.ArrowFunctionExpression) && !this._getDocletById(node.nodeId)) {
        fakeDoclet = {
          longname: jsdoc.name.LONGNAMES.ANONYMOUS,
          meta: {code: e.code}
        };
        this._byNodeId.put(node.nodeId, fakeDoclet);
        this._byLongname.put(fakeDoclet.longname, fakeDoclet);
      }
    }
  };
  Parser.prototype._getDocletById = function(id) {
    return this._byNodeId.get(id);
  };
  Parser.prototype._getDocletByLongname = function(longname) {
    return this._byLongname.get(longname);
  };
  Parser.prototype.getBasename = function(name) {
    if (name !== undefined) {
      return name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
    }
    return undefined;
  };
  function definedInScope(doclet, basename) {
    return !!doclet && !!doclet.meta && !!doclet.meta.vars && !!basename && hasOwnProp.call(doclet.meta.vars, basename);
  }
  Parser.prototype.astnodeToMemberof = function(node) {
    var basename;
    var doclet;
    var scope;
    var result = {};
    var type = node.type;
    if ((type === Syntax.FunctionDeclaration || type === Syntax.FunctionExpression || type === Syntax.ArrowFunctionExpression || type === Syntax.VariableDeclarator) && node.enclosingScope) {
      doclet = this._getDocletById(node.enclosingScope.nodeId);
      if (!doclet) {
        result.memberof = jsdoc.name.LONGNAMES.ANONYMOUS + jsdoc.name.SCOPE.PUNC.INNER;
      } else {
        result.memberof = doclet.longname + jsdoc.name.SCOPE.PUNC.INNER;
      }
    } else {
      scope = node;
      basename = this.getBasename(jsdoc.src.astnode.nodeToValue(node));
      while (scope.enclosingScope) {
        doclet = this._getDocletById(scope.enclosingScope.nodeId);
        if (doclet && definedInScope(doclet, basename)) {
          result.memberof = doclet.meta.vars[basename];
          result.basename = basename;
          break;
        } else {
          scope = scope.enclosingScope;
        }
      }
      doclet = this._getDocletByLongname(jsdoc.name.LONGNAMES.GLOBAL);
      if (doclet && definedInScope(doclet, basename)) {
        result.memberof = doclet.meta.vars[basename];
        result.basename = basename;
      } else {
        doclet = this._getDocletById(node.parent.nodeId);
        if (doclet) {
          result.memberof = doclet.longname || doclet.name;
        }
      }
    }
    return result;
  };
  Parser.prototype._getParentClass = function(node) {
    var doclet;
    var nameAtoms;
    var scope = node.enclosingScope;
    function isClass(d) {
      return d && d.kind === 'class';
    }
    while (scope) {
      doclet = this._getDocletById(scope.nodeId);
      if (doclet) {
        if (isClass(doclet)) {
          break;
        }
        nameAtoms = jsdoc.name.shorten(doclet.longname);
        if (nameAtoms.scope === jsdoc.name.SCOPE.PUNC.INSTANCE) {
          doclet = this._getDocletByLongname(nameAtoms.memberof);
          if (isClass(doclet)) {
            break;
          }
        }
      }
      scope = scope.enclosingScope;
    }
    return (isClass(doclet) ? doclet : null);
  };
  Parser.prototype.resolveThis = function(node) {
    var doclet;
    var parentClass;
    var result;
    if (node.type !== Syntax.Property && node.enclosingScope) {
      doclet = this._getDocletById(node.enclosingScope.nodeId);
      if (!doclet) {
        result = jsdoc.name.LONGNAMES.ANONYMOUS;
      } else if (doclet.this) {
        result = doclet.this;
      } else if (doclet.kind === 'function' && doclet.memberof) {
        parentClass = this._getParentClass(node);
        if (parentClass || /\.constructor$/.test(doclet.longname)) {
          result = doclet.memberof;
        } else {
          result = doclet.longname;
        }
      } else if (doclet.kind === 'member' && jsdoc.src.astnode.isAssignment(node)) {
        result = doclet.longname;
      } else if (doclet.kind === 'class' || doclet.kind === 'module') {
        result = doclet.longname;
      } else if (node.enclosingScope) {
        result = this.resolveThis(node.enclosingScope);
      }
    } else {
      doclet = this._getDocletById(node.parent.nodeId);
      if (!doclet) {
        result = '';
      } else {
        result = doclet.longname;
      }
    }
    return result;
  };
  Parser.prototype.resolvePropertyParents = function(node) {
    var currentAncestor = node.parent;
    var nextAncestor = currentAncestor.parent;
    var doclet;
    var doclets = [];
    while (currentAncestor) {
      doclet = this._getDocletById(currentAncestor.nodeId);
      if (doclet) {
        doclets.push(doclet);
      }
      if (nextAncestor && nextAncestor.type === Syntax.AssignmentExpression) {
        nextAncestor = nextAncestor.parent;
        currentAncestor = currentAncestor.parent;
      } else {
        currentAncestor = null;
      }
    }
    return doclets;
  };
  Parser.prototype.resolveVar = function(node, basename) {
    var doclet;
    var result;
    var scope = node.enclosingScope;
    if (node.type === Syntax.FunctionDeclaration) {
      result = '';
    } else if (!scope) {
      result = '';
    } else {
      doclet = this._getDocletById(scope.nodeId);
      if (definedInScope(doclet, basename)) {
        result = doclet.longname;
      } else {
        result = this.resolveVar(scope, basename);
      }
    }
    return result;
  };
  Parser.prototype.resolveEnum = function(e) {
    var doclets = this.resolvePropertyParents(e.code.node.parent);
    doclets.forEach(function(doclet) {
      if (doclet && doclet.isEnum) {
        doclet.properties = doclet.properties || [];
        if (doclet.type && !e.doclet.type) {
          e.doclet.type = jsdoc.util.doop(doclet.type);
        }
        delete e.doclet.undocumented;
        e.doclet.defaultvalue = e.doclet.meta.code.value;
        doclet.properties.push(e.doclet);
      }
    });
  };
})(require('process'));
