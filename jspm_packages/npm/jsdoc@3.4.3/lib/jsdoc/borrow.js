/* */ 
(function(process) {
  'use strict';
  var doop = require('../../util/doop');
  var logger = require('../../util/logger');
  var SCOPE = require('../../name').SCOPE;
  var hasOwnProp = Object.prototype.hasOwnProperty;
  exports.indexAll = function(doclets) {
    var borrowed = [];
    var doclet;
    var documented = {};
    var longname = {};
    for (var i = 0,
        l = doclets.length; i < l; i++) {
      doclet = doclets[i];
      if (!hasOwnProp.call(longname, doclet.longname)) {
        longname[doclet.longname] = [];
      }
      longname[doclet.longname].push(doclet);
      if (!doclet.undocumented) {
        if (!hasOwnProp.call(documented, doclet.longname)) {
          documented[doclet.longname] = [];
        }
        documented[doclet.longname].push(doclet);
      }
      if (hasOwnProp.call(doclet, 'borrowed')) {
        borrowed.push(doclet);
      }
    }
    doclets.index = {
      borrowed: borrowed,
      documented: documented,
      longname: longname
    };
  };
  function cloneBorrowedDoclets(doclet, doclets) {
    doclet.borrowed.forEach(function(borrowed) {
      var borrowedDoclets = doclets.index.longname[borrowed.from];
      var borrowedAs = borrowed.as || borrowed.from;
      var clonedDoclets;
      var parts;
      var scopePunc;
      if (borrowedDoclets) {
        borrowedAs = borrowedAs.replace(/^prototype\./, SCOPE.PUNC.INSTANCE);
        clonedDoclets = doop(borrowedDoclets).forEach(function(clone) {
          parts = borrowedAs.split(SCOPE.PUNC.INSTANCE);
          if (parts.length === 2) {
            clone.scope = SCOPE.NAMES.INSTANCE;
            scopePunc = SCOPE.PUNC.INSTANCE;
          } else {
            clone.scope = SCOPE.NAMES.STATIC;
            scopePunc = SCOPE.PUNC.STATIC;
          }
          clone.name = parts.pop();
          clone.memberof = doclet.longname;
          clone.longname = clone.memberof + scopePunc + clone.name;
          doclets.push(clone);
        });
      }
    });
  }
  exports.resolveBorrows = function(doclets) {
    var doclet;
    if (!doclets.index) {
      logger.error('Unable to resolve borrowed symbols, because the docs have not been indexed.');
      return;
    }
    for (var i = 0,
        l = doclets.index.borrowed.length; i < l; i++) {
      doclet = doclets.index.borrowed[i];
      cloneBorrowedDoclets(doclet, doclets);
      delete doclet.borrowed;
    }
    doclets.index.borrowed = [];
  };
})(require('process'));
