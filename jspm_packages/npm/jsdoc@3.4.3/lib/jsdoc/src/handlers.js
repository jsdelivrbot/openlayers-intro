/* */ 
(function(process) {
  'use strict';
  var escape = require('escape-string-regexp');
  var jsdoc = {
    doclet: require('../../../doclet'),
    name: require('../../../name'),
    src: {syntax: require('../../../src/syntax')},
    util: {logger: require('../../../util/logger')}
  };
  var util = require('util');
  var currentModule = null;
  var SCOPE_NAMES = jsdoc.name.SCOPE.NAMES;
  var SCOPE_PUNC = jsdoc.name.SCOPE.PUNC;
  var Syntax = jsdoc.src.syntax.Syntax;
  function CurrentModule(doclet) {
    this.doclet = doclet;
    this.longname = doclet.longname;
    this.originalName = doclet.meta.code.name || '';
  }
  function filterByLongname(doclet) {
    if (/#$/.test(doclet.longname)) {
      return true;
    }
    return false;
  }
  function createDoclet(comment, e) {
    var doclet;
    var err;
    try {
      doclet = new jsdoc.doclet.Doclet(comment, e);
    } catch (error) {
      err = new Error(util.format('cannot create a doclet for the comment "%s": %s', comment.replace(/[\r\n]/g, ''), error.message));
      jsdoc.util.logger.error(err);
      doclet = new jsdoc.doclet.Doclet('', e);
    }
    return doclet;
  }
  function createSymbolDoclet(comment, e) {
    var doclet = createDoclet(comment, e);
    if (doclet.name) {
      e.comment = '@undocumented';
      doclet = createDoclet(e.comment, e);
    }
    return doclet;
  }
  function setCurrentModule(doclet) {
    if (doclet.kind === 'module') {
      currentModule = new CurrentModule(doclet);
    }
  }
  function setModuleScopeMemberOf(doclet) {
    if (currentModule && currentModule.longname !== doclet.name) {
      if (!doclet.scope) {
        if (doclet.meta && doclet.meta.code && doclet.meta.code.node && doclet.meta.code.node.type === Syntax.MethodDefinition) {
          if (doclet.meta.code.node.static) {
            doclet.addTag('static');
          } else {
            doclet.addTag('instance');
          }
        } else {
          doclet.addTag('inner');
        }
      }
      if (!doclet.memberof && doclet.scope !== SCOPE_NAMES.GLOBAL) {
        doclet.addTag('memberof', currentModule.longname);
      }
    }
  }
  function setDefaultScope(doclet) {
    if (!doclet.scope && doclet.kind !== 'module') {
      doclet.setScope(SCOPE_NAMES.GLOBAL);
    }
  }
  function addDoclet(parser, newDoclet) {
    var e;
    if (newDoclet) {
      setCurrentModule(newDoclet);
      e = {doclet: newDoclet};
      parser.emit('newDoclet', e);
      if (!e.defaultPrevented && !filterByLongname(e.doclet)) {
        parser.addResult(e.doclet);
      }
    }
  }
  function processAlias(parser, doclet, astNode) {
    var memberofName;
    if (doclet.alias === '{@thisClass}') {
      memberofName = parser.resolveThis(astNode);
      if (/^(.+?)(\.prototype|#)$/.test(memberofName)) {
        memberofName = RegExp.$1;
      }
      doclet.alias = memberofName;
    }
    doclet.addTag('name', doclet.alias);
    doclet.postProcess();
  }
  function findSymbolMemberof(parser, doclet, astNode, nameStartsWith, trailingPunc) {
    var memberof = '';
    var nameAndPunc;
    var scopePunc = '';
    if (trailingPunc === '[') {
      trailingPunc = null;
    }
    nameAndPunc = nameStartsWith + (trailingPunc || '');
    if (doclet.name !== 'module.exports') {
      doclet.name = doclet.name.replace(nameAndPunc, '');
    }
    if (nameStartsWith !== 'this' && currentModule && doclet.name !== 'module.exports') {
      memberof = currentModule.longname;
      scopePunc = SCOPE_PUNC.STATIC;
    } else if (doclet.name === 'module.exports' && currentModule) {
      doclet.addTag('name', currentModule.longname);
      doclet.postProcess();
    } else {
      memberof = parser.resolveThis(astNode);
      if (nameStartsWith === 'this' && currentModule && !memberof) {
        memberof = currentModule.longname;
        scopePunc = SCOPE_PUNC.STATIC;
      } else {
        scopePunc = SCOPE_PUNC.INSTANCE;
      }
    }
    return {
      memberof: memberof,
      scopePunc: scopePunc
    };
  }
  function addSymbolMemberof(parser, doclet, astNode) {
    var basename;
    var memberof;
    var memberofInfo;
    var moduleOriginalName = '';
    var resolveTargetRegExp;
    var scopePunc;
    var unresolved;
    if (!astNode) {
      return;
    }
    if (currentModule) {
      moduleOriginalName = '|' + currentModule.originalName;
    }
    resolveTargetRegExp = new RegExp('^((?:module.)?exports|this' + moduleOriginalName + ')(\\.|\\[|$)');
    unresolved = resolveTargetRegExp.exec(doclet.name);
    if (unresolved) {
      memberofInfo = findSymbolMemberof(parser, doclet, astNode, unresolved[1], unresolved[2]);
      memberof = memberofInfo.memberof;
      scopePunc = memberofInfo.scopePunc;
      if (memberof) {
        doclet.name = doclet.name ? memberof + scopePunc + doclet.name : memberof;
      }
    } else {
      memberofInfo = parser.astnodeToMemberof(astNode);
      basename = memberofInfo.basename;
      memberof = memberofInfo.memberof;
    }
    if (memberof) {
      doclet.addTag('memberof', memberof);
      if (basename) {
        doclet.name = (doclet.name || '').replace(new RegExp('^' + escape(basename) + '.'), '');
      }
    } else {
      setModuleScopeMemberOf(doclet);
    }
  }
  function newSymbolDoclet(parser, docletSrc, e) {
    var memberofName = null;
    var newDoclet = createSymbolDoclet(docletSrc, e);
    if (newDoclet.alias) {
      processAlias(parser, newDoclet, e.astnode);
    } else if (e.code && typeof e.code.name !== 'undefined' && e.code.name !== '') {
      newDoclet.addTag('name', e.code.name);
      if (!newDoclet.memberof) {
        addSymbolMemberof(parser, newDoclet, e.astnode);
      }
      newDoclet.postProcess();
    } else {
      return false;
    }
    if (!newDoclet.memberof && newDoclet.kind !== 'module' && (!currentModule || currentModule.longname !== newDoclet.name)) {
      newDoclet.scope = SCOPE_NAMES.GLOBAL;
    }
    if (e.code.kind && newDoclet.kind === 'member') {
      newDoclet.kind = e.code.kind;
    }
    addDoclet(parser, newDoclet);
    e.doclet = newDoclet;
    return true;
  }
  exports.attachTo = function(parser) {
    parser.on('jsdocCommentFound', function(e) {
      var comments = e.comment.split(/@also\b/g);
      var newDoclet;
      for (var i = 0,
          l = comments.length; i < l; i++) {
        newDoclet = createDoclet(comments[i], e);
        if (!newDoclet.name) {
          continue;
        }
        setModuleScopeMemberOf(newDoclet);
        newDoclet.postProcess();
        setDefaultScope(newDoclet);
        addDoclet(parser, newDoclet);
        e.doclet = newDoclet;
      }
    });
    parser.on('symbolFound', function(e) {
      var comments = e.comment.split(/@also\b/g);
      for (var i = 0,
          l = comments.length; i < l; i++) {
        newSymbolDoclet(parser, comments[i], e);
      }
    });
    parser.on('fileComplete', function(e) {
      currentModule = null;
    });
  };
})(require('process'));
