/* */ 
(function() {
  var BOM,
      BOOL,
      CALLABLE,
      CODE,
      COFFEE_ALIASES,
      COFFEE_ALIAS_MAP,
      COFFEE_KEYWORDS,
      COMMENT,
      COMPARE,
      COMPOUND_ASSIGN,
      HERECOMMENT_ILLEGAL,
      HEREDOC_DOUBLE,
      HEREDOC_INDENT,
      HEREDOC_SINGLE,
      HEREGEX,
      HEREGEX_OMIT,
      HERE_JSTOKEN,
      IDENTIFIER,
      INDENTABLE_CLOSERS,
      INDEXABLE,
      INVALID_ESCAPE,
      INVERSES,
      JSTOKEN,
      JS_KEYWORDS,
      LEADING_BLANK_LINE,
      LINE_BREAK,
      LINE_CONTINUER,
      Lexer,
      MATH,
      MULTI_DENT,
      NOT_REGEX,
      NUMBER,
      OPERATOR,
      POSSIBLY_DIVISION,
      REGEX,
      REGEX_FLAGS,
      REGEX_ILLEGAL,
      RELATION,
      RESERVED,
      Rewriter,
      SHIFT,
      SIMPLE_STRING_OMIT,
      STRICT_PROSCRIBED,
      STRING_DOUBLE,
      STRING_OMIT,
      STRING_SINGLE,
      STRING_START,
      TRAILING_BLANK_LINE,
      TRAILING_SPACES,
      UNARY,
      UNARY_MATH,
      VALID_FLAGS,
      WHITESPACE,
      compact,
      count,
      invertLiterate,
      isForFrom,
      isUnassignable,
      key,
      locationDataToString,
      ref,
      ref1,
      repeat,
      starts,
      throwSyntaxError,
      indexOf = [].indexOf || function(item) {
        for (var i = 0,
            l = this.length; i < l; i++) {
          if (i in this && this[i] === item)
            return i;
        }
        return -1;
      },
      slice = [].slice;
  ref = require('./rewriter'), Rewriter = ref.Rewriter, INVERSES = ref.INVERSES;
  ref1 = require('./helpers'), count = ref1.count, starts = ref1.starts, compact = ref1.compact, repeat = ref1.repeat, invertLiterate = ref1.invertLiterate, locationDataToString = ref1.locationDataToString, throwSyntaxError = ref1.throwSyntaxError;
  exports.Lexer = Lexer = (function() {
    function Lexer() {}
    Lexer.prototype.tokenize = function(code, opts) {
      var consumed,
          end,
          i,
          ref2;
      if (opts == null) {
        opts = {};
      }
      this.literate = opts.literate;
      this.indent = 0;
      this.baseIndent = 0;
      this.indebt = 0;
      this.outdebt = 0;
      this.indents = [];
      this.ends = [];
      this.tokens = [];
      this.seenFor = false;
      this.seenImport = false;
      this.seenExport = false;
      this.exportSpecifierList = false;
      this.chunkLine = opts.line || 0;
      this.chunkColumn = opts.column || 0;
      code = this.clean(code);
      i = 0;
      while (this.chunk = code.slice(i)) {
        consumed = this.identifierToken() || this.commentToken() || this.whitespaceToken() || this.lineToken() || this.stringToken() || this.numberToken() || this.regexToken() || this.jsToken() || this.literalToken();
        ref2 = this.getLineAndColumnFromChunk(consumed), this.chunkLine = ref2[0], this.chunkColumn = ref2[1];
        i += consumed;
        if (opts.untilBalanced && this.ends.length === 0) {
          return {
            tokens: this.tokens,
            index: i
          };
        }
      }
      this.closeIndentation();
      if (end = this.ends.pop()) {
        this.error("missing " + end.tag, end.origin[2]);
      }
      if (opts.rewrite === false) {
        return this.tokens;
      }
      return (new Rewriter).rewrite(this.tokens);
    };
    Lexer.prototype.clean = function(code) {
      if (code.charCodeAt(0) === BOM) {
        code = code.slice(1);
      }
      code = code.replace(/\r/g, '').replace(TRAILING_SPACES, '');
      if (WHITESPACE.test(code)) {
        code = "\n" + code;
        this.chunkLine--;
      }
      if (this.literate) {
        code = invertLiterate(code);
      }
      return code;
    };
    Lexer.prototype.identifierToken = function() {
      var alias,
          colon,
          colonOffset,
          id,
          idLength,
          input,
          match,
          poppedToken,
          prev,
          ref2,
          ref3,
          ref4,
          ref5,
          ref6,
          ref7,
          tag,
          tagToken;
      if (!(match = IDENTIFIER.exec(this.chunk))) {
        return 0;
      }
      input = match[0], id = match[1], colon = match[2];
      idLength = id.length;
      poppedToken = void 0;
      if (id === 'own' && this.tag() === 'FOR') {
        this.token('OWN', id);
        return id.length;
      }
      if (id === 'from' && this.tag() === 'YIELD') {
        this.token('FROM', id);
        return id.length;
      }
      if (id === 'as' && this.seenImport) {
        if (this.value() === '*') {
          this.tokens[this.tokens.length - 1][0] = 'IMPORT_ALL';
        } else if (ref2 = this.value(), indexOf.call(COFFEE_KEYWORDS, ref2) >= 0) {
          this.tokens[this.tokens.length - 1][0] = 'IDENTIFIER';
        }
        if ((ref3 = this.tag()) === 'DEFAULT' || ref3 === 'IMPORT_ALL' || ref3 === 'IDENTIFIER') {
          this.token('AS', id);
          return id.length;
        }
      }
      if (id === 'as' && this.seenExport && this.tag() === 'IDENTIFIER') {
        this.token('AS', id);
        return id.length;
      }
      if (id === 'default' && this.seenExport) {
        this.token('DEFAULT', id);
        return id.length;
      }
      ref4 = this.tokens, prev = ref4[ref4.length - 1];
      tag = colon || (prev != null) && (((ref5 = prev[0]) === '.' || ref5 === '?.' || ref5 === '::' || ref5 === '?::') || !prev.spaced && prev[0] === '@') ? 'PROPERTY' : 'IDENTIFIER';
      if (tag === 'IDENTIFIER' && (indexOf.call(JS_KEYWORDS, id) >= 0 || indexOf.call(COFFEE_KEYWORDS, id) >= 0) && !(this.exportSpecifierList && indexOf.call(COFFEE_KEYWORDS, id) >= 0)) {
        tag = id.toUpperCase();
        if (tag === 'WHEN' && (ref6 = this.tag(), indexOf.call(LINE_BREAK, ref6) >= 0)) {
          tag = 'LEADING_WHEN';
        } else if (tag === 'FOR') {
          this.seenFor = true;
        } else if (tag === 'UNLESS') {
          tag = 'IF';
        } else if (tag === 'IMPORT') {
          this.seenImport = true;
        } else if (tag === 'EXPORT') {
          this.seenExport = true;
        } else if (indexOf.call(UNARY, tag) >= 0) {
          tag = 'UNARY';
        } else if (indexOf.call(RELATION, tag) >= 0) {
          if (tag !== 'INSTANCEOF' && this.seenFor) {
            tag = 'FOR' + tag;
            this.seenFor = false;
          } else {
            tag = 'RELATION';
            if (this.value() === '!') {
              poppedToken = this.tokens.pop();
              id = '!' + id;
            }
          }
        }
      } else if (tag === 'IDENTIFIER' && this.seenFor && id === 'from' && isForFrom(prev)) {
        tag = 'FORFROM';
        this.seenFor = false;
      }
      if (tag === 'IDENTIFIER' && indexOf.call(RESERVED, id) >= 0) {
        this.error("reserved word '" + id + "'", {length: id.length});
      }
      if (tag !== 'PROPERTY') {
        if (indexOf.call(COFFEE_ALIASES, id) >= 0) {
          alias = id;
          id = COFFEE_ALIAS_MAP[id];
        }
        tag = (function() {
          switch (id) {
            case '!':
              return 'UNARY';
            case '==':
            case '!=':
              return 'COMPARE';
            case 'true':
            case 'false':
              return 'BOOL';
            case 'break':
            case 'continue':
            case 'debugger':
              return 'STATEMENT';
            case '&&':
            case '||':
              return id;
            default:
              return tag;
          }
        })();
      }
      tagToken = this.token(tag, id, 0, idLength);
      if (alias) {
        tagToken.origin = [tag, alias, tagToken[2]];
      }
      if (poppedToken) {
        ref7 = [poppedToken[2].first_line, poppedToken[2].first_column], tagToken[2].first_line = ref7[0], tagToken[2].first_column = ref7[1];
      }
      if (colon) {
        colonOffset = input.lastIndexOf(':');
        this.token(':', ':', colonOffset, colon.length);
      }
      return input.length;
    };
    Lexer.prototype.numberToken = function() {
      var base,
          lexedLength,
          match,
          number,
          numberValue,
          ref2,
          tag;
      if (!(match = NUMBER.exec(this.chunk))) {
        return 0;
      }
      number = match[0];
      lexedLength = number.length;
      switch (false) {
        case !/^0[BOX]/.test(number):
          this.error("radix prefix in '" + number + "' must be lowercase", {offset: 1});
          break;
        case !/^(?!0x).*E/.test(number):
          this.error("exponential notation in '" + number + "' must be indicated with a lowercase 'e'", {offset: number.indexOf('E')});
          break;
        case !/^0\d*[89]/.test(number):
          this.error("decimal literal '" + number + "' must not be prefixed with '0'", {length: lexedLength});
          break;
        case !/^0\d+/.test(number):
          this.error("octal literal '" + number + "' must be prefixed with '0o'", {length: lexedLength});
      }
      base = (function() {
        switch (number.charAt(1)) {
          case 'b':
            return 2;
          case 'o':
            return 8;
          case 'x':
            return 16;
          default:
            return null;
        }
      })();
      numberValue = base != null ? parseInt(number.slice(2), base) : parseFloat(number);
      if ((ref2 = number.charAt(1)) === 'b' || ref2 === 'o') {
        number = "0x" + (numberValue.toString(16));
      }
      tag = numberValue === 2e308 ? 'INFINITY' : 'NUMBER';
      this.token(tag, number, 0, lexedLength);
      return lexedLength;
    };
    Lexer.prototype.stringToken = function() {
      var $,
          attempt,
          delimiter,
          doc,
          end,
          heredoc,
          i,
          indent,
          indentRegex,
          match,
          quote,
          ref2,
          ref3,
          regex,
          token,
          tokens;
      quote = (STRING_START.exec(this.chunk) || [])[0];
      if (!quote) {
        return 0;
      }
      if (this.tokens.length && this.value() === 'from' && (this.seenImport || this.seenExport)) {
        this.tokens[this.tokens.length - 1][0] = 'FROM';
      }
      regex = (function() {
        switch (quote) {
          case "'":
            return STRING_SINGLE;
          case '"':
            return STRING_DOUBLE;
          case "'''":
            return HEREDOC_SINGLE;
          case '"""':
            return HEREDOC_DOUBLE;
        }
      })();
      heredoc = quote.length === 3;
      ref2 = this.matchWithInterpolations(regex, quote), tokens = ref2.tokens, end = ref2.index;
      $ = tokens.length - 1;
      delimiter = quote.charAt(0);
      if (heredoc) {
        indent = null;
        doc = ((function() {
          var j,
              len,
              results;
          results = [];
          for (i = j = 0, len = tokens.length; j < len; i = ++j) {
            token = tokens[i];
            if (token[0] === 'NEOSTRING') {
              results.push(token[1]);
            }
          }
          return results;
        })()).join('#{}');
        while (match = HEREDOC_INDENT.exec(doc)) {
          attempt = match[1];
          if (indent === null || (0 < (ref3 = attempt.length) && ref3 < indent.length)) {
            indent = attempt;
          }
        }
        if (indent) {
          indentRegex = RegExp("\\n" + indent, "g");
        }
        this.mergeInterpolationTokens(tokens, {delimiter: delimiter}, (function(_this) {
          return function(value, i) {
            value = _this.formatString(value);
            if (indentRegex) {
              value = value.replace(indentRegex, '\n');
            }
            if (i === 0) {
              value = value.replace(LEADING_BLANK_LINE, '');
            }
            if (i === $) {
              value = value.replace(TRAILING_BLANK_LINE, '');
            }
            return value;
          };
        })(this));
      } else {
        this.mergeInterpolationTokens(tokens, {delimiter: delimiter}, (function(_this) {
          return function(value, i) {
            value = _this.formatString(value);
            value = value.replace(SIMPLE_STRING_OMIT, function(match, offset) {
              if ((i === 0 && offset === 0) || (i === $ && offset + match.length === value.length)) {
                return '';
              } else {
                return ' ';
              }
            });
            return value;
          };
        })(this));
      }
      return end;
    };
    Lexer.prototype.commentToken = function() {
      var comment,
          here,
          match;
      if (!(match = this.chunk.match(COMMENT))) {
        return 0;
      }
      comment = match[0], here = match[1];
      if (here) {
        if (match = HERECOMMENT_ILLEGAL.exec(comment)) {
          this.error("block comments cannot contain " + match[0], {
            offset: match.index,
            length: match[0].length
          });
        }
        if (here.indexOf('\n') >= 0) {
          here = here.replace(RegExp("\\n" + (repeat(' ', this.indent)), "g"), '\n');
        }
        this.token('HERECOMMENT', here, 0, comment.length);
      }
      return comment.length;
    };
    Lexer.prototype.jsToken = function() {
      var match,
          script;
      if (!(this.chunk.charAt(0) === '`' && (match = HERE_JSTOKEN.exec(this.chunk) || JSTOKEN.exec(this.chunk)))) {
        return 0;
      }
      script = match[1].replace(/\\+(`|$)/g, function(string) {
        return string.slice(-Math.ceil(string.length / 2));
      });
      this.token('JS', script, 0, match[0].length);
      return match[0].length;
    };
    Lexer.prototype.regexToken = function() {
      var body,
          closed,
          end,
          flags,
          index,
          match,
          origin,
          prev,
          ref2,
          ref3,
          ref4,
          regex,
          tokens;
      switch (false) {
        case !(match = REGEX_ILLEGAL.exec(this.chunk)):
          this.error("regular expressions cannot begin with " + match[2], {offset: match.index + match[1].length});
          break;
        case !(match = this.matchWithInterpolations(HEREGEX, '///')):
          tokens = match.tokens, index = match.index;
          break;
        case !(match = REGEX.exec(this.chunk)):
          regex = match[0], body = match[1], closed = match[2];
          this.validateEscapes(body, {
            isRegex: true,
            offsetInChunk: 1
          });
          index = regex.length;
          ref2 = this.tokens, prev = ref2[ref2.length - 1];
          if (prev) {
            if (prev.spaced && (ref3 = prev[0], indexOf.call(CALLABLE, ref3) >= 0)) {
              if (!closed || POSSIBLY_DIVISION.test(regex)) {
                return 0;
              }
            } else if (ref4 = prev[0], indexOf.call(NOT_REGEX, ref4) >= 0) {
              return 0;
            }
          }
          if (!closed) {
            this.error('missing / (unclosed regex)');
          }
          break;
        default:
          return 0;
      }
      flags = REGEX_FLAGS.exec(this.chunk.slice(index))[0];
      end = index + flags.length;
      origin = this.makeToken('REGEX', null, 0, end);
      switch (false) {
        case !!VALID_FLAGS.test(flags):
          this.error("invalid regular expression flags " + flags, {
            offset: index,
            length: flags.length
          });
          break;
        case !(regex || tokens.length === 1):
          if (body == null) {
            body = this.formatHeregex(tokens[0][1]);
          }
          this.token('REGEX', "" + (this.makeDelimitedLiteral(body, {delimiter: '/'})) + flags, 0, end, origin);
          break;
        default:
          this.token('REGEX_START', '(', 0, 0, origin);
          this.token('IDENTIFIER', 'RegExp', 0, 0);
          this.token('CALL_START', '(', 0, 0);
          this.mergeInterpolationTokens(tokens, {
            delimiter: '"',
            double: true
          }, this.formatHeregex);
          if (flags) {
            this.token(',', ',', index - 1, 0);
            this.token('STRING', '"' + flags + '"', index - 1, flags.length);
          }
          this.token(')', ')', end - 1, 0);
          this.token('REGEX_END', ')', end - 1, 0);
      }
      return end;
    };
    Lexer.prototype.lineToken = function() {
      var diff,
          indent,
          match,
          noNewlines,
          size;
      if (!(match = MULTI_DENT.exec(this.chunk))) {
        return 0;
      }
      indent = match[0];
      this.seenFor = false;
      size = indent.length - 1 - indent.lastIndexOf('\n');
      noNewlines = this.unfinished();
      if (size - this.indebt === this.indent) {
        if (noNewlines) {
          this.suppressNewlines();
        } else {
          this.newlineToken(0);
        }
        return indent.length;
      }
      if (size > this.indent) {
        if (noNewlines) {
          this.indebt = size - this.indent;
          this.suppressNewlines();
          return indent.length;
        }
        if (!this.tokens.length) {
          this.baseIndent = this.indent = size;
          return indent.length;
        }
        diff = size - this.indent + this.outdebt;
        this.token('INDENT', diff, indent.length - size, size);
        this.indents.push(diff);
        this.ends.push({tag: 'OUTDENT'});
        this.outdebt = this.indebt = 0;
        this.indent = size;
      } else if (size < this.baseIndent) {
        this.error('missing indentation', {offset: indent.length});
      } else {
        this.indebt = 0;
        this.outdentToken(this.indent - size, noNewlines, indent.length);
      }
      return indent.length;
    };
    Lexer.prototype.outdentToken = function(moveOut, noNewlines, outdentLength) {
      var decreasedIndent,
          dent,
          lastIndent,
          ref2;
      decreasedIndent = this.indent - moveOut;
      while (moveOut > 0) {
        lastIndent = this.indents[this.indents.length - 1];
        if (!lastIndent) {
          moveOut = 0;
        } else if (lastIndent === this.outdebt) {
          moveOut -= this.outdebt;
          this.outdebt = 0;
        } else if (lastIndent < this.outdebt) {
          this.outdebt -= lastIndent;
          moveOut -= lastIndent;
        } else {
          dent = this.indents.pop() + this.outdebt;
          if (outdentLength && (ref2 = this.chunk[outdentLength], indexOf.call(INDENTABLE_CLOSERS, ref2) >= 0)) {
            decreasedIndent -= dent - moveOut;
            moveOut = dent;
          }
          this.outdebt = 0;
          this.pair('OUTDENT');
          this.token('OUTDENT', moveOut, 0, outdentLength);
          moveOut -= dent;
        }
      }
      if (dent) {
        this.outdebt -= moveOut;
      }
      while (this.value() === ';') {
        this.tokens.pop();
      }
      if (!(this.tag() === 'TERMINATOR' || noNewlines)) {
        this.token('TERMINATOR', '\n', outdentLength, 0);
      }
      this.indent = decreasedIndent;
      return this;
    };
    Lexer.prototype.whitespaceToken = function() {
      var match,
          nline,
          prev,
          ref2;
      if (!((match = WHITESPACE.exec(this.chunk)) || (nline = this.chunk.charAt(0) === '\n'))) {
        return 0;
      }
      ref2 = this.tokens, prev = ref2[ref2.length - 1];
      if (prev) {
        prev[match ? 'spaced' : 'newLine'] = true;
      }
      if (match) {
        return match[0].length;
      } else {
        return 0;
      }
    };
    Lexer.prototype.newlineToken = function(offset) {
      while (this.value() === ';') {
        this.tokens.pop();
      }
      if (this.tag() !== 'TERMINATOR') {
        this.token('TERMINATOR', '\n', offset, 0);
      }
      return this;
    };
    Lexer.prototype.suppressNewlines = function() {
      if (this.value() === '\\') {
        this.tokens.pop();
      }
      return this;
    };
    Lexer.prototype.literalToken = function() {
      var match,
          message,
          origin,
          prev,
          ref2,
          ref3,
          ref4,
          ref5,
          ref6,
          skipToken,
          tag,
          token,
          value;
      if (match = OPERATOR.exec(this.chunk)) {
        value = match[0];
        if (CODE.test(value)) {
          this.tagParameters();
        }
      } else {
        value = this.chunk.charAt(0);
      }
      tag = value;
      ref2 = this.tokens, prev = ref2[ref2.length - 1];
      if (prev && indexOf.call(['='].concat(slice.call(COMPOUND_ASSIGN)), value) >= 0) {
        skipToken = false;
        if (value === '=' && ((ref3 = prev[1]) === '||' || ref3 === '&&') && !prev.spaced) {
          prev[0] = 'COMPOUND_ASSIGN';
          prev[1] += '=';
          prev = this.tokens[this.tokens.length - 2];
          skipToken = true;
        }
        if (prev && prev[0] !== 'PROPERTY') {
          origin = (ref4 = prev.origin) != null ? ref4 : prev;
          message = isUnassignable(prev[1], origin[1]);
          if (message) {
            this.error(message, origin[2]);
          }
        }
        if (skipToken) {
          return value.length;
        }
      }
      if (value === '{' && (prev != null ? prev[0] : void 0) === 'EXPORT') {
        this.exportSpecifierList = true;
      } else if (this.exportSpecifierList && value === '}') {
        this.exportSpecifierList = false;
      }
      if (value === ';') {
        this.seenFor = this.seenImport = this.seenExport = false;
        tag = 'TERMINATOR';
      } else if (value === '*' && prev[0] === 'EXPORT') {
        tag = 'EXPORT_ALL';
      } else if (indexOf.call(MATH, value) >= 0) {
        tag = 'MATH';
      } else if (indexOf.call(COMPARE, value) >= 0) {
        tag = 'COMPARE';
      } else if (indexOf.call(COMPOUND_ASSIGN, value) >= 0) {
        tag = 'COMPOUND_ASSIGN';
      } else if (indexOf.call(UNARY, value) >= 0) {
        tag = 'UNARY';
      } else if (indexOf.call(UNARY_MATH, value) >= 0) {
        tag = 'UNARY_MATH';
      } else if (indexOf.call(SHIFT, value) >= 0) {
        tag = 'SHIFT';
      } else if (value === '?' && (prev != null ? prev.spaced : void 0)) {
        tag = 'BIN?';
      } else if (prev && !prev.spaced) {
        if (value === '(' && (ref5 = prev[0], indexOf.call(CALLABLE, ref5) >= 0)) {
          if (prev[0] === '?') {
            prev[0] = 'FUNC_EXIST';
          }
          tag = 'CALL_START';
        } else if (value === '[' && (ref6 = prev[0], indexOf.call(INDEXABLE, ref6) >= 0)) {
          tag = 'INDEX_START';
          switch (prev[0]) {
            case '?':
              prev[0] = 'INDEX_SOAK';
          }
        }
      }
      token = this.makeToken(tag, value);
      switch (value) {
        case '(':
        case '{':
        case '[':
          this.ends.push({
            tag: INVERSES[value],
            origin: token
          });
          break;
        case ')':
        case '}':
        case ']':
          this.pair(value);
      }
      this.tokens.push(token);
      return value.length;
    };
    Lexer.prototype.tagParameters = function() {
      var i,
          stack,
          tok,
          tokens;
      if (this.tag() !== ')') {
        return this;
      }
      stack = [];
      tokens = this.tokens;
      i = tokens.length;
      tokens[--i][0] = 'PARAM_END';
      while (tok = tokens[--i]) {
        switch (tok[0]) {
          case ')':
            stack.push(tok);
            break;
          case '(':
          case 'CALL_START':
            if (stack.length) {
              stack.pop();
            } else if (tok[0] === '(') {
              tok[0] = 'PARAM_START';
              return this;
            } else {
              return this;
            }
        }
      }
      return this;
    };
    Lexer.prototype.closeIndentation = function() {
      return this.outdentToken(this.indent);
    };
    Lexer.prototype.matchWithInterpolations = function(regex, delimiter) {
      var close,
          column,
          firstToken,
          index,
          lastToken,
          line,
          nested,
          offsetInChunk,
          open,
          ref2,
          ref3,
          ref4,
          str,
          strPart,
          tokens;
      tokens = [];
      offsetInChunk = delimiter.length;
      if (this.chunk.slice(0, offsetInChunk) !== delimiter) {
        return null;
      }
      str = this.chunk.slice(offsetInChunk);
      while (true) {
        strPart = regex.exec(str)[0];
        this.validateEscapes(strPart, {
          isRegex: delimiter.charAt(0) === '/',
          offsetInChunk: offsetInChunk
        });
        tokens.push(this.makeToken('NEOSTRING', strPart, offsetInChunk));
        str = str.slice(strPart.length);
        offsetInChunk += strPart.length;
        if (str.slice(0, 2) !== '#{') {
          break;
        }
        ref2 = this.getLineAndColumnFromChunk(offsetInChunk + 1), line = ref2[0], column = ref2[1];
        ref3 = new Lexer().tokenize(str.slice(1), {
          line: line,
          column: column,
          untilBalanced: true
        }), nested = ref3.tokens, index = ref3.index;
        index += 1;
        open = nested[0], close = nested[nested.length - 1];
        open[0] = open[1] = '(';
        close[0] = close[1] = ')';
        close.origin = ['', 'end of interpolation', close[2]];
        if (((ref4 = nested[1]) != null ? ref4[0] : void 0) === 'TERMINATOR') {
          nested.splice(1, 1);
        }
        tokens.push(['TOKENS', nested]);
        str = str.slice(index);
        offsetInChunk += index;
      }
      if (str.slice(0, delimiter.length) !== delimiter) {
        this.error("missing " + delimiter, {length: delimiter.length});
      }
      firstToken = tokens[0], lastToken = tokens[tokens.length - 1];
      firstToken[2].first_column -= delimiter.length;
      if (lastToken[1].substr(-1) === '\n') {
        lastToken[2].last_line += 1;
        lastToken[2].last_column = delimiter.length - 1;
      } else {
        lastToken[2].last_column += delimiter.length;
      }
      if (lastToken[1].length === 0) {
        lastToken[2].last_column -= 1;
      }
      return {
        tokens: tokens,
        index: offsetInChunk + delimiter.length
      };
    };
    Lexer.prototype.mergeInterpolationTokens = function(tokens, options, fn) {
      var converted,
          firstEmptyStringIndex,
          firstIndex,
          i,
          j,
          lastToken,
          len,
          locationToken,
          lparen,
          plusToken,
          ref2,
          rparen,
          tag,
          token,
          tokensToPush,
          value;
      if (tokens.length > 1) {
        lparen = this.token('STRING_START', '(', 0, 0);
      }
      firstIndex = this.tokens.length;
      for (i = j = 0, len = tokens.length; j < len; i = ++j) {
        token = tokens[i];
        tag = token[0], value = token[1];
        switch (tag) {
          case 'TOKENS':
            if (value.length === 2) {
              continue;
            }
            locationToken = value[0];
            tokensToPush = value;
            break;
          case 'NEOSTRING':
            converted = fn(token[1], i);
            if (converted.length === 0) {
              if (i === 0) {
                firstEmptyStringIndex = this.tokens.length;
              } else {
                continue;
              }
            }
            if (i === 2 && (firstEmptyStringIndex != null)) {
              this.tokens.splice(firstEmptyStringIndex, 2);
            }
            token[0] = 'STRING';
            token[1] = this.makeDelimitedLiteral(converted, options);
            locationToken = token;
            tokensToPush = [token];
        }
        if (this.tokens.length > firstIndex) {
          plusToken = this.token('+', '+');
          plusToken[2] = {
            first_line: locationToken[2].first_line,
            first_column: locationToken[2].first_column,
            last_line: locationToken[2].first_line,
            last_column: locationToken[2].first_column
          };
        }
        (ref2 = this.tokens).push.apply(ref2, tokensToPush);
      }
      if (lparen) {
        lastToken = tokens[tokens.length - 1];
        lparen.origin = ['STRING', null, {
          first_line: lparen[2].first_line,
          first_column: lparen[2].first_column,
          last_line: lastToken[2].last_line,
          last_column: lastToken[2].last_column
        }];
        rparen = this.token('STRING_END', ')');
        return rparen[2] = {
          first_line: lastToken[2].last_line,
          first_column: lastToken[2].last_column,
          last_line: lastToken[2].last_line,
          last_column: lastToken[2].last_column
        };
      }
    };
    Lexer.prototype.pair = function(tag) {
      var lastIndent,
          prev,
          ref2,
          ref3,
          wanted;
      ref2 = this.ends, prev = ref2[ref2.length - 1];
      if (tag !== (wanted = prev != null ? prev.tag : void 0)) {
        if ('OUTDENT' !== wanted) {
          this.error("unmatched " + tag);
        }
        ref3 = this.indents, lastIndent = ref3[ref3.length - 1];
        this.outdentToken(lastIndent, true);
        return this.pair(tag);
      }
      return this.ends.pop();
    };
    Lexer.prototype.getLineAndColumnFromChunk = function(offset) {
      var column,
          lastLine,
          lineCount,
          ref2,
          string;
      if (offset === 0) {
        return [this.chunkLine, this.chunkColumn];
      }
      if (offset >= this.chunk.length) {
        string = this.chunk;
      } else {
        string = this.chunk.slice(0, +(offset - 1) + 1 || 9e9);
      }
      lineCount = count(string, '\n');
      column = this.chunkColumn;
      if (lineCount > 0) {
        ref2 = string.split('\n'), lastLine = ref2[ref2.length - 1];
        column = lastLine.length;
      } else {
        column += string.length;
      }
      return [this.chunkLine + lineCount, column];
    };
    Lexer.prototype.makeToken = function(tag, value, offsetInChunk, length) {
      var lastCharacter,
          locationData,
          ref2,
          ref3,
          token;
      if (offsetInChunk == null) {
        offsetInChunk = 0;
      }
      if (length == null) {
        length = value.length;
      }
      locationData = {};
      ref2 = this.getLineAndColumnFromChunk(offsetInChunk), locationData.first_line = ref2[0], locationData.first_column = ref2[1];
      lastCharacter = length > 0 ? length - 1 : 0;
      ref3 = this.getLineAndColumnFromChunk(offsetInChunk + lastCharacter), locationData.last_line = ref3[0], locationData.last_column = ref3[1];
      token = [tag, value, locationData];
      return token;
    };
    Lexer.prototype.token = function(tag, value, offsetInChunk, length, origin) {
      var token;
      token = this.makeToken(tag, value, offsetInChunk, length);
      if (origin) {
        token.origin = origin;
      }
      this.tokens.push(token);
      return token;
    };
    Lexer.prototype.tag = function() {
      var ref2,
          token;
      ref2 = this.tokens, token = ref2[ref2.length - 1];
      return token != null ? token[0] : void 0;
    };
    Lexer.prototype.value = function() {
      var ref2,
          token;
      ref2 = this.tokens, token = ref2[ref2.length - 1];
      return token != null ? token[1] : void 0;
    };
    Lexer.prototype.unfinished = function() {
      var ref2;
      return LINE_CONTINUER.test(this.chunk) || ((ref2 = this.tag()) === '\\' || ref2 === '.' || ref2 === '?.' || ref2 === '?::' || ref2 === 'UNARY' || ref2 === 'MATH' || ref2 === 'UNARY_MATH' || ref2 === '+' || ref2 === '-' || ref2 === '**' || ref2 === 'SHIFT' || ref2 === 'RELATION' || ref2 === 'COMPARE' || ref2 === '&' || ref2 === '^' || ref2 === '|' || ref2 === '&&' || ref2 === '||' || ref2 === 'BIN?' || ref2 === 'THROW' || ref2 === 'EXTENDS');
    };
    Lexer.prototype.formatString = function(str) {
      return str.replace(STRING_OMIT, '$1');
    };
    Lexer.prototype.formatHeregex = function(str) {
      return str.replace(HEREGEX_OMIT, '$1$2');
    };
    Lexer.prototype.validateEscapes = function(str, options) {
      var before,
          hex,
          invalidEscape,
          match,
          message,
          octal,
          ref2,
          unicode;
      if (options == null) {
        options = {};
      }
      match = INVALID_ESCAPE.exec(str);
      if (!match) {
        return;
      }
      match[0], before = match[1], octal = match[2], hex = match[3], unicode = match[4];
      if (options.isRegex && octal && octal.charAt(0) !== '0') {
        return;
      }
      message = octal ? "octal escape sequences are not allowed" : "invalid escape sequence";
      invalidEscape = "\\" + (octal || hex || unicode);
      return this.error(message + " " + invalidEscape, {
        offset: ((ref2 = options.offsetInChunk) != null ? ref2 : 0) + match.index + before.length,
        length: invalidEscape.length
      });
    };
    Lexer.prototype.makeDelimitedLiteral = function(body, options) {
      var regex;
      if (options == null) {
        options = {};
      }
      if (body === '' && options.delimiter === '/') {
        body = '(?:)';
      }
      regex = RegExp("(\\\\\\\\)|(\\\\0(?=[1-7]))|\\\\?(" + options.delimiter + ")|\\\\?(?:(\\n)|(\\r)|(\\u2028)|(\\u2029))|(\\\\.)", "g");
      body = body.replace(regex, function(match, backslash, nul, delimiter, lf, cr, ls, ps, other) {
        switch (false) {
          case !backslash:
            if (options.double) {
              return backslash + backslash;
            } else {
              return backslash;
            }
          case !nul:
            return '\\x00';
          case !delimiter:
            return "\\" + delimiter;
          case !lf:
            return '\\n';
          case !cr:
            return '\\r';
          case !ls:
            return '\\u2028';
          case !ps:
            return '\\u2029';
          case !other:
            if (options.double) {
              return "\\" + other;
            } else {
              return other;
            }
        }
      });
      return "" + options.delimiter + body + options.delimiter;
    };
    Lexer.prototype.error = function(message, options) {
      var first_column,
          first_line,
          location,
          ref2,
          ref3,
          ref4;
      if (options == null) {
        options = {};
      }
      location = 'first_line' in options ? options : ((ref3 = this.getLineAndColumnFromChunk((ref2 = options.offset) != null ? ref2 : 0), first_line = ref3[0], first_column = ref3[1], ref3), {
        first_line: first_line,
        first_column: first_column,
        last_column: first_column + ((ref4 = options.length) != null ? ref4 : 1) - 1
      });
      return throwSyntaxError(message, location);
    };
    return Lexer;
  })();
  isUnassignable = function(name, displayName) {
    if (displayName == null) {
      displayName = name;
    }
    switch (false) {
      case indexOf.call(slice.call(JS_KEYWORDS).concat(slice.call(COFFEE_KEYWORDS)), name) < 0:
        return "keyword '" + displayName + "' can't be assigned";
      case indexOf.call(STRICT_PROSCRIBED, name) < 0:
        return "'" + displayName + "' can't be assigned";
      case indexOf.call(RESERVED, name) < 0:
        return "reserved word '" + displayName + "' can't be assigned";
      default:
        return false;
    }
  };
  exports.isUnassignable = isUnassignable;
  isForFrom = function(prev) {
    var ref2;
    if (prev[0] === 'IDENTIFIER') {
      if (prev[1] === 'from') {
        prev[1][0] = 'IDENTIFIER';
        true;
      }
      return true;
    } else if (prev[0] === 'FOR') {
      return false;
    } else if ((ref2 = prev[1]) === '{' || ref2 === '[' || ref2 === ',' || ref2 === ':') {
      return false;
    } else {
      return true;
    }
  };
  JS_KEYWORDS = ['true', 'false', 'null', 'this', 'new', 'delete', 'typeof', 'in', 'instanceof', 'return', 'throw', 'break', 'continue', 'debugger', 'yield', 'if', 'else', 'switch', 'for', 'while', 'do', 'try', 'catch', 'finally', 'class', 'extends', 'super', 'import', 'export', 'default'];
  COFFEE_KEYWORDS = ['undefined', 'Infinity', 'NaN', 'then', 'unless', 'until', 'loop', 'of', 'by', 'when'];
  COFFEE_ALIAS_MAP = {
    and: '&&',
    or: '||',
    is: '==',
    isnt: '!=',
    not: '!',
    yes: 'true',
    no: 'false',
    on: 'true',
    off: 'false'
  };
  COFFEE_ALIASES = (function() {
    var results;
    results = [];
    for (key in COFFEE_ALIAS_MAP) {
      results.push(key);
    }
    return results;
  })();
  COFFEE_KEYWORDS = COFFEE_KEYWORDS.concat(COFFEE_ALIASES);
  RESERVED = ['case', 'function', 'var', 'void', 'with', 'const', 'let', 'enum', 'native', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'static'];
  STRICT_PROSCRIBED = ['arguments', 'eval'];
  exports.JS_FORBIDDEN = JS_KEYWORDS.concat(RESERVED).concat(STRICT_PROSCRIBED);
  BOM = 65279;
  IDENTIFIER = /^(?!\d)((?:(?!\s)[$\w\x7f-\uffff])+)([^\n\S]*:(?!:))?/;
  NUMBER = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i;
  OPERATOR = /^(?:[-=]>|[-+*\/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>*\/%])\2=?|\?(\.|::)|\.{2,3})/;
  WHITESPACE = /^[^\n\S]+/;
  COMMENT = /^###([^#][\s\S]*?)(?:###[^\n\S]*|###$)|^(?:\s*#(?!##[^#]).*)+/;
  CODE = /^[-=]>/;
  MULTI_DENT = /^(?:\n[^\n\S]*)+/;
  JSTOKEN = /^`(?!``)((?:[^`\\]|\\[\s\S])*)`/;
  HERE_JSTOKEN = /^```((?:[^`\\]|\\[\s\S]|`(?!``))*)```/;
  STRING_START = /^(?:'''|"""|'|")/;
  STRING_SINGLE = /^(?:[^\\']|\\[\s\S])*/;
  STRING_DOUBLE = /^(?:[^\\"#]|\\[\s\S]|\#(?!\{))*/;
  HEREDOC_SINGLE = /^(?:[^\\']|\\[\s\S]|'(?!''))*/;
  HEREDOC_DOUBLE = /^(?:[^\\"#]|\\[\s\S]|"(?!"")|\#(?!\{))*/;
  STRING_OMIT = /((?:\\\\)+)|\\[^\S\n]*\n\s*/g;
  SIMPLE_STRING_OMIT = /\s*\n\s*/g;
  HEREDOC_INDENT = /\n+([^\n\S]*)(?=\S)/g;
  REGEX = /^\/(?!\/)((?:[^[\/\n\\]|\\[^\n]|\[(?:\\[^\n]|[^\]\n\\])*\])*)(\/)?/;
  REGEX_FLAGS = /^\w*/;
  VALID_FLAGS = /^(?!.*(.).*\1)[imgy]*$/;
  HEREGEX = /^(?:[^\\\/#]|\\[\s\S]|\/(?!\/\/)|\#(?!\{))*/;
  HEREGEX_OMIT = /((?:\\\\)+)|\\(\s)|\s+(?:#.*)?/g;
  REGEX_ILLEGAL = /^(\/|\/{3}\s*)(\*)/;
  POSSIBLY_DIVISION = /^\/=?\s/;
  HERECOMMENT_ILLEGAL = /\*\//;
  LINE_CONTINUER = /^\s*(?:,|\??\.(?![.\d])|::)/;
  INVALID_ESCAPE = /((?:^|[^\\])(?:\\\\)*)\\(?:(0[0-7]|[1-7])|(x(?![\da-fA-F]{2}).{0,2})|(u(?![\da-fA-F]{4}).{0,4}))/;
  LEADING_BLANK_LINE = /^[^\n\S]*\n/;
  TRAILING_BLANK_LINE = /\n[^\n\S]*$/;
  TRAILING_SPACES = /\s+$/;
  COMPOUND_ASSIGN = ['-=', '+=', '/=', '*=', '%=', '||=', '&&=', '?=', '<<=', '>>=', '>>>=', '&=', '^=', '|=', '**=', '//=', '%%='];
  UNARY = ['NEW', 'TYPEOF', 'DELETE', 'DO'];
  UNARY_MATH = ['!', '~'];
  SHIFT = ['<<', '>>', '>>>'];
  COMPARE = ['==', '!=', '<', '>', '<=', '>='];
  MATH = ['*', '/', '%', '//', '%%'];
  RELATION = ['IN', 'OF', 'INSTANCEOF'];
  BOOL = ['TRUE', 'FALSE'];
  CALLABLE = ['IDENTIFIER', 'PROPERTY', ')', ']', '?', '@', 'THIS', 'SUPER'];
  INDEXABLE = CALLABLE.concat(['NUMBER', 'INFINITY', 'NAN', 'STRING', 'STRING_END', 'REGEX', 'REGEX_END', 'BOOL', 'NULL', 'UNDEFINED', '}', '::']);
  NOT_REGEX = INDEXABLE.concat(['++', '--']);
  LINE_BREAK = ['INDENT', 'OUTDENT', 'TERMINATOR'];
  INDENTABLE_CLOSERS = [')', '}', ']'];
}).call(this);
