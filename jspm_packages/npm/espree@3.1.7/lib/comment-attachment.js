/* */ 
(function(process) {
  "use strict";
  var astNodeTypes = require('./ast-node-types');
  var extra = {
    trailingComments: [],
    leadingComments: [],
    bottomRightStack: [],
    previousNode: null
  };
  module.exports = {
    reset: function() {
      extra.trailingComments = [];
      extra.leadingComments = [];
      extra.bottomRightStack = [];
      extra.previousNode = null;
    },
    addComment: function(comment) {
      extra.trailingComments.push(comment);
      extra.leadingComments.push(comment);
    },
    processComment: function(node) {
      var lastChild,
          trailingComments,
          i,
          j;
      if (node.type === astNodeTypes.Program) {
        if (node.body.length > 0) {
          return;
        }
      }
      if (extra.trailingComments.length > 0) {
        if (extra.trailingComments[0].range[0] >= node.range[1]) {
          trailingComments = extra.trailingComments;
          extra.trailingComments = [];
        } else {
          extra.trailingComments.length = 0;
        }
      } else {
        if (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
          trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
          delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
        }
      }
      while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
        lastChild = extra.bottomRightStack.pop();
      }
      if (lastChild) {
        if (lastChild.leadingComments) {
          if (lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
            node.leadingComments = lastChild.leadingComments;
            delete lastChild.leadingComments;
          } else {
            for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
              if (lastChild.leadingComments[i].range[1] <= node.range[0]) {
                node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
                break;
              }
            }
          }
        }
      } else if (extra.leadingComments.length > 0) {
        if (extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
          if (extra.previousNode) {
            for (j = 0; j < extra.leadingComments.length; j++) {
              if (extra.leadingComments[j].end < extra.previousNode.end) {
                extra.leadingComments.splice(j, 1);
                j--;
              }
            }
          }
          if (extra.leadingComments.length > 0) {
            node.leadingComments = extra.leadingComments;
            extra.leadingComments = [];
          }
        } else {
          for (i = 0; i < extra.leadingComments.length; i++) {
            if (extra.leadingComments[i].range[1] > node.range[0]) {
              break;
            }
          }
          node.leadingComments = extra.leadingComments.slice(0, i);
          if (node.leadingComments.length === 0) {
            delete node.leadingComments;
          }
          trailingComments = extra.leadingComments.slice(i);
          if (trailingComments.length === 0) {
            trailingComments = null;
          }
        }
      }
      extra.previousNode = node;
      if (trailingComments) {
        node.trailingComments = trailingComments;
      }
      extra.bottomRightStack.push(node);
    }
  };
})(require('process'));
