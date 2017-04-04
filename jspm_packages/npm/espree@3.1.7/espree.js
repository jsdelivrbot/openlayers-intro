/* */ 
(function(process) {
  "use strict";
  var astNodeTypes = require('./lib/ast-node-types'),
      commentAttachment = require('./lib/comment-attachment'),
      TokenTranslator = require('./lib/token-translator'),
      acornJSX = require('acorn-jsx/inject'),
      rawAcorn = require('acorn');
  var acorn = acornJSX(rawAcorn);
  var lookahead,
      extra,
      lastToken;
  function resetExtra() {
    extra = {
      tokens: null,
      range: false,
      loc: false,
      comment: false,
      comments: [],
      tolerant: false,
      errors: [],
      strict: false,
      ecmaFeatures: {},
      ecmaVersion: 5,
      isModule: false
    };
  }
  var tt = acorn.tokTypes,
      getLineInfo = acorn.getLineInfo;
  tt.jsxAttrValueToken = {};
  function isValidNode(node) {
    var ecma = extra.ecmaFeatures;
    switch (node.type) {
      case "ExperimentalSpreadProperty":
      case "ExperimentalRestProperty":
        return ecma.experimentalObjectRestSpread;
      case "ImportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportDefaultDeclaration":
      case "ExportAllDeclaration":
        return extra.isModule;
      default:
        return true;
    }
  }
  function esprimaFinishNode(result) {
    if (!isValidNode(result)) {
      this.unexpected(result.start);
    }
    if (result.type === "TryStatement") {
      delete result.guardedHandlers;
    } else if (result.type === "CatchClause") {
      delete result.guard;
    }
    if (result.type === "TemplateElement") {
      var terminalDollarBraceL = this.input.slice(result.end, result.end + 2) === "${";
      if (result.range) {
        result.range[0]--;
        result.range[1] += (terminalDollarBraceL ? 2 : 1);
      }
      if (result.loc) {
        result.loc.start.column--;
        result.loc.end.column += (terminalDollarBraceL ? 2 : 1);
      }
    }
    if (result.type === "ExportDefaultDeclaration") {
      if (/^(Class|Function)Expression$/.test(result.declaration.type)) {
        result.declaration.type = result.declaration.type.replace("Expression", "Declaration");
      }
    }
    if (result.type === "Literal" && result.value === undefined) {
      result.value = null;
    }
    if (extra.attachComment) {
      commentAttachment.processComment(result);
    }
    if (result.type.indexOf("Function") > -1 && !result.generator) {
      result.generator = false;
    }
    return result;
  }
  function isValidToken(parser) {
    var ecma = extra.ecmaFeatures;
    var type = parser.type;
    switch (type) {
      case tt.jsxName:
      case tt.jsxText:
      case tt.jsxTagStart:
      case tt.jsxTagEnd:
        return ecma.jsx;
      case tt.regexp:
        if (extra.ecmaVersion < 6 && parser.value.flags && parser.value.flags.indexOf("y") > -1) {
          return false;
        }
        return true;
      default:
        return true;
    }
  }
  function wrapFinishNode(finishNode) {
    return function(node, type, pos, loc) {
      var result = finishNode.call(this, node, type, pos, loc);
      return esprimaFinishNode.call(this, result);
    };
  }
  acorn.plugins.espree = function(instance) {
    instance.extend("finishNode", wrapFinishNode);
    instance.extend("finishNodeAt", wrapFinishNode);
    instance.extend("next", function(next) {
      return function() {
        if (!isValidToken(this)) {
          this.unexpected();
        }
        return next.call(this);
      };
    });
    instance.extend("checkLVal", function(checkLVal) {
      return function(expr, isBinding, checkClashes) {
        if (extra.ecmaFeatures.experimentalObjectRestSpread && expr.type === "ObjectPattern") {
          for (var i = 0; i < expr.properties.length; i++) {
            if (expr.properties[i].type.indexOf("Experimental") === -1) {
              this.checkLVal(expr.properties[i].value, isBinding, checkClashes);
            }
          }
          return undefined;
        }
        return checkLVal.call(this, expr, isBinding, checkClashes);
      };
    });
    instance.extend("parseTopLevel", function(parseTopLevel) {
      return function(node) {
        if (extra.ecmaFeatures.impliedStrict && this.options.ecmaVersion >= 5) {
          this.strict = true;
        }
        return parseTopLevel.call(this, node);
      };
    });
    instance.extend("toAssignable", function(toAssignable) {
      return function(node, isBinding) {
        if (extra.ecmaFeatures.experimentalObjectRestSpread && node.type === "ObjectExpression") {
          node.type = "ObjectPattern";
          for (var i = 0; i < node.properties.length; i++) {
            var prop = node.properties[i];
            if (prop.type === "ExperimentalSpreadProperty") {
              prop.type = "ExperimentalRestProperty";
            } else if (prop.kind !== "init") {
              this.raise(prop.key.start, "Object pattern can't contain getter or setter");
            } else {
              this.toAssignable(prop.value, isBinding);
            }
          }
          return node;
        } else {
          return toAssignable.call(this, node, isBinding);
        }
      };
    });
    instance.parseObjectRest = function() {
      var node = this.startNode();
      this.next();
      node.argument = this.parseIdent();
      return this.finishNode(node, "ExperimentalRestProperty");
    };
    instance.parseObj = function(isPattern, refShorthandDefaultPos) {
      var node = this.startNode(),
          first = true,
          propHash = {};
      node.properties = [];
      this.next();
      while (!this.eat(tt.braceR)) {
        if (!first) {
          this.expect(tt.comma);
          if (this.afterTrailingComma(tt.braceR)) {
            break;
          }
        } else {
          first = false;
        }
        var prop = this.startNode(),
            isGenerator,
            startPos,
            startLoc;
        if (extra.ecmaFeatures.experimentalObjectRestSpread && this.type === tt.ellipsis) {
          if (isPattern) {
            prop = this.parseObjectRest();
          } else {
            prop = this.parseSpread();
            prop.type = "ExperimentalSpreadProperty";
          }
          node.properties.push(prop);
          continue;
        }
        if (this.options.ecmaVersion >= 6) {
          prop.method = false;
          prop.shorthand = false;
          if (isPattern || refShorthandDefaultPos) {
            startPos = this.start;
            startLoc = this.startLoc;
          }
          if (!isPattern) {
            isGenerator = this.eat(tt.star);
          }
        }
        this.parsePropertyName(prop);
        this.parsePropertyValue(prop, isPattern, isGenerator, startPos, startLoc, refShorthandDefaultPos);
        this.checkPropClash(prop, propHash);
        node.properties.push(this.finishNode(prop, "Property"));
      }
      return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
    };
    instance.raise = instance.raiseRecoverable = function(pos, message) {
      var loc = getLineInfo(this.input, pos);
      var err = new SyntaxError(message);
      err.index = pos;
      err.lineNumber = loc.line;
      err.column = loc.column + 1;
      throw err;
    };
    instance.unexpected = function(pos) {
      var message = "Unexpected token";
      if (pos !== null && pos !== undefined) {
        this.pos = pos;
        if (this.options.locations) {
          while (this.pos < this.lineStart) {
            this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
            --this.curLine;
          }
        }
        this.nextToken();
      }
      if (this.end > this.start) {
        message += " " + this.input.slice(this.start, this.end);
      }
      this.raise(this.start, message);
    };
    instance.extend("jsx_readString", function(jsxReadString) {
      return function(quote) {
        var result = jsxReadString.call(this, quote);
        if (this.type === tt.string) {
          extra.jsxAttrValueToken = true;
        }
        return result;
      };
    });
  };
  function tokenize(code, options) {
    var toString,
        tokens,
        impliedStrict,
        translator = new TokenTranslator(tt, code);
    toString = String;
    if (typeof code !== "string" && !(code instanceof String)) {
      code = toString(code);
    }
    lookahead = null;
    options = options || {};
    var acornOptions = {
      ecmaVersion: 5,
      plugins: {espree: true}
    };
    resetExtra();
    options.tokens = true;
    extra.tokens = [];
    extra.range = (typeof options.range === "boolean") && options.range;
    acornOptions.ranges = extra.range;
    extra.loc = (typeof options.loc === "boolean") && options.loc;
    acornOptions.locations = extra.loc;
    extra.comment = typeof options.comment === "boolean" && options.comment;
    if (extra.comment) {
      acornOptions.onComment = function() {
        var comment = convertAcornCommentToEsprimaComment.apply(this, arguments);
        extra.comments.push(comment);
      };
    }
    extra.tolerant = typeof options.tolerant === "boolean" && options.tolerant;
    if (typeof options.ecmaVersion === "number") {
      switch (options.ecmaVersion) {
        case 3:
        case 5:
        case 6:
        case 7:
          acornOptions.ecmaVersion = options.ecmaVersion;
          extra.ecmaVersion = options.ecmaVersion;
          break;
        default:
          throw new Error("ecmaVersion must be 3, 5, 6, or 7.");
      }
    }
    if (options.ecmaFeatures && typeof options.ecmaFeatures === "object") {
      extra.ecmaFeatures = options.ecmaFeatures;
      impliedStrict = extra.ecmaFeatures.impliedStrict;
      extra.ecmaFeatures.impliedStrict = typeof impliedStrict === "boolean" && impliedStrict;
    }
    try {
      var tokenizer = acorn.tokenizer(code, acornOptions);
      while ((lookahead = tokenizer.getToken()).type !== tt.eof) {
        translator.onToken(lookahead, extra);
      }
      tokens = extra.tokens;
      if (extra.comment) {
        tokens.comments = extra.comments;
      }
      if (extra.tolerant) {
        tokens.errors = extra.errors;
      }
    } catch (e) {
      throw e;
    }
    return tokens;
  }
  function convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text
    };
    if (typeof start === "number") {
      comment.start = start;
      comment.end = end;
      comment.range = [start, end];
    }
    if (typeof startLoc === "object") {
      comment.loc = {
        start: startLoc,
        end: endLoc
      };
    }
    return comment;
  }
  function parse(code, options) {
    var program,
        toString = String,
        translator,
        impliedStrict,
        acornOptions = {
          ecmaVersion: 5,
          plugins: {espree: true}
        };
    lastToken = null;
    if (typeof code !== "string" && !(code instanceof String)) {
      code = toString(code);
    }
    resetExtra();
    commentAttachment.reset();
    if (typeof options !== "undefined") {
      extra.range = (typeof options.range === "boolean") && options.range;
      extra.loc = (typeof options.loc === "boolean") && options.loc;
      extra.attachComment = (typeof options.attachComment === "boolean") && options.attachComment;
      if (extra.loc && options.source !== null && options.source !== undefined) {
        extra.source = toString(options.source);
      }
      if (typeof options.tokens === "boolean" && options.tokens) {
        extra.tokens = [];
        translator = new TokenTranslator(tt, code);
      }
      if (typeof options.comment === "boolean" && options.comment) {
        extra.comment = true;
        extra.comments = [];
      }
      if (typeof options.tolerant === "boolean" && options.tolerant) {
        extra.errors = [];
      }
      if (extra.attachComment) {
        extra.range = true;
        extra.comments = [];
        commentAttachment.reset();
      }
      if (typeof options.ecmaVersion === "number") {
        switch (options.ecmaVersion) {
          case 3:
          case 5:
          case 6:
          case 7:
            acornOptions.ecmaVersion = options.ecmaVersion;
            extra.ecmaVersion = options.ecmaVersion;
            break;
          default:
            throw new Error("ecmaVersion must be 3, 5, 6, or 7.");
        }
      }
      if (options.sourceType === "module") {
        extra.isModule = true;
        if (acornOptions.ecmaVersion < 6) {
          acornOptions.ecmaVersion = 6;
          extra.ecmaVersion = 6;
        }
        acornOptions.sourceType = "module";
      }
      if (options.ecmaFeatures && typeof options.ecmaFeatures === "object") {
        extra.ecmaFeatures = options.ecmaFeatures;
        impliedStrict = extra.ecmaFeatures.impliedStrict;
        extra.ecmaFeatures.impliedStrict = typeof impliedStrict === "boolean" && impliedStrict;
        if (options.ecmaFeatures.globalReturn) {
          acornOptions.allowReturnOutsideFunction = true;
        }
      }
      acornOptions.onToken = function(token) {
        if (extra.tokens) {
          translator.onToken(token, extra);
        }
        if (token.type !== tt.eof) {
          lastToken = token;
        }
      };
      if (extra.attachComment || extra.comment) {
        acornOptions.onComment = function() {
          var comment = convertAcornCommentToEsprimaComment.apply(this, arguments);
          extra.comments.push(comment);
          if (extra.attachComment) {
            commentAttachment.addComment(comment);
          }
        };
      }
      if (extra.range) {
        acornOptions.ranges = true;
      }
      if (extra.loc) {
        acornOptions.locations = true;
      }
      if (extra.ecmaFeatures.jsx) {
        acornOptions.plugins = {
          jsx: true,
          espree: true
        };
      }
    }
    program = acorn.parse(code, acornOptions);
    program.sourceType = extra.isModule ? "module" : "script";
    if (extra.comment || extra.attachComment) {
      program.comments = extra.comments;
    }
    if (extra.tokens) {
      program.tokens = extra.tokens;
    }
    if (program.range) {
      program.range[0] = program.body.length ? program.body[0].range[0] : program.range[0];
      program.range[1] = lastToken ? lastToken.range[1] : program.range[1];
    }
    if (program.loc) {
      program.loc.start = program.body.length ? program.body[0].loc.start : program.loc.start;
      program.loc.end = lastToken ? lastToken.loc.end : program.loc.end;
    }
    return program;
  }
  exports.version = require('./package.json!systemjs-json').version;
  exports.tokenize = tokenize;
  exports.parse = parse;
  exports.Syntax = (function() {
    var name,
        types = {};
    if (typeof Object.create === "function") {
      types = Object.create(null);
    }
    for (name in astNodeTypes) {
      if (astNodeTypes.hasOwnProperty(name)) {
        types[name] = astNodeTypes[name];
      }
    }
    if (typeof Object.freeze === "function") {
      Object.freeze(types);
    }
    return types;
  }());
  exports.VisitorKeys = (function() {
    var visitorKeys = require('./lib/visitor-keys');
    var name,
        keys = {};
    if (typeof Object.create === "function") {
      keys = Object.create(null);
    }
    for (name in visitorKeys) {
      if (visitorKeys.hasOwnProperty(name)) {
        keys[name] = visitorKeys[name];
      }
    }
    if (typeof Object.freeze === "function") {
      Object.freeze(keys);
    }
    return keys;
  }());
})(require('process'));
