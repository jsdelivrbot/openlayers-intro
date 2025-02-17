/* */ 
(function() {
  var Access,
      Arr,
      Assign,
      Base,
      Block,
      BooleanLiteral,
      Call,
      Class,
      Code,
      CodeFragment,
      Comment,
      Existence,
      Expansion,
      ExportAllDeclaration,
      ExportDeclaration,
      ExportDefaultDeclaration,
      ExportNamedDeclaration,
      ExportSpecifier,
      ExportSpecifierList,
      Extends,
      For,
      IdentifierLiteral,
      If,
      ImportClause,
      ImportDeclaration,
      ImportDefaultSpecifier,
      ImportNamespaceSpecifier,
      ImportSpecifier,
      ImportSpecifierList,
      In,
      Index,
      InfinityLiteral,
      JS_FORBIDDEN,
      LEVEL_ACCESS,
      LEVEL_COND,
      LEVEL_LIST,
      LEVEL_OP,
      LEVEL_PAREN,
      LEVEL_TOP,
      Literal,
      ModuleDeclaration,
      ModuleSpecifier,
      ModuleSpecifierList,
      NEGATE,
      NO,
      NaNLiteral,
      NullLiteral,
      NumberLiteral,
      Obj,
      Op,
      Param,
      Parens,
      PassthroughLiteral,
      PropertyName,
      Range,
      RegexLiteral,
      RegexWithInterpolations,
      Return,
      SIMPLENUM,
      Scope,
      Slice,
      Splat,
      StatementLiteral,
      StringLiteral,
      StringWithInterpolations,
      SuperCall,
      Switch,
      TAB,
      THIS,
      TaggedTemplateCall,
      ThisLiteral,
      Throw,
      Try,
      UTILITIES,
      UndefinedLiteral,
      Value,
      While,
      YES,
      YieldReturn,
      addLocationDataFn,
      compact,
      del,
      ends,
      extend,
      flatten,
      fragmentsToText,
      isComplexOrAssignable,
      isLiteralArguments,
      isLiteralThis,
      isUnassignable,
      locationDataToString,
      merge,
      multident,
      ref1,
      ref2,
      some,
      starts,
      throwSyntaxError,
      unfoldSoak,
      utility,
      extend1 = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
      hasProp = {}.hasOwnProperty,
      indexOf = [].indexOf || function(item) {
        for (var i = 0,
            l = this.length; i < l; i++) {
          if (i in this && this[i] === item)
            return i;
        }
        return -1;
      },
      slice = [].slice;
  Error.stackTraceLimit = 2e308;
  Scope = require('./scope').Scope;
  ref1 = require('./lexer'), isUnassignable = ref1.isUnassignable, JS_FORBIDDEN = ref1.JS_FORBIDDEN;
  ref2 = require('./helpers'), compact = ref2.compact, flatten = ref2.flatten, extend = ref2.extend, merge = ref2.merge, del = ref2.del, starts = ref2.starts, ends = ref2.ends, some = ref2.some, addLocationDataFn = ref2.addLocationDataFn, locationDataToString = ref2.locationDataToString, throwSyntaxError = ref2.throwSyntaxError;
  exports.extend = extend;
  exports.addLocationDataFn = addLocationDataFn;
  YES = function() {
    return true;
  };
  NO = function() {
    return false;
  };
  THIS = function() {
    return this;
  };
  NEGATE = function() {
    this.negated = !this.negated;
    return this;
  };
  exports.CodeFragment = CodeFragment = (function() {
    function CodeFragment(parent, code) {
      var ref3;
      this.code = "" + code;
      this.locationData = parent != null ? parent.locationData : void 0;
      this.type = (parent != null ? (ref3 = parent.constructor) != null ? ref3.name : void 0 : void 0) || 'unknown';
    }
    CodeFragment.prototype.toString = function() {
      return "" + this.code + (this.locationData ? ": " + locationDataToString(this.locationData) : '');
    };
    return CodeFragment;
  })();
  fragmentsToText = function(fragments) {
    var fragment;
    return ((function() {
      var j,
          len1,
          results;
      results = [];
      for (j = 0, len1 = fragments.length; j < len1; j++) {
        fragment = fragments[j];
        results.push(fragment.code);
      }
      return results;
    })()).join('');
  };
  exports.Base = Base = (function() {
    function Base() {}
    Base.prototype.compile = function(o, lvl) {
      return fragmentsToText(this.compileToFragments(o, lvl));
    };
    Base.prototype.compileToFragments = function(o, lvl) {
      var node;
      o = extend({}, o);
      if (lvl) {
        o.level = lvl;
      }
      node = this.unfoldSoak(o) || this;
      node.tab = o.indent;
      if (o.level === LEVEL_TOP || !node.isStatement(o)) {
        return node.compileNode(o);
      } else {
        return node.compileClosure(o);
      }
    };
    Base.prototype.compileClosure = function(o) {
      var args,
          argumentsNode,
          func,
          jumpNode,
          meth,
          parts,
          ref3;
      if (jumpNode = this.jumps()) {
        jumpNode.error('cannot use a pure statement in an expression');
      }
      o.sharedScope = true;
      func = new Code([], Block.wrap([this]));
      args = [];
      if ((argumentsNode = this.contains(isLiteralArguments)) || this.contains(isLiteralThis)) {
        args = [new ThisLiteral];
        if (argumentsNode) {
          meth = 'apply';
          args.push(new IdentifierLiteral('arguments'));
        } else {
          meth = 'call';
        }
        func = new Value(func, [new Access(new PropertyName(meth))]);
      }
      parts = (new Call(func, args)).compileNode(o);
      if (func.isGenerator || ((ref3 = func.base) != null ? ref3.isGenerator : void 0)) {
        parts.unshift(this.makeCode("(yield* "));
        parts.push(this.makeCode(")"));
      }
      return parts;
    };
    Base.prototype.cache = function(o, level, isComplex) {
      var complex,
          ref,
          sub;
      complex = isComplex != null ? isComplex(this) : this.isComplex();
      if (complex) {
        ref = new IdentifierLiteral(o.scope.freeVariable('ref'));
        sub = new Assign(ref, this);
        if (level) {
          return [sub.compileToFragments(o, level), [this.makeCode(ref.value)]];
        } else {
          return [sub, ref];
        }
      } else {
        ref = level ? this.compileToFragments(o, level) : this;
        return [ref, ref];
      }
    };
    Base.prototype.cacheToCodeFragments = function(cacheValues) {
      return [fragmentsToText(cacheValues[0]), fragmentsToText(cacheValues[1])];
    };
    Base.prototype.makeReturn = function(res) {
      var me;
      me = this.unwrapAll();
      if (res) {
        return new Call(new Literal(res + ".push"), [me]);
      } else {
        return new Return(me);
      }
    };
    Base.prototype.contains = function(pred) {
      var node;
      node = void 0;
      this.traverseChildren(false, function(n) {
        if (pred(n)) {
          node = n;
          return false;
        }
      });
      return node;
    };
    Base.prototype.lastNonComment = function(list) {
      var i;
      i = list.length;
      while (i--) {
        if (!(list[i] instanceof Comment)) {
          return list[i];
        }
      }
      return null;
    };
    Base.prototype.toString = function(idt, name) {
      var tree;
      if (idt == null) {
        idt = '';
      }
      if (name == null) {
        name = this.constructor.name;
      }
      tree = '\n' + idt + name;
      if (this.soak) {
        tree += '?';
      }
      this.eachChild(function(node) {
        return tree += node.toString(idt + TAB);
      });
      return tree;
    };
    Base.prototype.eachChild = function(func) {
      var attr,
          child,
          j,
          k,
          len1,
          len2,
          ref3,
          ref4;
      if (!this.children) {
        return this;
      }
      ref3 = this.children;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        attr = ref3[j];
        if (this[attr]) {
          ref4 = flatten([this[attr]]);
          for (k = 0, len2 = ref4.length; k < len2; k++) {
            child = ref4[k];
            if (func(child) === false) {
              return this;
            }
          }
        }
      }
      return this;
    };
    Base.prototype.traverseChildren = function(crossScope, func) {
      return this.eachChild(function(child) {
        var recur;
        recur = func(child);
        if (recur !== false) {
          return child.traverseChildren(crossScope, func);
        }
      });
    };
    Base.prototype.invert = function() {
      return new Op('!', this);
    };
    Base.prototype.unwrapAll = function() {
      var node;
      node = this;
      while (node !== (node = node.unwrap())) {
        continue;
      }
      return node;
    };
    Base.prototype.children = [];
    Base.prototype.isStatement = NO;
    Base.prototype.jumps = NO;
    Base.prototype.isComplex = YES;
    Base.prototype.isChainable = NO;
    Base.prototype.isAssignable = NO;
    Base.prototype.isNumber = NO;
    Base.prototype.unwrap = THIS;
    Base.prototype.unfoldSoak = NO;
    Base.prototype.assigns = NO;
    Base.prototype.updateLocationDataIfMissing = function(locationData) {
      if (this.locationData) {
        return this;
      }
      this.locationData = locationData;
      return this.eachChild(function(child) {
        return child.updateLocationDataIfMissing(locationData);
      });
    };
    Base.prototype.error = function(message) {
      return throwSyntaxError(message, this.locationData);
    };
    Base.prototype.makeCode = function(code) {
      return new CodeFragment(this, code);
    };
    Base.prototype.wrapInBraces = function(fragments) {
      return [].concat(this.makeCode('('), fragments, this.makeCode(')'));
    };
    Base.prototype.joinFragmentArrays = function(fragmentsList, joinStr) {
      var answer,
          fragments,
          i,
          j,
          len1;
      answer = [];
      for (i = j = 0, len1 = fragmentsList.length; j < len1; i = ++j) {
        fragments = fragmentsList[i];
        if (i) {
          answer.push(this.makeCode(joinStr));
        }
        answer = answer.concat(fragments);
      }
      return answer;
    };
    return Base;
  })();
  exports.Block = Block = (function(superClass1) {
    extend1(Block, superClass1);
    function Block(nodes) {
      this.expressions = compact(flatten(nodes || []));
    }
    Block.prototype.children = ['expressions'];
    Block.prototype.push = function(node) {
      this.expressions.push(node);
      return this;
    };
    Block.prototype.pop = function() {
      return this.expressions.pop();
    };
    Block.prototype.unshift = function(node) {
      this.expressions.unshift(node);
      return this;
    };
    Block.prototype.unwrap = function() {
      if (this.expressions.length === 1) {
        return this.expressions[0];
      } else {
        return this;
      }
    };
    Block.prototype.isEmpty = function() {
      return !this.expressions.length;
    };
    Block.prototype.isStatement = function(o) {
      var exp,
          j,
          len1,
          ref3;
      ref3 = this.expressions;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        exp = ref3[j];
        if (exp.isStatement(o)) {
          return true;
        }
      }
      return false;
    };
    Block.prototype.jumps = function(o) {
      var exp,
          j,
          jumpNode,
          len1,
          ref3;
      ref3 = this.expressions;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        exp = ref3[j];
        if (jumpNode = exp.jumps(o)) {
          return jumpNode;
        }
      }
    };
    Block.prototype.makeReturn = function(res) {
      var expr,
          len;
      len = this.expressions.length;
      while (len--) {
        expr = this.expressions[len];
        if (!(expr instanceof Comment)) {
          this.expressions[len] = expr.makeReturn(res);
          if (expr instanceof Return && !expr.expression) {
            this.expressions.splice(len, 1);
          }
          break;
        }
      }
      return this;
    };
    Block.prototype.compileToFragments = function(o, level) {
      if (o == null) {
        o = {};
      }
      if (o.scope) {
        return Block.__super__.compileToFragments.call(this, o, level);
      } else {
        return this.compileRoot(o);
      }
    };
    Block.prototype.compileNode = function(o) {
      var answer,
          compiledNodes,
          fragments,
          index,
          j,
          len1,
          node,
          ref3,
          top;
      this.tab = o.indent;
      top = o.level === LEVEL_TOP;
      compiledNodes = [];
      ref3 = this.expressions;
      for (index = j = 0, len1 = ref3.length; j < len1; index = ++j) {
        node = ref3[index];
        node = node.unwrapAll();
        node = node.unfoldSoak(o) || node;
        if (node instanceof Block) {
          compiledNodes.push(node.compileNode(o));
        } else if (top) {
          node.front = true;
          fragments = node.compileToFragments(o);
          if (!node.isStatement(o)) {
            fragments.unshift(this.makeCode("" + this.tab));
            fragments.push(this.makeCode(";"));
          }
          compiledNodes.push(fragments);
        } else {
          compiledNodes.push(node.compileToFragments(o, LEVEL_LIST));
        }
      }
      if (top) {
        if (this.spaced) {
          return [].concat(this.joinFragmentArrays(compiledNodes, '\n\n'), this.makeCode("\n"));
        } else {
          return this.joinFragmentArrays(compiledNodes, '\n');
        }
      }
      if (compiledNodes.length) {
        answer = this.joinFragmentArrays(compiledNodes, ', ');
      } else {
        answer = [this.makeCode("void 0")];
      }
      if (compiledNodes.length > 1 && o.level >= LEVEL_LIST) {
        return this.wrapInBraces(answer);
      } else {
        return answer;
      }
    };
    Block.prototype.compileRoot = function(o) {
      var exp,
          fragments,
          i,
          j,
          len1,
          name,
          prelude,
          preludeExps,
          ref3,
          ref4,
          rest;
      o.indent = o.bare ? '' : TAB;
      o.level = LEVEL_TOP;
      this.spaced = true;
      o.scope = new Scope(null, this, null, (ref3 = o.referencedVars) != null ? ref3 : []);
      ref4 = o.locals || [];
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        name = ref4[j];
        o.scope.parameter(name);
      }
      prelude = [];
      if (!o.bare) {
        preludeExps = (function() {
          var k,
              len2,
              ref5,
              results;
          ref5 = this.expressions;
          results = [];
          for (i = k = 0, len2 = ref5.length; k < len2; i = ++k) {
            exp = ref5[i];
            if (!(exp.unwrap() instanceof Comment)) {
              break;
            }
            results.push(exp);
          }
          return results;
        }).call(this);
        rest = this.expressions.slice(preludeExps.length);
        this.expressions = preludeExps;
        if (preludeExps.length) {
          prelude = this.compileNode(merge(o, {indent: ''}));
          prelude.push(this.makeCode("\n"));
        }
        this.expressions = rest;
      }
      fragments = this.compileWithDeclarations(o);
      if (o.bare) {
        return fragments;
      }
      return [].concat(prelude, this.makeCode("(function() {\n"), fragments, this.makeCode("\n}).call(this);\n"));
    };
    Block.prototype.compileWithDeclarations = function(o) {
      var assigns,
          declars,
          exp,
          fragments,
          i,
          j,
          len1,
          post,
          ref3,
          ref4,
          ref5,
          rest,
          scope,
          spaced;
      fragments = [];
      post = [];
      ref3 = this.expressions;
      for (i = j = 0, len1 = ref3.length; j < len1; i = ++j) {
        exp = ref3[i];
        exp = exp.unwrap();
        if (!(exp instanceof Comment || exp instanceof Literal)) {
          break;
        }
      }
      o = merge(o, {level: LEVEL_TOP});
      if (i) {
        rest = this.expressions.splice(i, 9e9);
        ref4 = [this.spaced, false], spaced = ref4[0], this.spaced = ref4[1];
        ref5 = [this.compileNode(o), spaced], fragments = ref5[0], this.spaced = ref5[1];
        this.expressions = rest;
      }
      post = this.compileNode(o);
      scope = o.scope;
      if (scope.expressions === this) {
        declars = o.scope.hasDeclarations();
        assigns = scope.hasAssignments;
        if (declars || assigns) {
          if (i) {
            fragments.push(this.makeCode('\n'));
          }
          fragments.push(this.makeCode(this.tab + "var "));
          if (declars) {
            fragments.push(this.makeCode(scope.declaredVariables().join(', ')));
          }
          if (assigns) {
            if (declars) {
              fragments.push(this.makeCode(",\n" + (this.tab + TAB)));
            }
            fragments.push(this.makeCode(scope.assignedVariables().join(",\n" + (this.tab + TAB))));
          }
          fragments.push(this.makeCode(";\n" + (this.spaced ? '\n' : '')));
        } else if (fragments.length && post.length) {
          fragments.push(this.makeCode("\n"));
        }
      }
      return fragments.concat(post);
    };
    Block.wrap = function(nodes) {
      if (nodes.length === 1 && nodes[0] instanceof Block) {
        return nodes[0];
      }
      return new Block(nodes);
    };
    return Block;
  })(Base);
  exports.Literal = Literal = (function(superClass1) {
    extend1(Literal, superClass1);
    function Literal(value1) {
      this.value = value1;
    }
    Literal.prototype.isComplex = NO;
    Literal.prototype.assigns = function(name) {
      return name === this.value;
    };
    Literal.prototype.compileNode = function(o) {
      return [this.makeCode(this.value)];
    };
    Literal.prototype.toString = function() {
      return " " + (this.isStatement() ? Literal.__super__.toString.apply(this, arguments) : this.constructor.name) + ": " + this.value;
    };
    return Literal;
  })(Base);
  exports.NumberLiteral = NumberLiteral = (function(superClass1) {
    extend1(NumberLiteral, superClass1);
    function NumberLiteral() {
      return NumberLiteral.__super__.constructor.apply(this, arguments);
    }
    return NumberLiteral;
  })(Literal);
  exports.InfinityLiteral = InfinityLiteral = (function(superClass1) {
    extend1(InfinityLiteral, superClass1);
    function InfinityLiteral() {
      return InfinityLiteral.__super__.constructor.apply(this, arguments);
    }
    InfinityLiteral.prototype.compileNode = function() {
      return [this.makeCode('2e308')];
    };
    return InfinityLiteral;
  })(NumberLiteral);
  exports.NaNLiteral = NaNLiteral = (function(superClass1) {
    extend1(NaNLiteral, superClass1);
    function NaNLiteral() {
      NaNLiteral.__super__.constructor.call(this, 'NaN');
    }
    NaNLiteral.prototype.compileNode = function(o) {
      var code;
      code = [this.makeCode('0/0')];
      if (o.level >= LEVEL_OP) {
        return this.wrapInBraces(code);
      } else {
        return code;
      }
    };
    return NaNLiteral;
  })(NumberLiteral);
  exports.StringLiteral = StringLiteral = (function(superClass1) {
    extend1(StringLiteral, superClass1);
    function StringLiteral() {
      return StringLiteral.__super__.constructor.apply(this, arguments);
    }
    return StringLiteral;
  })(Literal);
  exports.RegexLiteral = RegexLiteral = (function(superClass1) {
    extend1(RegexLiteral, superClass1);
    function RegexLiteral() {
      return RegexLiteral.__super__.constructor.apply(this, arguments);
    }
    return RegexLiteral;
  })(Literal);
  exports.PassthroughLiteral = PassthroughLiteral = (function(superClass1) {
    extend1(PassthroughLiteral, superClass1);
    function PassthroughLiteral() {
      return PassthroughLiteral.__super__.constructor.apply(this, arguments);
    }
    return PassthroughLiteral;
  })(Literal);
  exports.IdentifierLiteral = IdentifierLiteral = (function(superClass1) {
    extend1(IdentifierLiteral, superClass1);
    function IdentifierLiteral() {
      return IdentifierLiteral.__super__.constructor.apply(this, arguments);
    }
    IdentifierLiteral.prototype.isAssignable = YES;
    return IdentifierLiteral;
  })(Literal);
  exports.PropertyName = PropertyName = (function(superClass1) {
    extend1(PropertyName, superClass1);
    function PropertyName() {
      return PropertyName.__super__.constructor.apply(this, arguments);
    }
    PropertyName.prototype.isAssignable = YES;
    return PropertyName;
  })(Literal);
  exports.StatementLiteral = StatementLiteral = (function(superClass1) {
    extend1(StatementLiteral, superClass1);
    function StatementLiteral() {
      return StatementLiteral.__super__.constructor.apply(this, arguments);
    }
    StatementLiteral.prototype.isStatement = YES;
    StatementLiteral.prototype.makeReturn = THIS;
    StatementLiteral.prototype.jumps = function(o) {
      if (this.value === 'break' && !((o != null ? o.loop : void 0) || (o != null ? o.block : void 0))) {
        return this;
      }
      if (this.value === 'continue' && !(o != null ? o.loop : void 0)) {
        return this;
      }
    };
    StatementLiteral.prototype.compileNode = function(o) {
      return [this.makeCode("" + this.tab + this.value + ";")];
    };
    return StatementLiteral;
  })(Literal);
  exports.ThisLiteral = ThisLiteral = (function(superClass1) {
    extend1(ThisLiteral, superClass1);
    function ThisLiteral() {
      ThisLiteral.__super__.constructor.call(this, 'this');
    }
    ThisLiteral.prototype.compileNode = function(o) {
      var code,
          ref3;
      code = ((ref3 = o.scope.method) != null ? ref3.bound : void 0) ? o.scope.method.context : this.value;
      return [this.makeCode(code)];
    };
    return ThisLiteral;
  })(Literal);
  exports.UndefinedLiteral = UndefinedLiteral = (function(superClass1) {
    extend1(UndefinedLiteral, superClass1);
    function UndefinedLiteral() {
      UndefinedLiteral.__super__.constructor.call(this, 'undefined');
    }
    UndefinedLiteral.prototype.compileNode = function(o) {
      return [this.makeCode(o.level >= LEVEL_ACCESS ? '(void 0)' : 'void 0')];
    };
    return UndefinedLiteral;
  })(Literal);
  exports.NullLiteral = NullLiteral = (function(superClass1) {
    extend1(NullLiteral, superClass1);
    function NullLiteral() {
      NullLiteral.__super__.constructor.call(this, 'null');
    }
    return NullLiteral;
  })(Literal);
  exports.BooleanLiteral = BooleanLiteral = (function(superClass1) {
    extend1(BooleanLiteral, superClass1);
    function BooleanLiteral() {
      return BooleanLiteral.__super__.constructor.apply(this, arguments);
    }
    return BooleanLiteral;
  })(Literal);
  exports.Return = Return = (function(superClass1) {
    extend1(Return, superClass1);
    function Return(expression) {
      this.expression = expression;
    }
    Return.prototype.children = ['expression'];
    Return.prototype.isStatement = YES;
    Return.prototype.makeReturn = THIS;
    Return.prototype.jumps = THIS;
    Return.prototype.compileToFragments = function(o, level) {
      var expr,
          ref3;
      expr = (ref3 = this.expression) != null ? ref3.makeReturn() : void 0;
      if (expr && !(expr instanceof Return)) {
        return expr.compileToFragments(o, level);
      } else {
        return Return.__super__.compileToFragments.call(this, o, level);
      }
    };
    Return.prototype.compileNode = function(o) {
      var answer;
      answer = [];
      answer.push(this.makeCode(this.tab + ("return" + (this.expression ? " " : ""))));
      if (this.expression) {
        answer = answer.concat(this.expression.compileToFragments(o, LEVEL_PAREN));
      }
      answer.push(this.makeCode(";"));
      return answer;
    };
    return Return;
  })(Base);
  exports.YieldReturn = YieldReturn = (function(superClass1) {
    extend1(YieldReturn, superClass1);
    function YieldReturn() {
      return YieldReturn.__super__.constructor.apply(this, arguments);
    }
    YieldReturn.prototype.compileNode = function(o) {
      if (o.scope.parent == null) {
        this.error('yield can only occur inside functions');
      }
      return YieldReturn.__super__.compileNode.apply(this, arguments);
    };
    return YieldReturn;
  })(Return);
  exports.Value = Value = (function(superClass1) {
    extend1(Value, superClass1);
    function Value(base, props, tag) {
      if (!props && base instanceof Value) {
        return base;
      }
      this.base = base;
      this.properties = props || [];
      if (tag) {
        this[tag] = true;
      }
      return this;
    }
    Value.prototype.children = ['base', 'properties'];
    Value.prototype.add = function(props) {
      this.properties = this.properties.concat(props);
      return this;
    };
    Value.prototype.hasProperties = function() {
      return !!this.properties.length;
    };
    Value.prototype.bareLiteral = function(type) {
      return !this.properties.length && this.base instanceof type;
    };
    Value.prototype.isArray = function() {
      return this.bareLiteral(Arr);
    };
    Value.prototype.isRange = function() {
      return this.bareLiteral(Range);
    };
    Value.prototype.isComplex = function() {
      return this.hasProperties() || this.base.isComplex();
    };
    Value.prototype.isAssignable = function() {
      return this.hasProperties() || this.base.isAssignable();
    };
    Value.prototype.isNumber = function() {
      return this.bareLiteral(NumberLiteral);
    };
    Value.prototype.isString = function() {
      return this.bareLiteral(StringLiteral);
    };
    Value.prototype.isRegex = function() {
      return this.bareLiteral(RegexLiteral);
    };
    Value.prototype.isUndefined = function() {
      return this.bareLiteral(UndefinedLiteral);
    };
    Value.prototype.isNull = function() {
      return this.bareLiteral(NullLiteral);
    };
    Value.prototype.isBoolean = function() {
      return this.bareLiteral(BooleanLiteral);
    };
    Value.prototype.isAtomic = function() {
      var j,
          len1,
          node,
          ref3;
      ref3 = this.properties.concat(this.base);
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        node = ref3[j];
        if (node.soak || node instanceof Call) {
          return false;
        }
      }
      return true;
    };
    Value.prototype.isNotCallable = function() {
      return this.isNumber() || this.isString() || this.isRegex() || this.isArray() || this.isRange() || this.isSplice() || this.isObject() || this.isUndefined() || this.isNull() || this.isBoolean();
    };
    Value.prototype.isStatement = function(o) {
      return !this.properties.length && this.base.isStatement(o);
    };
    Value.prototype.assigns = function(name) {
      return !this.properties.length && this.base.assigns(name);
    };
    Value.prototype.jumps = function(o) {
      return !this.properties.length && this.base.jumps(o);
    };
    Value.prototype.isObject = function(onlyGenerated) {
      if (this.properties.length) {
        return false;
      }
      return (this.base instanceof Obj) && (!onlyGenerated || this.base.generated);
    };
    Value.prototype.isSplice = function() {
      var lastProp,
          ref3;
      ref3 = this.properties, lastProp = ref3[ref3.length - 1];
      return lastProp instanceof Slice;
    };
    Value.prototype.looksStatic = function(className) {
      var ref3;
      return this.base.value === className && this.properties.length === 1 && ((ref3 = this.properties[0].name) != null ? ref3.value : void 0) !== 'prototype';
    };
    Value.prototype.unwrap = function() {
      if (this.properties.length) {
        return this;
      } else {
        return this.base;
      }
    };
    Value.prototype.cacheReference = function(o) {
      var base,
          bref,
          name,
          nref,
          ref3;
      ref3 = this.properties, name = ref3[ref3.length - 1];
      if (this.properties.length < 2 && !this.base.isComplex() && !(name != null ? name.isComplex() : void 0)) {
        return [this, this];
      }
      base = new Value(this.base, this.properties.slice(0, -1));
      if (base.isComplex()) {
        bref = new IdentifierLiteral(o.scope.freeVariable('base'));
        base = new Value(new Parens(new Assign(bref, base)));
      }
      if (!name) {
        return [base, bref];
      }
      if (name.isComplex()) {
        nref = new IdentifierLiteral(o.scope.freeVariable('name'));
        name = new Index(new Assign(nref, name.index));
        nref = new Index(nref);
      }
      return [base.add(name), new Value(bref || base.base, [nref || name])];
    };
    Value.prototype.compileNode = function(o) {
      var fragments,
          j,
          len1,
          prop,
          props;
      this.base.front = this.front;
      props = this.properties;
      fragments = this.base.compileToFragments(o, (props.length ? LEVEL_ACCESS : null));
      if (props.length && SIMPLENUM.test(fragmentsToText(fragments))) {
        fragments.push(this.makeCode('.'));
      }
      for (j = 0, len1 = props.length; j < len1; j++) {
        prop = props[j];
        fragments.push.apply(fragments, prop.compileToFragments(o));
      }
      return fragments;
    };
    Value.prototype.unfoldSoak = function(o) {
      return this.unfoldedSoak != null ? this.unfoldedSoak : this.unfoldedSoak = (function(_this) {
        return function() {
          var fst,
              i,
              ifn,
              j,
              len1,
              prop,
              ref,
              ref3,
              ref4,
              snd;
          if (ifn = _this.base.unfoldSoak(o)) {
            (ref3 = ifn.body.properties).push.apply(ref3, _this.properties);
            return ifn;
          }
          ref4 = _this.properties;
          for (i = j = 0, len1 = ref4.length; j < len1; i = ++j) {
            prop = ref4[i];
            if (!prop.soak) {
              continue;
            }
            prop.soak = false;
            fst = new Value(_this.base, _this.properties.slice(0, i));
            snd = new Value(_this.base, _this.properties.slice(i));
            if (fst.isComplex()) {
              ref = new IdentifierLiteral(o.scope.freeVariable('ref'));
              fst = new Parens(new Assign(ref, fst));
              snd.base = ref;
            }
            return new If(new Existence(fst), snd, {soak: true});
          }
          return false;
        };
      })(this)();
    };
    return Value;
  })(Base);
  exports.Comment = Comment = (function(superClass1) {
    extend1(Comment, superClass1);
    function Comment(comment1) {
      this.comment = comment1;
    }
    Comment.prototype.isStatement = YES;
    Comment.prototype.makeReturn = THIS;
    Comment.prototype.compileNode = function(o, level) {
      var code,
          comment;
      comment = this.comment.replace(/^(\s*)#(?=\s)/gm, "$1 *");
      code = "/*" + (multident(comment, this.tab)) + (indexOf.call(comment, '\n') >= 0 ? "\n" + this.tab : '') + " */";
      if ((level || o.level) === LEVEL_TOP) {
        code = o.indent + code;
      }
      return [this.makeCode("\n"), this.makeCode(code)];
    };
    return Comment;
  })(Base);
  exports.Call = Call = (function(superClass1) {
    extend1(Call, superClass1);
    function Call(variable1, args1, soak1) {
      this.variable = variable1;
      this.args = args1 != null ? args1 : [];
      this.soak = soak1;
      this.isNew = false;
      if (this.variable instanceof Value && this.variable.isNotCallable()) {
        this.variable.error("literal is not a function");
      }
    }
    Call.prototype.children = ['variable', 'args'];
    Call.prototype.updateLocationDataIfMissing = function(locationData) {
      var base,
          ref3;
      if (this.locationData && this.needsUpdatedStartLocation) {
        this.locationData.first_line = locationData.first_line;
        this.locationData.first_column = locationData.first_column;
        base = ((ref3 = this.variable) != null ? ref3.base : void 0) || this.variable;
        if (base.needsUpdatedStartLocation) {
          this.variable.locationData.first_line = locationData.first_line;
          this.variable.locationData.first_column = locationData.first_column;
          base.updateLocationDataIfMissing(locationData);
        }
        delete this.needsUpdatedStartLocation;
      }
      return Call.__super__.updateLocationDataIfMissing.apply(this, arguments);
    };
    Call.prototype.newInstance = function() {
      var base,
          ref3;
      base = ((ref3 = this.variable) != null ? ref3.base : void 0) || this.variable;
      if (base instanceof Call && !base.isNew) {
        base.newInstance();
      } else {
        this.isNew = true;
      }
      this.needsUpdatedStartLocation = true;
      return this;
    };
    Call.prototype.unfoldSoak = function(o) {
      var call,
          ifn,
          j,
          left,
          len1,
          list,
          ref3,
          ref4,
          rite;
      if (this.soak) {
        if (this instanceof SuperCall) {
          left = new Literal(this.superReference(o));
          rite = new Value(left);
        } else {
          if (ifn = unfoldSoak(o, this, 'variable')) {
            return ifn;
          }
          ref3 = new Value(this.variable).cacheReference(o), left = ref3[0], rite = ref3[1];
        }
        rite = new Call(rite, this.args);
        rite.isNew = this.isNew;
        left = new Literal("typeof " + (left.compile(o)) + " === \"function\"");
        return new If(left, new Value(rite), {soak: true});
      }
      call = this;
      list = [];
      while (true) {
        if (call.variable instanceof Call) {
          list.push(call);
          call = call.variable;
          continue;
        }
        if (!(call.variable instanceof Value)) {
          break;
        }
        list.push(call);
        if (!((call = call.variable.base) instanceof Call)) {
          break;
        }
      }
      ref4 = list.reverse();
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        call = ref4[j];
        if (ifn) {
          if (call.variable instanceof Call) {
            call.variable = ifn;
          } else {
            call.variable.base = ifn;
          }
        }
        ifn = unfoldSoak(o, call, 'variable');
      }
      return ifn;
    };
    Call.prototype.compileNode = function(o) {
      var arg,
          argIndex,
          compiledArgs,
          compiledArray,
          fragments,
          j,
          len1,
          preface,
          ref3,
          ref4;
      if ((ref3 = this.variable) != null) {
        ref3.front = this.front;
      }
      compiledArray = Splat.compileSplattedArray(o, this.args, true);
      if (compiledArray.length) {
        return this.compileSplat(o, compiledArray);
      }
      compiledArgs = [];
      ref4 = this.args;
      for (argIndex = j = 0, len1 = ref4.length; j < len1; argIndex = ++j) {
        arg = ref4[argIndex];
        if (argIndex) {
          compiledArgs.push(this.makeCode(", "));
        }
        compiledArgs.push.apply(compiledArgs, arg.compileToFragments(o, LEVEL_LIST));
      }
      fragments = [];
      if (this instanceof SuperCall) {
        preface = this.superReference(o) + (".call(" + (this.superThis(o)));
        if (compiledArgs.length) {
          preface += ", ";
        }
        fragments.push(this.makeCode(preface));
      } else {
        if (this.isNew) {
          fragments.push(this.makeCode('new '));
        }
        fragments.push.apply(fragments, this.variable.compileToFragments(o, LEVEL_ACCESS));
        fragments.push(this.makeCode("("));
      }
      fragments.push.apply(fragments, compiledArgs);
      fragments.push(this.makeCode(")"));
      return fragments;
    };
    Call.prototype.compileSplat = function(o, splatArgs) {
      var answer,
          base,
          fun,
          idt,
          name,
          ref;
      if (this instanceof SuperCall) {
        return [].concat(this.makeCode((this.superReference(o)) + ".apply(" + (this.superThis(o)) + ", "), splatArgs, this.makeCode(")"));
      }
      if (this.isNew) {
        idt = this.tab + TAB;
        return [].concat(this.makeCode("(function(func, args, ctor) {\n" + idt + "ctor.prototype = func.prototype;\n" + idt + "var child = new ctor, result = func.apply(child, args);\n" + idt + "return Object(result) === result ? result : child;\n" + this.tab + "})("), this.variable.compileToFragments(o, LEVEL_LIST), this.makeCode(", "), splatArgs, this.makeCode(", function(){})"));
      }
      answer = [];
      base = new Value(this.variable);
      if ((name = base.properties.pop()) && base.isComplex()) {
        ref = o.scope.freeVariable('ref');
        answer = answer.concat(this.makeCode("(" + ref + " = "), base.compileToFragments(o, LEVEL_LIST), this.makeCode(")"), name.compileToFragments(o));
      } else {
        fun = base.compileToFragments(o, LEVEL_ACCESS);
        if (SIMPLENUM.test(fragmentsToText(fun))) {
          fun = this.wrapInBraces(fun);
        }
        if (name) {
          ref = fragmentsToText(fun);
          fun.push.apply(fun, name.compileToFragments(o));
        } else {
          ref = 'null';
        }
        answer = answer.concat(fun);
      }
      return answer = answer.concat(this.makeCode(".apply(" + ref + ", "), splatArgs, this.makeCode(")"));
    };
    return Call;
  })(Base);
  exports.SuperCall = SuperCall = (function(superClass1) {
    extend1(SuperCall, superClass1);
    function SuperCall(args) {
      SuperCall.__super__.constructor.call(this, null, args != null ? args : [new Splat(new IdentifierLiteral('arguments'))]);
      this.isBare = args != null;
    }
    SuperCall.prototype.superReference = function(o) {
      var accesses,
          base,
          bref,
          klass,
          method,
          name,
          nref,
          variable;
      method = o.scope.namedMethod();
      if (method != null ? method.klass : void 0) {
        klass = method.klass, name = method.name, variable = method.variable;
        if (klass.isComplex()) {
          bref = new IdentifierLiteral(o.scope.parent.freeVariable('base'));
          base = new Value(new Parens(new Assign(bref, klass)));
          variable.base = base;
          variable.properties.splice(0, klass.properties.length);
        }
        if (name.isComplex() || (name instanceof Index && name.index.isAssignable())) {
          nref = new IdentifierLiteral(o.scope.parent.freeVariable('name'));
          name = new Index(new Assign(nref, name.index));
          variable.properties.pop();
          variable.properties.push(name);
        }
        accesses = [new Access(new PropertyName('__super__'))];
        if (method["static"]) {
          accesses.push(new Access(new PropertyName('constructor')));
        }
        accesses.push(nref != null ? new Index(nref) : name);
        return (new Value(bref != null ? bref : klass, accesses)).compile(o);
      } else if (method != null ? method.ctor : void 0) {
        return method.name + ".__super__.constructor";
      } else {
        return this.error('cannot call super outside of an instance method.');
      }
    };
    SuperCall.prototype.superThis = function(o) {
      var method;
      method = o.scope.method;
      return (method && !method.klass && method.context) || "this";
    };
    return SuperCall;
  })(Call);
  exports.RegexWithInterpolations = RegexWithInterpolations = (function(superClass1) {
    extend1(RegexWithInterpolations, superClass1);
    function RegexWithInterpolations(args) {
      if (args == null) {
        args = [];
      }
      RegexWithInterpolations.__super__.constructor.call(this, new Value(new IdentifierLiteral('RegExp')), args, false);
    }
    return RegexWithInterpolations;
  })(Call);
  exports.TaggedTemplateCall = TaggedTemplateCall = (function(superClass1) {
    extend1(TaggedTemplateCall, superClass1);
    function TaggedTemplateCall(variable, arg, soak) {
      if (arg instanceof StringLiteral) {
        arg = new StringWithInterpolations(Block.wrap([new Value(arg)]));
      }
      TaggedTemplateCall.__super__.constructor.call(this, variable, [arg], soak);
    }
    TaggedTemplateCall.prototype.compileNode = function(o) {
      o.inTaggedTemplateCall = true;
      return this.variable.compileToFragments(o, LEVEL_ACCESS).concat(this.args[0].compileToFragments(o, LEVEL_LIST));
    };
    return TaggedTemplateCall;
  })(Call);
  exports.Extends = Extends = (function(superClass1) {
    extend1(Extends, superClass1);
    function Extends(child1, parent1) {
      this.child = child1;
      this.parent = parent1;
    }
    Extends.prototype.children = ['child', 'parent'];
    Extends.prototype.compileToFragments = function(o) {
      return new Call(new Value(new Literal(utility('extend', o))), [this.child, this.parent]).compileToFragments(o);
    };
    return Extends;
  })(Base);
  exports.Access = Access = (function(superClass1) {
    extend1(Access, superClass1);
    function Access(name1, tag) {
      this.name = name1;
      this.soak = tag === 'soak';
    }
    Access.prototype.children = ['name'];
    Access.prototype.compileToFragments = function(o) {
      var name,
          node,
          ref3;
      name = this.name.compileToFragments(o);
      node = this.name.unwrap();
      if (node instanceof PropertyName) {
        if (ref3 = node.value, indexOf.call(JS_FORBIDDEN, ref3) >= 0) {
          return [this.makeCode('["')].concat(slice.call(name), [this.makeCode('"]')]);
        } else {
          return [this.makeCode('.')].concat(slice.call(name));
        }
      } else {
        return [this.makeCode('[')].concat(slice.call(name), [this.makeCode(']')]);
      }
    };
    Access.prototype.isComplex = NO;
    return Access;
  })(Base);
  exports.Index = Index = (function(superClass1) {
    extend1(Index, superClass1);
    function Index(index1) {
      this.index = index1;
    }
    Index.prototype.children = ['index'];
    Index.prototype.compileToFragments = function(o) {
      return [].concat(this.makeCode("["), this.index.compileToFragments(o, LEVEL_PAREN), this.makeCode("]"));
    };
    Index.prototype.isComplex = function() {
      return this.index.isComplex();
    };
    return Index;
  })(Base);
  exports.Range = Range = (function(superClass1) {
    extend1(Range, superClass1);
    Range.prototype.children = ['from', 'to'];
    function Range(from1, to1, tag) {
      this.from = from1;
      this.to = to1;
      this.exclusive = tag === 'exclusive';
      this.equals = this.exclusive ? '' : '=';
    }
    Range.prototype.compileVariables = function(o) {
      var isComplex,
          ref3,
          ref4,
          ref5,
          step;
      o = merge(o, {top: true});
      isComplex = del(o, 'isComplex');
      ref3 = this.cacheToCodeFragments(this.from.cache(o, LEVEL_LIST, isComplex)), this.fromC = ref3[0], this.fromVar = ref3[1];
      ref4 = this.cacheToCodeFragments(this.to.cache(o, LEVEL_LIST, isComplex)), this.toC = ref4[0], this.toVar = ref4[1];
      if (step = del(o, 'step')) {
        ref5 = this.cacheToCodeFragments(step.cache(o, LEVEL_LIST, isComplex)), this.step = ref5[0], this.stepVar = ref5[1];
      }
      this.fromNum = this.from.isNumber() ? Number(this.fromVar) : null;
      this.toNum = this.to.isNumber() ? Number(this.toVar) : null;
      return this.stepNum = (step != null ? step.isNumber() : void 0) ? Number(this.stepVar) : null;
    };
    Range.prototype.compileNode = function(o) {
      var cond,
          condPart,
          from,
          gt,
          idx,
          idxName,
          known,
          lt,
          namedIndex,
          ref3,
          ref4,
          stepPart,
          to,
          varPart;
      if (!this.fromVar) {
        this.compileVariables(o);
      }
      if (!o.index) {
        return this.compileArray(o);
      }
      known = (this.fromNum != null) && (this.toNum != null);
      idx = del(o, 'index');
      idxName = del(o, 'name');
      namedIndex = idxName && idxName !== idx;
      varPart = idx + " = " + this.fromC;
      if (this.toC !== this.toVar) {
        varPart += ", " + this.toC;
      }
      if (this.step !== this.stepVar) {
        varPart += ", " + this.step;
      }
      ref3 = [idx + " <" + this.equals, idx + " >" + this.equals], lt = ref3[0], gt = ref3[1];
      condPart = this.stepNum != null ? this.stepNum > 0 ? lt + " " + this.toVar : gt + " " + this.toVar : known ? ((ref4 = [this.fromNum, this.toNum], from = ref4[0], to = ref4[1], ref4), from <= to ? lt + " " + to : gt + " " + to) : (cond = this.stepVar ? this.stepVar + " > 0" : this.fromVar + " <= " + this.toVar, cond + " ? " + lt + " " + this.toVar + " : " + gt + " " + this.toVar);
      stepPart = this.stepVar ? idx + " += " + this.stepVar : known ? namedIndex ? from <= to ? "++" + idx : "--" + idx : from <= to ? idx + "++" : idx + "--" : namedIndex ? cond + " ? ++" + idx + " : --" + idx : cond + " ? " + idx + "++ : " + idx + "--";
      if (namedIndex) {
        varPart = idxName + " = " + varPart;
      }
      if (namedIndex) {
        stepPart = idxName + " = " + stepPart;
      }
      return [this.makeCode(varPart + "; " + condPart + "; " + stepPart)];
    };
    Range.prototype.compileArray = function(o) {
      var args,
          body,
          cond,
          hasArgs,
          i,
          idt,
          j,
          known,
          post,
          pre,
          range,
          ref3,
          ref4,
          result,
          results,
          vars;
      known = (this.fromNum != null) && (this.toNum != null);
      if (known && Math.abs(this.fromNum - this.toNum) <= 20) {
        range = (function() {
          results = [];
          for (var j = ref3 = this.fromNum,
              ref4 = this.toNum; ref3 <= ref4 ? j <= ref4 : j >= ref4; ref3 <= ref4 ? j++ : j--) {
            results.push(j);
          }
          return results;
        }).apply(this);
        if (this.exclusive) {
          range.pop();
        }
        return [this.makeCode("[" + (range.join(', ')) + "]")];
      }
      idt = this.tab + TAB;
      i = o.scope.freeVariable('i', {single: true});
      result = o.scope.freeVariable('results');
      pre = "\n" + idt + result + " = [];";
      if (known) {
        o.index = i;
        body = fragmentsToText(this.compileNode(o));
      } else {
        vars = (i + " = " + this.fromC) + (this.toC !== this.toVar ? ", " + this.toC : '');
        cond = this.fromVar + " <= " + this.toVar;
        body = "var " + vars + "; " + cond + " ? " + i + " <" + this.equals + " " + this.toVar + " : " + i + " >" + this.equals + " " + this.toVar + "; " + cond + " ? " + i + "++ : " + i + "--";
      }
      post = "{ " + result + ".push(" + i + "); }\n" + idt + "return " + result + ";\n" + o.indent;
      hasArgs = function(node) {
        return node != null ? node.contains(isLiteralArguments) : void 0;
      };
      if (hasArgs(this.from) || hasArgs(this.to)) {
        args = ', arguments';
      }
      return [this.makeCode("(function() {" + pre + "\n" + idt + "for (" + body + ")" + post + "}).apply(this" + (args != null ? args : '') + ")")];
    };
    return Range;
  })(Base);
  exports.Slice = Slice = (function(superClass1) {
    extend1(Slice, superClass1);
    Slice.prototype.children = ['range'];
    function Slice(range1) {
      this.range = range1;
      Slice.__super__.constructor.call(this);
    }
    Slice.prototype.compileNode = function(o) {
      var compiled,
          compiledText,
          from,
          fromCompiled,
          ref3,
          to,
          toStr;
      ref3 = this.range, to = ref3.to, from = ref3.from;
      fromCompiled = from && from.compileToFragments(o, LEVEL_PAREN) || [this.makeCode('0')];
      if (to) {
        compiled = to.compileToFragments(o, LEVEL_PAREN);
        compiledText = fragmentsToText(compiled);
        if (!(!this.range.exclusive && +compiledText === -1)) {
          toStr = ', ' + (this.range.exclusive ? compiledText : to.isNumber() ? "" + (+compiledText + 1) : (compiled = to.compileToFragments(o, LEVEL_ACCESS), "+" + (fragmentsToText(compiled)) + " + 1 || 9e9"));
        }
      }
      return [this.makeCode(".slice(" + (fragmentsToText(fromCompiled)) + (toStr || '') + ")")];
    };
    return Slice;
  })(Base);
  exports.Obj = Obj = (function(superClass1) {
    extend1(Obj, superClass1);
    function Obj(props, generated) {
      this.generated = generated != null ? generated : false;
      this.objects = this.properties = props || [];
    }
    Obj.prototype.children = ['properties'];
    Obj.prototype.compileNode = function(o) {
      var answer,
          dynamicIndex,
          hasDynamic,
          i,
          idt,
          indent,
          j,
          join,
          k,
          key,
          l,
          lastNoncom,
          len1,
          len2,
          len3,
          node,
          oref,
          prop,
          props,
          ref3,
          value;
      props = this.properties;
      if (this.generated) {
        for (j = 0, len1 = props.length; j < len1; j++) {
          node = props[j];
          if (node instanceof Value) {
            node.error('cannot have an implicit value in an implicit object');
          }
        }
      }
      for (dynamicIndex = k = 0, len2 = props.length; k < len2; dynamicIndex = ++k) {
        prop = props[dynamicIndex];
        if ((prop.variable || prop).base instanceof Parens) {
          break;
        }
      }
      hasDynamic = dynamicIndex < props.length;
      idt = o.indent += TAB;
      lastNoncom = this.lastNonComment(this.properties);
      answer = [];
      if (hasDynamic) {
        oref = o.scope.freeVariable('obj');
        answer.push(this.makeCode("(\n" + idt + oref + " = "));
      }
      answer.push(this.makeCode("{" + (props.length === 0 || dynamicIndex === 0 ? '}' : '\n')));
      for (i = l = 0, len3 = props.length; l < len3; i = ++l) {
        prop = props[i];
        if (i === dynamicIndex) {
          if (i !== 0) {
            answer.push(this.makeCode("\n" + idt + "}"));
          }
          answer.push(this.makeCode(',\n'));
        }
        join = i === props.length - 1 || i === dynamicIndex - 1 ? '' : prop === lastNoncom || prop instanceof Comment ? '\n' : ',\n';
        indent = prop instanceof Comment ? '' : idt;
        if (hasDynamic && i < dynamicIndex) {
          indent += TAB;
        }
        if (prop instanceof Assign) {
          if (prop.context !== 'object') {
            prop.operatorToken.error("unexpected " + prop.operatorToken.value);
          }
          if (prop.variable instanceof Value && prop.variable.hasProperties()) {
            prop.variable.error('invalid object key');
          }
        }
        if (prop instanceof Value && prop["this"]) {
          prop = new Assign(prop.properties[0].name, prop, 'object');
        }
        if (!(prop instanceof Comment)) {
          if (i < dynamicIndex) {
            if (!(prop instanceof Assign)) {
              prop = new Assign(prop, prop, 'object');
            }
          } else {
            if (prop instanceof Assign) {
              key = prop.variable;
              value = prop.value;
            } else {
              ref3 = prop.base.cache(o), key = ref3[0], value = ref3[1];
              if (key instanceof IdentifierLiteral) {
                key = new PropertyName(key.value);
              }
            }
            prop = new Assign(new Value(new IdentifierLiteral(oref), [new Access(key)]), value);
          }
        }
        if (indent) {
          answer.push(this.makeCode(indent));
        }
        answer.push.apply(answer, prop.compileToFragments(o, LEVEL_TOP));
        if (join) {
          answer.push(this.makeCode(join));
        }
      }
      if (hasDynamic) {
        answer.push(this.makeCode(",\n" + idt + oref + "\n" + this.tab + ")"));
      } else {
        if (props.length !== 0) {
          answer.push(this.makeCode("\n" + this.tab + "}"));
        }
      }
      if (this.front && !hasDynamic) {
        return this.wrapInBraces(answer);
      } else {
        return answer;
      }
    };
    Obj.prototype.assigns = function(name) {
      var j,
          len1,
          prop,
          ref3;
      ref3 = this.properties;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        prop = ref3[j];
        if (prop.assigns(name)) {
          return true;
        }
      }
      return false;
    };
    return Obj;
  })(Base);
  exports.Arr = Arr = (function(superClass1) {
    extend1(Arr, superClass1);
    function Arr(objs) {
      this.objects = objs || [];
    }
    Arr.prototype.children = ['objects'];
    Arr.prototype.compileNode = function(o) {
      var answer,
          compiledObjs,
          fragments,
          index,
          j,
          len1,
          obj;
      if (!this.objects.length) {
        return [this.makeCode('[]')];
      }
      o.indent += TAB;
      answer = Splat.compileSplattedArray(o, this.objects);
      if (answer.length) {
        return answer;
      }
      answer = [];
      compiledObjs = (function() {
        var j,
            len1,
            ref3,
            results;
        ref3 = this.objects;
        results = [];
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          obj = ref3[j];
          results.push(obj.compileToFragments(o, LEVEL_LIST));
        }
        return results;
      }).call(this);
      for (index = j = 0, len1 = compiledObjs.length; j < len1; index = ++j) {
        fragments = compiledObjs[index];
        if (index) {
          answer.push(this.makeCode(", "));
        }
        answer.push.apply(answer, fragments);
      }
      if (fragmentsToText(answer).indexOf('\n') >= 0) {
        answer.unshift(this.makeCode("[\n" + o.indent));
        answer.push(this.makeCode("\n" + this.tab + "]"));
      } else {
        answer.unshift(this.makeCode("["));
        answer.push(this.makeCode("]"));
      }
      return answer;
    };
    Arr.prototype.assigns = function(name) {
      var j,
          len1,
          obj,
          ref3;
      ref3 = this.objects;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        obj = ref3[j];
        if (obj.assigns(name)) {
          return true;
        }
      }
      return false;
    };
    return Arr;
  })(Base);
  exports.Class = Class = (function(superClass1) {
    extend1(Class, superClass1);
    function Class(variable1, parent1, body1) {
      this.variable = variable1;
      this.parent = parent1;
      this.body = body1 != null ? body1 : new Block;
      this.boundFuncs = [];
      this.body.classBody = true;
    }
    Class.prototype.children = ['variable', 'parent', 'body'];
    Class.prototype.defaultClassVariableName = '_Class';
    Class.prototype.determineName = function() {
      var message,
          name,
          node,
          ref3,
          tail;
      if (!this.variable) {
        return this.defaultClassVariableName;
      }
      ref3 = this.variable.properties, tail = ref3[ref3.length - 1];
      node = tail ? tail instanceof Access && tail.name : this.variable.base;
      if (!(node instanceof IdentifierLiteral || node instanceof PropertyName)) {
        return this.defaultClassVariableName;
      }
      name = node.value;
      if (!tail) {
        message = isUnassignable(name);
        if (message) {
          this.variable.error(message);
        }
      }
      if (indexOf.call(JS_FORBIDDEN, name) >= 0) {
        return "_" + name;
      } else {
        return name;
      }
    };
    Class.prototype.setContext = function(name) {
      return this.body.traverseChildren(false, function(node) {
        if (node.classBody) {
          return false;
        }
        if (node instanceof ThisLiteral) {
          return node.value = name;
        } else if (node instanceof Code) {
          if (node.bound) {
            return node.context = name;
          }
        }
      });
    };
    Class.prototype.addBoundFunctions = function(o) {
      var bvar,
          j,
          len1,
          lhs,
          ref3;
      ref3 = this.boundFuncs;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        bvar = ref3[j];
        lhs = (new Value(new ThisLiteral, [new Access(bvar)])).compile(o);
        this.ctor.body.unshift(new Literal(lhs + " = " + (utility('bind', o)) + "(" + lhs + ", this)"));
      }
    };
    Class.prototype.addProperties = function(node, name, o) {
      var acc,
          assign,
          base,
          exprs,
          func,
          props;
      props = node.base.properties.slice(0);
      exprs = (function() {
        var results;
        results = [];
        while (assign = props.shift()) {
          if (assign instanceof Assign) {
            base = assign.variable.base;
            delete assign.context;
            func = assign.value;
            if (base.value === 'constructor') {
              if (this.ctor) {
                assign.error('cannot define more than one constructor in a class');
              }
              if (func.bound) {
                assign.error('cannot define a constructor as a bound function');
              }
              if (func instanceof Code) {
                assign = this.ctor = func;
              } else {
                this.externalCtor = o.classScope.freeVariable('ctor');
                assign = new Assign(new IdentifierLiteral(this.externalCtor), func);
              }
            } else {
              if (assign.variable["this"]) {
                func["static"] = true;
              } else {
                acc = base.isComplex() ? new Index(base) : new Access(base);
                assign.variable = new Value(new IdentifierLiteral(name), [new Access(new PropertyName('prototype')), acc]);
                if (func instanceof Code && func.bound) {
                  this.boundFuncs.push(base);
                  func.bound = false;
                }
              }
            }
          }
          results.push(assign);
        }
        return results;
      }).call(this);
      return compact(exprs);
    };
    Class.prototype.walkBody = function(name, o) {
      return this.traverseChildren(false, (function(_this) {
        return function(child) {
          var cont,
              exps,
              i,
              j,
              len1,
              node,
              ref3;
          cont = true;
          if (child instanceof Class) {
            return false;
          }
          if (child instanceof Block) {
            ref3 = exps = child.expressions;
            for (i = j = 0, len1 = ref3.length; j < len1; i = ++j) {
              node = ref3[i];
              if (node instanceof Assign && node.variable.looksStatic(name)) {
                node.value["static"] = true;
              } else if (node instanceof Value && node.isObject(true)) {
                cont = false;
                exps[i] = _this.addProperties(node, name, o);
              }
            }
            child.expressions = exps = flatten(exps);
          }
          return cont && !(child instanceof Class);
        };
      })(this));
    };
    Class.prototype.hoistDirectivePrologue = function() {
      var expressions,
          index,
          node;
      index = 0;
      expressions = this.body.expressions;
      while ((node = expressions[index]) && node instanceof Comment || node instanceof Value && node.isString()) {
        ++index;
      }
      return this.directives = expressions.splice(0, index);
    };
    Class.prototype.ensureConstructor = function(name) {
      if (!this.ctor) {
        this.ctor = new Code;
        if (this.externalCtor) {
          this.ctor.body.push(new Literal(this.externalCtor + ".apply(this, arguments)"));
        } else if (this.parent) {
          this.ctor.body.push(new Literal(name + ".__super__.constructor.apply(this, arguments)"));
        }
        this.ctor.body.makeReturn();
        this.body.expressions.unshift(this.ctor);
      }
      this.ctor.ctor = this.ctor.name = name;
      this.ctor.klass = null;
      return this.ctor.noReturn = true;
    };
    Class.prototype.compileNode = function(o) {
      var args,
          argumentsNode,
          func,
          jumpNode,
          klass,
          lname,
          name,
          ref3,
          superClass;
      if (jumpNode = this.body.jumps()) {
        jumpNode.error('Class bodies cannot contain pure statements');
      }
      if (argumentsNode = this.body.contains(isLiteralArguments)) {
        argumentsNode.error("Class bodies shouldn't reference arguments");
      }
      name = this.determineName();
      lname = new IdentifierLiteral(name);
      func = new Code([], Block.wrap([this.body]));
      args = [];
      o.classScope = func.makeScope(o.scope);
      this.hoistDirectivePrologue();
      this.setContext(name);
      this.walkBody(name, o);
      this.ensureConstructor(name);
      this.addBoundFunctions(o);
      this.body.spaced = true;
      this.body.expressions.push(lname);
      if (this.parent) {
        superClass = new IdentifierLiteral(o.classScope.freeVariable('superClass', {reserve: false}));
        this.body.expressions.unshift(new Extends(lname, superClass));
        func.params.push(new Param(superClass));
        args.push(this.parent);
      }
      (ref3 = this.body.expressions).unshift.apply(ref3, this.directives);
      klass = new Parens(new Call(func, args));
      if (this.variable) {
        klass = new Assign(this.variable, klass, null, {moduleDeclaration: this.moduleDeclaration});
      }
      return klass.compileToFragments(o);
    };
    return Class;
  })(Base);
  exports.ModuleDeclaration = ModuleDeclaration = (function(superClass1) {
    extend1(ModuleDeclaration, superClass1);
    function ModuleDeclaration(clause, source1) {
      this.clause = clause;
      this.source = source1;
      this.checkSource();
    }
    ModuleDeclaration.prototype.children = ['clause', 'source'];
    ModuleDeclaration.prototype.isStatement = YES;
    ModuleDeclaration.prototype.jumps = THIS;
    ModuleDeclaration.prototype.makeReturn = THIS;
    ModuleDeclaration.prototype.checkSource = function() {
      if ((this.source != null) && this.source instanceof StringWithInterpolations) {
        return this.source.error('the name of the module to be imported from must be an uninterpolated string');
      }
    };
    ModuleDeclaration.prototype.checkScope = function(o, moduleDeclarationType) {
      if (o.indent.length !== 0) {
        return this.error(moduleDeclarationType + " statements must be at top-level scope");
      }
    };
    return ModuleDeclaration;
  })(Base);
  exports.ImportDeclaration = ImportDeclaration = (function(superClass1) {
    extend1(ImportDeclaration, superClass1);
    function ImportDeclaration() {
      return ImportDeclaration.__super__.constructor.apply(this, arguments);
    }
    ImportDeclaration.prototype.compileNode = function(o) {
      var code,
          ref3;
      this.checkScope(o, 'import');
      o.importedSymbols = [];
      code = [];
      code.push(this.makeCode(this.tab + "import "));
      if (this.clause != null) {
        code.push.apply(code, this.clause.compileNode(o));
      }
      if (((ref3 = this.source) != null ? ref3.value : void 0) != null) {
        if (this.clause !== null) {
          code.push(this.makeCode(' from '));
        }
        code.push(this.makeCode(this.source.value));
      }
      code.push(this.makeCode(';'));
      return code;
    };
    return ImportDeclaration;
  })(ModuleDeclaration);
  exports.ImportClause = ImportClause = (function(superClass1) {
    extend1(ImportClause, superClass1);
    function ImportClause(defaultBinding, namedImports) {
      this.defaultBinding = defaultBinding;
      this.namedImports = namedImports;
    }
    ImportClause.prototype.children = ['defaultBinding', 'namedImports'];
    ImportClause.prototype.compileNode = function(o) {
      var code;
      code = [];
      if (this.defaultBinding != null) {
        code.push.apply(code, this.defaultBinding.compileNode(o));
        if (this.namedImports != null) {
          code.push(this.makeCode(', '));
        }
      }
      if (this.namedImports != null) {
        code.push.apply(code, this.namedImports.compileNode(o));
      }
      return code;
    };
    return ImportClause;
  })(Base);
  exports.ExportDeclaration = ExportDeclaration = (function(superClass1) {
    extend1(ExportDeclaration, superClass1);
    function ExportDeclaration() {
      return ExportDeclaration.__super__.constructor.apply(this, arguments);
    }
    ExportDeclaration.prototype.compileNode = function(o) {
      var code,
          ref3;
      this.checkScope(o, 'export');
      code = [];
      code.push(this.makeCode(this.tab + "export "));
      if (this instanceof ExportDefaultDeclaration) {
        code.push(this.makeCode('default '));
      }
      if (!(this instanceof ExportDefaultDeclaration) && (this.clause instanceof Assign || this.clause instanceof Class)) {
        if (this.clause instanceof Class && !this.clause.variable) {
          this.clause.error('anonymous classes cannot be exported');
        }
        code.push(this.makeCode('var '));
        this.clause.moduleDeclaration = 'export';
      }
      if ((this.clause.body != null) && this.clause.body instanceof Block) {
        code = code.concat(this.clause.compileToFragments(o, LEVEL_TOP));
      } else {
        code = code.concat(this.clause.compileNode(o));
      }
      if (((ref3 = this.source) != null ? ref3.value : void 0) != null) {
        code.push(this.makeCode(" from " + this.source.value));
      }
      code.push(this.makeCode(';'));
      return code;
    };
    return ExportDeclaration;
  })(ModuleDeclaration);
  exports.ExportNamedDeclaration = ExportNamedDeclaration = (function(superClass1) {
    extend1(ExportNamedDeclaration, superClass1);
    function ExportNamedDeclaration() {
      return ExportNamedDeclaration.__super__.constructor.apply(this, arguments);
    }
    return ExportNamedDeclaration;
  })(ExportDeclaration);
  exports.ExportDefaultDeclaration = ExportDefaultDeclaration = (function(superClass1) {
    extend1(ExportDefaultDeclaration, superClass1);
    function ExportDefaultDeclaration() {
      return ExportDefaultDeclaration.__super__.constructor.apply(this, arguments);
    }
    return ExportDefaultDeclaration;
  })(ExportDeclaration);
  exports.ExportAllDeclaration = ExportAllDeclaration = (function(superClass1) {
    extend1(ExportAllDeclaration, superClass1);
    function ExportAllDeclaration() {
      return ExportAllDeclaration.__super__.constructor.apply(this, arguments);
    }
    return ExportAllDeclaration;
  })(ExportDeclaration);
  exports.ModuleSpecifierList = ModuleSpecifierList = (function(superClass1) {
    extend1(ModuleSpecifierList, superClass1);
    function ModuleSpecifierList(specifiers) {
      this.specifiers = specifiers;
    }
    ModuleSpecifierList.prototype.children = ['specifiers'];
    ModuleSpecifierList.prototype.compileNode = function(o) {
      var code,
          compiledList,
          fragments,
          index,
          j,
          len1,
          specifier;
      code = [];
      o.indent += TAB;
      compiledList = (function() {
        var j,
            len1,
            ref3,
            results;
        ref3 = this.specifiers;
        results = [];
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          specifier = ref3[j];
          results.push(specifier.compileToFragments(o, LEVEL_LIST));
        }
        return results;
      }).call(this);
      if (this.specifiers.length !== 0) {
        code.push(this.makeCode("{\n" + o.indent));
        for (index = j = 0, len1 = compiledList.length; j < len1; index = ++j) {
          fragments = compiledList[index];
          if (index) {
            code.push(this.makeCode(",\n" + o.indent));
          }
          code.push.apply(code, fragments);
        }
        code.push(this.makeCode("\n}"));
      } else {
        code.push(this.makeCode('{}'));
      }
      return code;
    };
    return ModuleSpecifierList;
  })(Base);
  exports.ImportSpecifierList = ImportSpecifierList = (function(superClass1) {
    extend1(ImportSpecifierList, superClass1);
    function ImportSpecifierList() {
      return ImportSpecifierList.__super__.constructor.apply(this, arguments);
    }
    return ImportSpecifierList;
  })(ModuleSpecifierList);
  exports.ExportSpecifierList = ExportSpecifierList = (function(superClass1) {
    extend1(ExportSpecifierList, superClass1);
    function ExportSpecifierList() {
      return ExportSpecifierList.__super__.constructor.apply(this, arguments);
    }
    return ExportSpecifierList;
  })(ModuleSpecifierList);
  exports.ModuleSpecifier = ModuleSpecifier = (function(superClass1) {
    extend1(ModuleSpecifier, superClass1);
    function ModuleSpecifier(original, alias, moduleDeclarationType1) {
      this.original = original;
      this.alias = alias;
      this.moduleDeclarationType = moduleDeclarationType1;
      this.identifier = this.alias != null ? this.alias.value : this.original.value;
    }
    ModuleSpecifier.prototype.children = ['original', 'alias'];
    ModuleSpecifier.prototype.compileNode = function(o) {
      var code;
      o.scope.find(this.identifier, this.moduleDeclarationType);
      code = [];
      code.push(this.makeCode(this.original.value));
      if (this.alias != null) {
        code.push(this.makeCode(" as " + this.alias.value));
      }
      return code;
    };
    return ModuleSpecifier;
  })(Base);
  exports.ImportSpecifier = ImportSpecifier = (function(superClass1) {
    extend1(ImportSpecifier, superClass1);
    function ImportSpecifier(imported, local) {
      ImportSpecifier.__super__.constructor.call(this, imported, local, 'import');
    }
    ImportSpecifier.prototype.compileNode = function(o) {
      var ref3;
      if ((ref3 = this.identifier, indexOf.call(o.importedSymbols, ref3) >= 0) || o.scope.check(this.identifier)) {
        this.error("'" + this.identifier + "' has already been declared");
      } else {
        o.importedSymbols.push(this.identifier);
      }
      return ImportSpecifier.__super__.compileNode.call(this, o);
    };
    return ImportSpecifier;
  })(ModuleSpecifier);
  exports.ImportDefaultSpecifier = ImportDefaultSpecifier = (function(superClass1) {
    extend1(ImportDefaultSpecifier, superClass1);
    function ImportDefaultSpecifier() {
      return ImportDefaultSpecifier.__super__.constructor.apply(this, arguments);
    }
    return ImportDefaultSpecifier;
  })(ImportSpecifier);
  exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier = (function(superClass1) {
    extend1(ImportNamespaceSpecifier, superClass1);
    function ImportNamespaceSpecifier() {
      return ImportNamespaceSpecifier.__super__.constructor.apply(this, arguments);
    }
    return ImportNamespaceSpecifier;
  })(ImportSpecifier);
  exports.ExportSpecifier = ExportSpecifier = (function(superClass1) {
    extend1(ExportSpecifier, superClass1);
    function ExportSpecifier(local, exported) {
      ExportSpecifier.__super__.constructor.call(this, local, exported, 'export');
    }
    return ExportSpecifier;
  })(ModuleSpecifier);
  exports.Assign = Assign = (function(superClass1) {
    extend1(Assign, superClass1);
    function Assign(variable1, value1, context, options) {
      this.variable = variable1;
      this.value = value1;
      this.context = context;
      if (options == null) {
        options = {};
      }
      this.param = options.param, this.subpattern = options.subpattern, this.operatorToken = options.operatorToken, this.moduleDeclaration = options.moduleDeclaration;
    }
    Assign.prototype.children = ['variable', 'value'];
    Assign.prototype.isStatement = function(o) {
      return (o != null ? o.level : void 0) === LEVEL_TOP && (this.context != null) && (this.moduleDeclaration || indexOf.call(this.context, "?") >= 0);
    };
    Assign.prototype.checkAssignability = function(o, varBase) {
      if (Object.prototype.hasOwnProperty.call(o.scope.positions, varBase.value) && o.scope.variables[o.scope.positions[varBase.value]].type === 'import') {
        return varBase.error("'" + varBase.value + "' is read-only");
      }
    };
    Assign.prototype.assigns = function(name) {
      return this[this.context === 'object' ? 'value' : 'variable'].assigns(name);
    };
    Assign.prototype.unfoldSoak = function(o) {
      return unfoldSoak(o, this, 'variable');
    };
    Assign.prototype.compileNode = function(o) {
      var answer,
          compiledName,
          isValue,
          j,
          name,
          properties,
          prototype,
          ref3,
          ref4,
          ref5,
          ref6,
          ref7,
          ref8,
          val,
          varBase;
      if (isValue = this.variable instanceof Value) {
        if (this.variable.isArray() || this.variable.isObject()) {
          return this.compilePatternMatch(o);
        }
        if (this.variable.isSplice()) {
          return this.compileSplice(o);
        }
        if ((ref3 = this.context) === '||=' || ref3 === '&&=' || ref3 === '?=') {
          return this.compileConditional(o);
        }
        if ((ref4 = this.context) === '**=' || ref4 === '//=' || ref4 === '%%=') {
          return this.compileSpecialMath(o);
        }
      }
      if (this.value instanceof Code) {
        if (this.value["static"]) {
          this.value.klass = this.variable.base;
          this.value.name = this.variable.properties[0];
          this.value.variable = this.variable;
        } else if (((ref5 = this.variable.properties) != null ? ref5.length : void 0) >= 2) {
          ref6 = this.variable.properties, properties = 3 <= ref6.length ? slice.call(ref6, 0, j = ref6.length - 2) : (j = 0, []), prototype = ref6[j++], name = ref6[j++];
          if (((ref7 = prototype.name) != null ? ref7.value : void 0) === 'prototype') {
            this.value.klass = new Value(this.variable.base, properties);
            this.value.name = name;
            this.value.variable = this.variable;
          }
        }
      }
      if (!this.context) {
        varBase = this.variable.unwrapAll();
        if (!varBase.isAssignable()) {
          this.variable.error("'" + (this.variable.compile(o)) + "' can't be assigned");
        }
        if (!(typeof varBase.hasProperties === "function" ? varBase.hasProperties() : void 0)) {
          if (this.moduleDeclaration) {
            this.checkAssignability(o, varBase);
            o.scope.add(varBase.value, this.moduleDeclaration);
          } else if (this.param) {
            o.scope.add(varBase.value, 'var');
          } else {
            this.checkAssignability(o, varBase);
            o.scope.find(varBase.value);
          }
        }
      }
      val = this.value.compileToFragments(o, LEVEL_LIST);
      if (isValue && this.variable.base instanceof Obj) {
        this.variable.front = true;
      }
      compiledName = this.variable.compileToFragments(o, LEVEL_LIST);
      if (this.context === 'object') {
        if (ref8 = fragmentsToText(compiledName), indexOf.call(JS_FORBIDDEN, ref8) >= 0) {
          compiledName.unshift(this.makeCode('"'));
          compiledName.push(this.makeCode('"'));
        }
        return compiledName.concat(this.makeCode(": "), val);
      }
      answer = compiledName.concat(this.makeCode(" " + (this.context || '=') + " "), val);
      if (o.level <= LEVEL_LIST) {
        return answer;
      } else {
        return this.wrapInBraces(answer);
      }
    };
    Assign.prototype.compilePatternMatch = function(o) {
      var acc,
          assigns,
          code,
          defaultValue,
          expandedIdx,
          fragments,
          i,
          idx,
          isObject,
          ivar,
          j,
          len1,
          message,
          name,
          obj,
          objects,
          olen,
          ref,
          ref3,
          ref4,
          ref5,
          ref6,
          rest,
          top,
          val,
          value,
          vvar,
          vvarText;
      top = o.level === LEVEL_TOP;
      value = this.value;
      objects = this.variable.base.objects;
      if (!(olen = objects.length)) {
        code = value.compileToFragments(o);
        if (o.level >= LEVEL_OP) {
          return this.wrapInBraces(code);
        } else {
          return code;
        }
      }
      obj = objects[0];
      if (olen === 1 && obj instanceof Expansion) {
        obj.error('Destructuring assignment has no target');
      }
      isObject = this.variable.isObject();
      if (top && olen === 1 && !(obj instanceof Splat)) {
        defaultValue = null;
        if (obj instanceof Assign && obj.context === 'object') {
          ref3 = obj, (ref4 = ref3.variable, idx = ref4.base), obj = ref3.value;
          if (obj instanceof Assign) {
            defaultValue = obj.value;
            obj = obj.variable;
          }
        } else {
          if (obj instanceof Assign) {
            defaultValue = obj.value;
            obj = obj.variable;
          }
          idx = isObject ? obj["this"] ? obj.properties[0].name : new PropertyName(obj.unwrap().value) : new NumberLiteral(0);
        }
        acc = idx.unwrap() instanceof PropertyName;
        value = new Value(value);
        value.properties.push(new (acc ? Access : Index)(idx));
        message = isUnassignable(obj.unwrap().value);
        if (message) {
          obj.error(message);
        }
        if (defaultValue) {
          value = new Op('?', value, defaultValue);
        }
        return new Assign(obj, value, null, {param: this.param}).compileToFragments(o, LEVEL_TOP);
      }
      vvar = value.compileToFragments(o, LEVEL_LIST);
      vvarText = fragmentsToText(vvar);
      assigns = [];
      expandedIdx = false;
      if (!(value.unwrap() instanceof IdentifierLiteral) || this.variable.assigns(vvarText)) {
        assigns.push([this.makeCode((ref = o.scope.freeVariable('ref')) + " = ")].concat(slice.call(vvar)));
        vvar = [this.makeCode(ref)];
        vvarText = ref;
      }
      for (i = j = 0, len1 = objects.length; j < len1; i = ++j) {
        obj = objects[i];
        idx = i;
        if (!expandedIdx && obj instanceof Splat) {
          name = obj.name.unwrap().value;
          obj = obj.unwrap();
          val = olen + " <= " + vvarText + ".length ? " + (utility('slice', o)) + ".call(" + vvarText + ", " + i;
          if (rest = olen - i - 1) {
            ivar = o.scope.freeVariable('i', {single: true});
            val += ", " + ivar + " = " + vvarText + ".length - " + rest + ") : (" + ivar + " = " + i + ", [])";
          } else {
            val += ") : []";
          }
          val = new Literal(val);
          expandedIdx = ivar + "++";
        } else if (!expandedIdx && obj instanceof Expansion) {
          if (rest = olen - i - 1) {
            if (rest === 1) {
              expandedIdx = vvarText + ".length - 1";
            } else {
              ivar = o.scope.freeVariable('i', {single: true});
              val = new Literal(ivar + " = " + vvarText + ".length - " + rest);
              expandedIdx = ivar + "++";
              assigns.push(val.compileToFragments(o, LEVEL_LIST));
            }
          }
          continue;
        } else {
          if (obj instanceof Splat || obj instanceof Expansion) {
            obj.error("multiple splats/expansions are disallowed in an assignment");
          }
          defaultValue = null;
          if (obj instanceof Assign && obj.context === 'object') {
            ref5 = obj, (ref6 = ref5.variable, idx = ref6.base), obj = ref5.value;
            if (obj instanceof Assign) {
              defaultValue = obj.value;
              obj = obj.variable;
            }
          } else {
            if (obj instanceof Assign) {
              defaultValue = obj.value;
              obj = obj.variable;
            }
            idx = isObject ? obj["this"] ? obj.properties[0].name : new PropertyName(obj.unwrap().value) : new Literal(expandedIdx || idx);
          }
          name = obj.unwrap().value;
          acc = idx.unwrap() instanceof PropertyName;
          val = new Value(new Literal(vvarText), [new (acc ? Access : Index)(idx)]);
          if (defaultValue) {
            val = new Op('?', val, defaultValue);
          }
        }
        if (name != null) {
          message = isUnassignable(name);
          if (message) {
            obj.error(message);
          }
        }
        assigns.push(new Assign(obj, val, null, {
          param: this.param,
          subpattern: true
        }).compileToFragments(o, LEVEL_LIST));
      }
      if (!(top || this.subpattern)) {
        assigns.push(vvar);
      }
      fragments = this.joinFragmentArrays(assigns, ', ');
      if (o.level < LEVEL_LIST) {
        return fragments;
      } else {
        return this.wrapInBraces(fragments);
      }
    };
    Assign.prototype.compileConditional = function(o) {
      var fragments,
          left,
          ref3,
          right;
      ref3 = this.variable.cacheReference(o), left = ref3[0], right = ref3[1];
      if (!left.properties.length && left.base instanceof Literal && !(left.base instanceof ThisLiteral) && !o.scope.check(left.base.value)) {
        this.variable.error("the variable \"" + left.base.value + "\" can't be assigned with " + this.context + " because it has not been declared before");
      }
      if (indexOf.call(this.context, "?") >= 0) {
        o.isExistentialEquals = true;
        return new If(new Existence(left), right, {type: 'if'}).addElse(new Assign(right, this.value, '=')).compileToFragments(o);
      } else {
        fragments = new Op(this.context.slice(0, -1), left, new Assign(right, this.value, '=')).compileToFragments(o);
        if (o.level <= LEVEL_LIST) {
          return fragments;
        } else {
          return this.wrapInBraces(fragments);
        }
      }
    };
    Assign.prototype.compileSpecialMath = function(o) {
      var left,
          ref3,
          right;
      ref3 = this.variable.cacheReference(o), left = ref3[0], right = ref3[1];
      return new Assign(left, new Op(this.context.slice(0, -1), right, this.value)).compileToFragments(o);
    };
    Assign.prototype.compileSplice = function(o) {
      var answer,
          exclusive,
          from,
          fromDecl,
          fromRef,
          name,
          ref3,
          ref4,
          ref5,
          to,
          valDef,
          valRef;
      ref3 = this.variable.properties.pop().range, from = ref3.from, to = ref3.to, exclusive = ref3.exclusive;
      name = this.variable.compile(o);
      if (from) {
        ref4 = this.cacheToCodeFragments(from.cache(o, LEVEL_OP)), fromDecl = ref4[0], fromRef = ref4[1];
      } else {
        fromDecl = fromRef = '0';
      }
      if (to) {
        if ((from != null ? from.isNumber() : void 0) && to.isNumber()) {
          to = to.compile(o) - fromRef;
          if (!exclusive) {
            to += 1;
          }
        } else {
          to = to.compile(o, LEVEL_ACCESS) + ' - ' + fromRef;
          if (!exclusive) {
            to += ' + 1';
          }
        }
      } else {
        to = "9e9";
      }
      ref5 = this.value.cache(o, LEVEL_LIST), valDef = ref5[0], valRef = ref5[1];
      answer = [].concat(this.makeCode("[].splice.apply(" + name + ", [" + fromDecl + ", " + to + "].concat("), valDef, this.makeCode(")), "), valRef);
      if (o.level > LEVEL_TOP) {
        return this.wrapInBraces(answer);
      } else {
        return answer;
      }
    };
    return Assign;
  })(Base);
  exports.Code = Code = (function(superClass1) {
    extend1(Code, superClass1);
    function Code(params, body, tag) {
      this.params = params || [];
      this.body = body || new Block;
      this.bound = tag === 'boundfunc';
      this.isGenerator = !!this.body.contains(function(node) {
        return (node instanceof Op && node.isYield()) || node instanceof YieldReturn;
      });
    }
    Code.prototype.children = ['params', 'body'];
    Code.prototype.isStatement = function() {
      return !!this.ctor;
    };
    Code.prototype.jumps = NO;
    Code.prototype.makeScope = function(parentScope) {
      return new Scope(parentScope, this.body, this);
    };
    Code.prototype.compileNode = function(o) {
      var answer,
          boundfunc,
          code,
          exprs,
          i,
          j,
          k,
          l,
          len1,
          len2,
          len3,
          len4,
          len5,
          len6,
          lit,
          m,
          p,
          param,
          params,
          q,
          r,
          ref,
          ref3,
          ref4,
          ref5,
          ref6,
          ref7,
          ref8,
          splats,
          uniqs,
          val,
          wasEmpty,
          wrapper;
      if (this.bound && ((ref3 = o.scope.method) != null ? ref3.bound : void 0)) {
        this.context = o.scope.method.context;
      }
      if (this.bound && !this.context) {
        this.context = '_this';
        wrapper = new Code([new Param(new IdentifierLiteral(this.context))], new Block([this]));
        boundfunc = new Call(wrapper, [new ThisLiteral]);
        boundfunc.updateLocationDataIfMissing(this.locationData);
        return boundfunc.compileNode(o);
      }
      o.scope = del(o, 'classScope') || this.makeScope(o.scope);
      o.scope.shared = del(o, 'sharedScope');
      o.indent += TAB;
      delete o.bare;
      delete o.isExistentialEquals;
      params = [];
      exprs = [];
      ref4 = this.params;
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        param = ref4[j];
        if (!(param instanceof Expansion)) {
          o.scope.parameter(param.asReference(o));
        }
      }
      ref5 = this.params;
      for (k = 0, len2 = ref5.length; k < len2; k++) {
        param = ref5[k];
        if (!(param.splat || param instanceof Expansion)) {
          continue;
        }
        ref6 = this.params;
        for (l = 0, len3 = ref6.length; l < len3; l++) {
          p = ref6[l];
          if (!(p instanceof Expansion) && p.name.value) {
            o.scope.add(p.name.value, 'var', true);
          }
        }
        splats = new Assign(new Value(new Arr((function() {
          var len4,
              m,
              ref7,
              results;
          ref7 = this.params;
          results = [];
          for (m = 0, len4 = ref7.length; m < len4; m++) {
            p = ref7[m];
            results.push(p.asReference(o));
          }
          return results;
        }).call(this))), new Value(new IdentifierLiteral('arguments')));
        break;
      }
      ref7 = this.params;
      for (m = 0, len4 = ref7.length; m < len4; m++) {
        param = ref7[m];
        if (param.isComplex()) {
          val = ref = param.asReference(o);
          if (param.value) {
            val = new Op('?', ref, param.value);
          }
          exprs.push(new Assign(new Value(param.name), val, '=', {param: true}));
        } else {
          ref = param;
          if (param.value) {
            lit = new Literal(ref.name.value + ' == null');
            val = new Assign(new Value(param.name), param.value, '=');
            exprs.push(new If(lit, val));
          }
        }
        if (!splats) {
          params.push(ref);
        }
      }
      wasEmpty = this.body.isEmpty();
      if (splats) {
        exprs.unshift(splats);
      }
      if (exprs.length) {
        (ref8 = this.body.expressions).unshift.apply(ref8, exprs);
      }
      for (i = q = 0, len5 = params.length; q < len5; i = ++q) {
        p = params[i];
        params[i] = p.compileToFragments(o);
        o.scope.parameter(fragmentsToText(params[i]));
      }
      uniqs = [];
      this.eachParamName(function(name, node) {
        if (indexOf.call(uniqs, name) >= 0) {
          node.error("multiple parameters named " + name);
        }
        return uniqs.push(name);
      });
      if (!(wasEmpty || this.noReturn)) {
        this.body.makeReturn();
      }
      code = 'function';
      if (this.isGenerator) {
        code += '*';
      }
      if (this.ctor) {
        code += ' ' + this.name;
      }
      code += '(';
      answer = [this.makeCode(code)];
      for (i = r = 0, len6 = params.length; r < len6; i = ++r) {
        p = params[i];
        if (i) {
          answer.push(this.makeCode(", "));
        }
        answer.push.apply(answer, p);
      }
      answer.push(this.makeCode(') {'));
      if (!this.body.isEmpty()) {
        answer = answer.concat(this.makeCode("\n"), this.body.compileWithDeclarations(o), this.makeCode("\n" + this.tab));
      }
      answer.push(this.makeCode('}'));
      if (this.ctor) {
        return [this.makeCode(this.tab)].concat(slice.call(answer));
      }
      if (this.front || (o.level >= LEVEL_ACCESS)) {
        return this.wrapInBraces(answer);
      } else {
        return answer;
      }
    };
    Code.prototype.eachParamName = function(iterator) {
      var j,
          len1,
          param,
          ref3,
          results;
      ref3 = this.params;
      results = [];
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        param = ref3[j];
        results.push(param.eachName(iterator));
      }
      return results;
    };
    Code.prototype.traverseChildren = function(crossScope, func) {
      if (crossScope) {
        return Code.__super__.traverseChildren.call(this, crossScope, func);
      }
    };
    return Code;
  })(Base);
  exports.Param = Param = (function(superClass1) {
    extend1(Param, superClass1);
    function Param(name1, value1, splat) {
      var message,
          token;
      this.name = name1;
      this.value = value1;
      this.splat = splat;
      message = isUnassignable(this.name.unwrapAll().value);
      if (message) {
        this.name.error(message);
      }
      if (this.name instanceof Obj && this.name.generated) {
        token = this.name.objects[0].operatorToken;
        token.error("unexpected " + token.value);
      }
    }
    Param.prototype.children = ['name', 'value'];
    Param.prototype.compileToFragments = function(o) {
      return this.name.compileToFragments(o, LEVEL_LIST);
    };
    Param.prototype.asReference = function(o) {
      var name,
          node;
      if (this.reference) {
        return this.reference;
      }
      node = this.name;
      if (node["this"]) {
        name = node.properties[0].name.value;
        if (indexOf.call(JS_FORBIDDEN, name) >= 0) {
          name = "_" + name;
        }
        node = new IdentifierLiteral(o.scope.freeVariable(name));
      } else if (node.isComplex()) {
        node = new IdentifierLiteral(o.scope.freeVariable('arg'));
      }
      node = new Value(node);
      if (this.splat) {
        node = new Splat(node);
      }
      node.updateLocationDataIfMissing(this.locationData);
      return this.reference = node;
    };
    Param.prototype.isComplex = function() {
      return this.name.isComplex();
    };
    Param.prototype.eachName = function(iterator, name) {
      var atParam,
          j,
          len1,
          node,
          obj,
          ref3,
          ref4;
      if (name == null) {
        name = this.name;
      }
      atParam = function(obj) {
        return iterator("@" + obj.properties[0].name.value, obj);
      };
      if (name instanceof Literal) {
        return iterator(name.value, name);
      }
      if (name instanceof Value) {
        return atParam(name);
      }
      ref4 = (ref3 = name.objects) != null ? ref3 : [];
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        obj = ref4[j];
        if (obj instanceof Assign && (obj.context == null)) {
          obj = obj.variable;
        }
        if (obj instanceof Assign) {
          if (obj.value instanceof Assign) {
            obj = obj.value;
          }
          this.eachName(iterator, obj.value.unwrap());
        } else if (obj instanceof Splat) {
          node = obj.name.unwrap();
          iterator(node.value, node);
        } else if (obj instanceof Value) {
          if (obj.isArray() || obj.isObject()) {
            this.eachName(iterator, obj.base);
          } else if (obj["this"]) {
            atParam(obj);
          } else {
            iterator(obj.base.value, obj.base);
          }
        } else if (!(obj instanceof Expansion)) {
          obj.error("illegal parameter " + (obj.compile()));
        }
      }
    };
    return Param;
  })(Base);
  exports.Splat = Splat = (function(superClass1) {
    extend1(Splat, superClass1);
    Splat.prototype.children = ['name'];
    Splat.prototype.isAssignable = YES;
    function Splat(name) {
      this.name = name.compile ? name : new Literal(name);
    }
    Splat.prototype.assigns = function(name) {
      return this.name.assigns(name);
    };
    Splat.prototype.compileToFragments = function(o) {
      return this.name.compileToFragments(o);
    };
    Splat.prototype.unwrap = function() {
      return this.name;
    };
    Splat.compileSplattedArray = function(o, list, apply) {
      var args,
          base,
          compiledNode,
          concatPart,
          fragments,
          i,
          index,
          j,
          last,
          len1,
          node;
      index = -1;
      while ((node = list[++index]) && !(node instanceof Splat)) {
        continue;
      }
      if (index >= list.length) {
        return [];
      }
      if (list.length === 1) {
        node = list[0];
        fragments = node.compileToFragments(o, LEVEL_LIST);
        if (apply) {
          return fragments;
        }
        return [].concat(node.makeCode((utility('slice', o)) + ".call("), fragments, node.makeCode(")"));
      }
      args = list.slice(index);
      for (i = j = 0, len1 = args.length; j < len1; i = ++j) {
        node = args[i];
        compiledNode = node.compileToFragments(o, LEVEL_LIST);
        args[i] = node instanceof Splat ? [].concat(node.makeCode((utility('slice', o)) + ".call("), compiledNode, node.makeCode(")")) : [].concat(node.makeCode("["), compiledNode, node.makeCode("]"));
      }
      if (index === 0) {
        node = list[0];
        concatPart = node.joinFragmentArrays(args.slice(1), ', ');
        return args[0].concat(node.makeCode(".concat("), concatPart, node.makeCode(")"));
      }
      base = (function() {
        var k,
            len2,
            ref3,
            results;
        ref3 = list.slice(0, index);
        results = [];
        for (k = 0, len2 = ref3.length; k < len2; k++) {
          node = ref3[k];
          results.push(node.compileToFragments(o, LEVEL_LIST));
        }
        return results;
      })();
      base = list[0].joinFragmentArrays(base, ', ');
      concatPart = list[index].joinFragmentArrays(args, ', ');
      last = list[list.length - 1];
      return [].concat(list[0].makeCode("["), base, list[index].makeCode("].concat("), concatPart, last.makeCode(")"));
    };
    return Splat;
  })(Base);
  exports.Expansion = Expansion = (function(superClass1) {
    extend1(Expansion, superClass1);
    function Expansion() {
      return Expansion.__super__.constructor.apply(this, arguments);
    }
    Expansion.prototype.isComplex = NO;
    Expansion.prototype.compileNode = function(o) {
      return this.error('Expansion must be used inside a destructuring assignment or parameter list');
    };
    Expansion.prototype.asReference = function(o) {
      return this;
    };
    Expansion.prototype.eachName = function(iterator) {};
    return Expansion;
  })(Base);
  exports.While = While = (function(superClass1) {
    extend1(While, superClass1);
    function While(condition, options) {
      this.condition = (options != null ? options.invert : void 0) ? condition.invert() : condition;
      this.guard = options != null ? options.guard : void 0;
    }
    While.prototype.children = ['condition', 'guard', 'body'];
    While.prototype.isStatement = YES;
    While.prototype.makeReturn = function(res) {
      if (res) {
        return While.__super__.makeReturn.apply(this, arguments);
      } else {
        this.returns = !this.jumps({loop: true});
        return this;
      }
    };
    While.prototype.addBody = function(body1) {
      this.body = body1;
      return this;
    };
    While.prototype.jumps = function() {
      var expressions,
          j,
          jumpNode,
          len1,
          node;
      expressions = this.body.expressions;
      if (!expressions.length) {
        return false;
      }
      for (j = 0, len1 = expressions.length; j < len1; j++) {
        node = expressions[j];
        if (jumpNode = node.jumps({loop: true})) {
          return jumpNode;
        }
      }
      return false;
    };
    While.prototype.compileNode = function(o) {
      var answer,
          body,
          rvar,
          set;
      o.indent += TAB;
      set = '';
      body = this.body;
      if (body.isEmpty()) {
        body = this.makeCode('');
      } else {
        if (this.returns) {
          body.makeReturn(rvar = o.scope.freeVariable('results'));
          set = "" + this.tab + rvar + " = [];\n";
        }
        if (this.guard) {
          if (body.expressions.length > 1) {
            body.expressions.unshift(new If((new Parens(this.guard)).invert(), new StatementLiteral("continue")));
          } else {
            if (this.guard) {
              body = Block.wrap([new If(this.guard, body)]);
            }
          }
        }
        body = [].concat(this.makeCode("\n"), body.compileToFragments(o, LEVEL_TOP), this.makeCode("\n" + this.tab));
      }
      answer = [].concat(this.makeCode(set + this.tab + "while ("), this.condition.compileToFragments(o, LEVEL_PAREN), this.makeCode(") {"), body, this.makeCode("}"));
      if (this.returns) {
        answer.push(this.makeCode("\n" + this.tab + "return " + rvar + ";"));
      }
      return answer;
    };
    return While;
  })(Base);
  exports.Op = Op = (function(superClass1) {
    var CONVERSIONS,
        INVERSIONS;
    extend1(Op, superClass1);
    function Op(op, first, second, flip) {
      if (op === 'in') {
        return new In(first, second);
      }
      if (op === 'do') {
        return this.generateDo(first);
      }
      if (op === 'new') {
        if (first instanceof Call && !first["do"] && !first.isNew) {
          return first.newInstance();
        }
        if (first instanceof Code && first.bound || first["do"]) {
          first = new Parens(first);
        }
      }
      this.operator = CONVERSIONS[op] || op;
      this.first = first;
      this.second = second;
      this.flip = !!flip;
      return this;
    }
    CONVERSIONS = {
      '==': '===',
      '!=': '!==',
      'of': 'in',
      'yieldfrom': 'yield*'
    };
    INVERSIONS = {
      '!==': '===',
      '===': '!=='
    };
    Op.prototype.children = ['first', 'second'];
    Op.prototype.isNumber = function() {
      var ref3;
      return this.isUnary() && ((ref3 = this.operator) === '+' || ref3 === '-') && this.first instanceof Value && this.first.isNumber();
    };
    Op.prototype.isYield = function() {
      var ref3;
      return (ref3 = this.operator) === 'yield' || ref3 === 'yield*';
    };
    Op.prototype.isUnary = function() {
      return !this.second;
    };
    Op.prototype.isComplex = function() {
      return !this.isNumber();
    };
    Op.prototype.isChainable = function() {
      var ref3;
      return (ref3 = this.operator) === '<' || ref3 === '>' || ref3 === '>=' || ref3 === '<=' || ref3 === '===' || ref3 === '!==';
    };
    Op.prototype.invert = function() {
      var allInvertable,
          curr,
          fst,
          op,
          ref3;
      if (this.isChainable() && this.first.isChainable()) {
        allInvertable = true;
        curr = this;
        while (curr && curr.operator) {
          allInvertable && (allInvertable = curr.operator in INVERSIONS);
          curr = curr.first;
        }
        if (!allInvertable) {
          return new Parens(this).invert();
        }
        curr = this;
        while (curr && curr.operator) {
          curr.invert = !curr.invert;
          curr.operator = INVERSIONS[curr.operator];
          curr = curr.first;
        }
        return this;
      } else if (op = INVERSIONS[this.operator]) {
        this.operator = op;
        if (this.first.unwrap() instanceof Op) {
          this.first.invert();
        }
        return this;
      } else if (this.second) {
        return new Parens(this).invert();
      } else if (this.operator === '!' && (fst = this.first.unwrap()) instanceof Op && ((ref3 = fst.operator) === '!' || ref3 === 'in' || ref3 === 'instanceof')) {
        return fst;
      } else {
        return new Op('!', this);
      }
    };
    Op.prototype.unfoldSoak = function(o) {
      var ref3;
      return ((ref3 = this.operator) === '++' || ref3 === '--' || ref3 === 'delete') && unfoldSoak(o, this, 'first');
    };
    Op.prototype.generateDo = function(exp) {
      var call,
          func,
          j,
          len1,
          param,
          passedParams,
          ref,
          ref3;
      passedParams = [];
      func = exp instanceof Assign && (ref = exp.value.unwrap()) instanceof Code ? ref : exp;
      ref3 = func.params || [];
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        param = ref3[j];
        if (param.value) {
          passedParams.push(param.value);
          delete param.value;
        } else {
          passedParams.push(param);
        }
      }
      call = new Call(exp, passedParams);
      call["do"] = true;
      return call;
    };
    Op.prototype.compileNode = function(o) {
      var answer,
          isChain,
          lhs,
          message,
          ref3,
          rhs;
      isChain = this.isChainable() && this.first.isChainable();
      if (!isChain) {
        this.first.front = this.front;
      }
      if (this.operator === 'delete' && o.scope.check(this.first.unwrapAll().value)) {
        this.error('delete operand may not be argument or var');
      }
      if ((ref3 = this.operator) === '--' || ref3 === '++') {
        message = isUnassignable(this.first.unwrapAll().value);
        if (message) {
          this.first.error(message);
        }
      }
      if (this.isYield()) {
        return this.compileYield(o);
      }
      if (this.isUnary()) {
        return this.compileUnary(o);
      }
      if (isChain) {
        return this.compileChain(o);
      }
      switch (this.operator) {
        case '?':
          return this.compileExistence(o);
        case '**':
          return this.compilePower(o);
        case '//':
          return this.compileFloorDivision(o);
        case '%%':
          return this.compileModulo(o);
        default:
          lhs = this.first.compileToFragments(o, LEVEL_OP);
          rhs = this.second.compileToFragments(o, LEVEL_OP);
          answer = [].concat(lhs, this.makeCode(" " + this.operator + " "), rhs);
          if (o.level <= LEVEL_OP) {
            return answer;
          } else {
            return this.wrapInBraces(answer);
          }
      }
    };
    Op.prototype.compileChain = function(o) {
      var fragments,
          fst,
          ref3,
          shared;
      ref3 = this.first.second.cache(o), this.first.second = ref3[0], shared = ref3[1];
      fst = this.first.compileToFragments(o, LEVEL_OP);
      fragments = fst.concat(this.makeCode(" " + (this.invert ? '&&' : '||') + " "), shared.compileToFragments(o), this.makeCode(" " + this.operator + " "), this.second.compileToFragments(o, LEVEL_OP));
      return this.wrapInBraces(fragments);
    };
    Op.prototype.compileExistence = function(o) {
      var fst,
          ref;
      if (this.first.isComplex()) {
        ref = new IdentifierLiteral(o.scope.freeVariable('ref'));
        fst = new Parens(new Assign(ref, this.first));
      } else {
        fst = this.first;
        ref = fst;
      }
      return new If(new Existence(fst), ref, {type: 'if'}).addElse(this.second).compileToFragments(o);
    };
    Op.prototype.compileUnary = function(o) {
      var op,
          parts,
          plusMinus;
      parts = [];
      op = this.operator;
      parts.push([this.makeCode(op)]);
      if (op === '!' && this.first instanceof Existence) {
        this.first.negated = !this.first.negated;
        return this.first.compileToFragments(o);
      }
      if (o.level >= LEVEL_ACCESS) {
        return (new Parens(this)).compileToFragments(o);
      }
      plusMinus = op === '+' || op === '-';
      if ((op === 'new' || op === 'typeof' || op === 'delete') || plusMinus && this.first instanceof Op && this.first.operator === op) {
        parts.push([this.makeCode(' ')]);
      }
      if ((plusMinus && this.first instanceof Op) || (op === 'new' && this.first.isStatement(o))) {
        this.first = new Parens(this.first);
      }
      parts.push(this.first.compileToFragments(o, LEVEL_OP));
      if (this.flip) {
        parts.reverse();
      }
      return this.joinFragmentArrays(parts, '');
    };
    Op.prototype.compileYield = function(o) {
      var op,
          parts,
          ref3;
      parts = [];
      op = this.operator;
      if (o.scope.parent == null) {
        this.error('yield can only occur inside functions');
      }
      if (indexOf.call(Object.keys(this.first), 'expression') >= 0 && !(this.first instanceof Throw)) {
        if (this.first.expression != null) {
          parts.push(this.first.expression.compileToFragments(o, LEVEL_OP));
        }
      } else {
        if (o.level >= LEVEL_PAREN) {
          parts.push([this.makeCode("(")]);
        }
        parts.push([this.makeCode(op)]);
        if (((ref3 = this.first.base) != null ? ref3.value : void 0) !== '') {
          parts.push([this.makeCode(" ")]);
        }
        parts.push(this.first.compileToFragments(o, LEVEL_OP));
        if (o.level >= LEVEL_PAREN) {
          parts.push([this.makeCode(")")]);
        }
      }
      return this.joinFragmentArrays(parts, '');
    };
    Op.prototype.compilePower = function(o) {
      var pow;
      pow = new Value(new IdentifierLiteral('Math'), [new Access(new PropertyName('pow'))]);
      return new Call(pow, [this.first, this.second]).compileToFragments(o);
    };
    Op.prototype.compileFloorDivision = function(o) {
      var div,
          floor,
          second;
      floor = new Value(new IdentifierLiteral('Math'), [new Access(new PropertyName('floor'))]);
      second = this.second.isComplex() ? new Parens(this.second) : this.second;
      div = new Op('/', this.first, second);
      return new Call(floor, [div]).compileToFragments(o);
    };
    Op.prototype.compileModulo = function(o) {
      var mod;
      mod = new Value(new Literal(utility('modulo', o)));
      return new Call(mod, [this.first, this.second]).compileToFragments(o);
    };
    Op.prototype.toString = function(idt) {
      return Op.__super__.toString.call(this, idt, this.constructor.name + ' ' + this.operator);
    };
    return Op;
  })(Base);
  exports.In = In = (function(superClass1) {
    extend1(In, superClass1);
    function In(object, array) {
      this.object = object;
      this.array = array;
    }
    In.prototype.children = ['object', 'array'];
    In.prototype.invert = NEGATE;
    In.prototype.compileNode = function(o) {
      var hasSplat,
          j,
          len1,
          obj,
          ref3;
      if (this.array instanceof Value && this.array.isArray() && this.array.base.objects.length) {
        ref3 = this.array.base.objects;
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          obj = ref3[j];
          if (!(obj instanceof Splat)) {
            continue;
          }
          hasSplat = true;
          break;
        }
        if (!hasSplat) {
          return this.compileOrTest(o);
        }
      }
      return this.compileLoopTest(o);
    };
    In.prototype.compileOrTest = function(o) {
      var cmp,
          cnj,
          i,
          item,
          j,
          len1,
          ref,
          ref3,
          ref4,
          ref5,
          sub,
          tests;
      ref3 = this.object.cache(o, LEVEL_OP), sub = ref3[0], ref = ref3[1];
      ref4 = this.negated ? [' !== ', ' && '] : [' === ', ' || '], cmp = ref4[0], cnj = ref4[1];
      tests = [];
      ref5 = this.array.base.objects;
      for (i = j = 0, len1 = ref5.length; j < len1; i = ++j) {
        item = ref5[i];
        if (i) {
          tests.push(this.makeCode(cnj));
        }
        tests = tests.concat((i ? ref : sub), this.makeCode(cmp), item.compileToFragments(o, LEVEL_ACCESS));
      }
      if (o.level < LEVEL_OP) {
        return tests;
      } else {
        return this.wrapInBraces(tests);
      }
    };
    In.prototype.compileLoopTest = function(o) {
      var fragments,
          ref,
          ref3,
          sub;
      ref3 = this.object.cache(o, LEVEL_LIST), sub = ref3[0], ref = ref3[1];
      fragments = [].concat(this.makeCode(utility('indexOf', o) + ".call("), this.array.compileToFragments(o, LEVEL_LIST), this.makeCode(", "), ref, this.makeCode(") " + (this.negated ? '< 0' : '>= 0')));
      if (fragmentsToText(sub) === fragmentsToText(ref)) {
        return fragments;
      }
      fragments = sub.concat(this.makeCode(', '), fragments);
      if (o.level < LEVEL_LIST) {
        return fragments;
      } else {
        return this.wrapInBraces(fragments);
      }
    };
    In.prototype.toString = function(idt) {
      return In.__super__.toString.call(this, idt, this.constructor.name + (this.negated ? '!' : ''));
    };
    return In;
  })(Base);
  exports.Try = Try = (function(superClass1) {
    extend1(Try, superClass1);
    function Try(attempt, errorVariable, recovery, ensure) {
      this.attempt = attempt;
      this.errorVariable = errorVariable;
      this.recovery = recovery;
      this.ensure = ensure;
    }
    Try.prototype.children = ['attempt', 'recovery', 'ensure'];
    Try.prototype.isStatement = YES;
    Try.prototype.jumps = function(o) {
      var ref3;
      return this.attempt.jumps(o) || ((ref3 = this.recovery) != null ? ref3.jumps(o) : void 0);
    };
    Try.prototype.makeReturn = function(res) {
      if (this.attempt) {
        this.attempt = this.attempt.makeReturn(res);
      }
      if (this.recovery) {
        this.recovery = this.recovery.makeReturn(res);
      }
      return this;
    };
    Try.prototype.compileNode = function(o) {
      var catchPart,
          ensurePart,
          generatedErrorVariableName,
          message,
          placeholder,
          tryPart;
      o.indent += TAB;
      tryPart = this.attempt.compileToFragments(o, LEVEL_TOP);
      catchPart = this.recovery ? (generatedErrorVariableName = o.scope.freeVariable('error', {reserve: false}), placeholder = new IdentifierLiteral(generatedErrorVariableName), this.errorVariable ? (message = isUnassignable(this.errorVariable.unwrapAll().value), message ? this.errorVariable.error(message) : void 0, this.recovery.unshift(new Assign(this.errorVariable, placeholder))) : void 0, [].concat(this.makeCode(" catch ("), placeholder.compileToFragments(o), this.makeCode(") {\n"), this.recovery.compileToFragments(o, LEVEL_TOP), this.makeCode("\n" + this.tab + "}"))) : !(this.ensure || this.recovery) ? (generatedErrorVariableName = o.scope.freeVariable('error', {reserve: false}), [this.makeCode(" catch (" + generatedErrorVariableName + ") {}")]) : [];
      ensurePart = this.ensure ? [].concat(this.makeCode(" finally {\n"), this.ensure.compileToFragments(o, LEVEL_TOP), this.makeCode("\n" + this.tab + "}")) : [];
      return [].concat(this.makeCode(this.tab + "try {\n"), tryPart, this.makeCode("\n" + this.tab + "}"), catchPart, ensurePart);
    };
    return Try;
  })(Base);
  exports.Throw = Throw = (function(superClass1) {
    extend1(Throw, superClass1);
    function Throw(expression) {
      this.expression = expression;
    }
    Throw.prototype.children = ['expression'];
    Throw.prototype.isStatement = YES;
    Throw.prototype.jumps = NO;
    Throw.prototype.makeReturn = THIS;
    Throw.prototype.compileNode = function(o) {
      return [].concat(this.makeCode(this.tab + "throw "), this.expression.compileToFragments(o), this.makeCode(";"));
    };
    return Throw;
  })(Base);
  exports.Existence = Existence = (function(superClass1) {
    extend1(Existence, superClass1);
    function Existence(expression) {
      this.expression = expression;
    }
    Existence.prototype.children = ['expression'];
    Existence.prototype.invert = NEGATE;
    Existence.prototype.compileNode = function(o) {
      var cmp,
          cnj,
          code,
          ref3;
      this.expression.front = this.front;
      code = this.expression.compile(o, LEVEL_OP);
      if (this.expression.unwrap() instanceof IdentifierLiteral && !o.scope.check(code)) {
        ref3 = this.negated ? ['===', '||'] : ['!==', '&&'], cmp = ref3[0], cnj = ref3[1];
        code = "typeof " + code + " " + cmp + " \"undefined\" " + cnj + " " + code + " " + cmp + " null";
      } else {
        code = code + " " + (this.negated ? '==' : '!=') + " null";
      }
      return [this.makeCode(o.level <= LEVEL_COND ? code : "(" + code + ")")];
    };
    return Existence;
  })(Base);
  exports.Parens = Parens = (function(superClass1) {
    extend1(Parens, superClass1);
    function Parens(body1) {
      this.body = body1;
    }
    Parens.prototype.children = ['body'];
    Parens.prototype.unwrap = function() {
      return this.body;
    };
    Parens.prototype.isComplex = function() {
      return this.body.isComplex();
    };
    Parens.prototype.compileNode = function(o) {
      var bare,
          expr,
          fragments;
      expr = this.body.unwrap();
      if (expr instanceof Value && expr.isAtomic()) {
        expr.front = this.front;
        return expr.compileToFragments(o);
      }
      fragments = expr.compileToFragments(o, LEVEL_PAREN);
      bare = o.level < LEVEL_OP && (expr instanceof Op || expr instanceof Call || (expr instanceof For && expr.returns));
      if (bare) {
        return fragments;
      } else {
        return this.wrapInBraces(fragments);
      }
    };
    return Parens;
  })(Base);
  exports.StringWithInterpolations = StringWithInterpolations = (function(superClass1) {
    extend1(StringWithInterpolations, superClass1);
    function StringWithInterpolations() {
      return StringWithInterpolations.__super__.constructor.apply(this, arguments);
    }
    StringWithInterpolations.prototype.compileNode = function(o) {
      var element,
          elements,
          expr,
          fragments,
          j,
          len1,
          value;
      if (!o.inTaggedTemplateCall) {
        return StringWithInterpolations.__super__.compileNode.apply(this, arguments);
      }
      expr = this.body.unwrap();
      elements = [];
      expr.traverseChildren(false, function(node) {
        if (node instanceof StringLiteral) {
          elements.push(node);
          return true;
        } else if (node instanceof Parens) {
          elements.push(node);
          return false;
        }
        return true;
      });
      fragments = [];
      fragments.push(this.makeCode('`'));
      for (j = 0, len1 = elements.length; j < len1; j++) {
        element = elements[j];
        if (element instanceof StringLiteral) {
          value = element.value.slice(1, -1);
          value = value.replace(/(\\*)(`|\$\{)/g, function(match, backslashes, toBeEscaped) {
            if (backslashes.length % 2 === 0) {
              return backslashes + "\\" + toBeEscaped;
            } else {
              return match;
            }
          });
          fragments.push(this.makeCode(value));
        } else {
          fragments.push(this.makeCode('${'));
          fragments.push.apply(fragments, element.compileToFragments(o, LEVEL_PAREN));
          fragments.push(this.makeCode('}'));
        }
      }
      fragments.push(this.makeCode('`'));
      return fragments;
    };
    return StringWithInterpolations;
  })(Parens);
  exports.For = For = (function(superClass1) {
    extend1(For, superClass1);
    function For(body, source) {
      var ref3;
      this.source = source.source, this.guard = source.guard, this.step = source.step, this.name = source.name, this.index = source.index;
      this.body = Block.wrap([body]);
      this.own = !!source.own;
      this.object = !!source.object;
      this.from = !!source.from;
      if (this.from && this.index) {
        this.index.error('cannot use index with for-from');
      }
      if (this.own && !this.object) {
        source.ownTag.error("cannot use own with for-" + (this.from ? 'from' : 'in'));
      }
      if (this.object) {
        ref3 = [this.index, this.name], this.name = ref3[0], this.index = ref3[1];
      }
      if (this.index instanceof Value && !this.index.isAssignable()) {
        this.index.error('index cannot be a pattern matching expression');
      }
      this.range = this.source instanceof Value && this.source.base instanceof Range && !this.source.properties.length && !this.from;
      this.pattern = this.name instanceof Value;
      if (this.range && this.index) {
        this.index.error('indexes do not apply to range loops');
      }
      if (this.range && this.pattern) {
        this.name.error('cannot pattern match over range loops');
      }
      this.returns = false;
    }
    For.prototype.children = ['body', 'source', 'guard', 'step'];
    For.prototype.compileNode = function(o) {
      var body,
          bodyFragments,
          compare,
          compareDown,
          declare,
          declareDown,
          defPart,
          defPartFragments,
          down,
          forPartFragments,
          guardPart,
          idt1,
          increment,
          index,
          ivar,
          kvar,
          kvarAssign,
          last,
          lvar,
          name,
          namePart,
          ref,
          ref3,
          ref4,
          resultPart,
          returnResult,
          rvar,
          scope,
          source,
          step,
          stepNum,
          stepVar,
          svar,
          varPart;
      body = Block.wrap([this.body]);
      ref3 = body.expressions, last = ref3[ref3.length - 1];
      if ((last != null ? last.jumps() : void 0) instanceof Return) {
        this.returns = false;
      }
      source = this.range ? this.source.base : this.source;
      scope = o.scope;
      if (!this.pattern) {
        name = this.name && (this.name.compile(o, LEVEL_LIST));
      }
      index = this.index && (this.index.compile(o, LEVEL_LIST));
      if (name && !this.pattern) {
        scope.find(name);
      }
      if (index && !(this.index instanceof Value)) {
        scope.find(index);
      }
      if (this.returns) {
        rvar = scope.freeVariable('results');
      }
      if (this.from) {
        if (this.pattern) {
          ivar = scope.freeVariable('x', {single: true});
        }
      } else {
        ivar = (this.object && index) || scope.freeVariable('i', {single: true});
      }
      kvar = ((this.range || this.from) && name) || index || ivar;
      kvarAssign = kvar !== ivar ? kvar + " = " : "";
      if (this.step && !this.range) {
        ref4 = this.cacheToCodeFragments(this.step.cache(o, LEVEL_LIST, isComplexOrAssignable)), step = ref4[0], stepVar = ref4[1];
        if (this.step.isNumber()) {
          stepNum = Number(stepVar);
        }
      }
      if (this.pattern) {
        name = ivar;
      }
      varPart = '';
      guardPart = '';
      defPart = '';
      idt1 = this.tab + TAB;
      if (this.range) {
        forPartFragments = source.compileToFragments(merge(o, {
          index: ivar,
          name: name,
          step: this.step,
          isComplex: isComplexOrAssignable
        }));
      } else {
        svar = this.source.compile(o, LEVEL_LIST);
        if ((name || this.own) && !(this.source.unwrap() instanceof IdentifierLiteral)) {
          defPart += "" + this.tab + (ref = scope.freeVariable('ref')) + " = " + svar + ";\n";
          svar = ref;
        }
        if (name && !this.pattern && !this.from) {
          namePart = name + " = " + svar + "[" + kvar + "]";
        }
        if (!this.object && !this.from) {
          if (step !== stepVar) {
            defPart += "" + this.tab + step + ";\n";
          }
          down = stepNum < 0;
          if (!(this.step && (stepNum != null) && down)) {
            lvar = scope.freeVariable('len');
          }
          declare = "" + kvarAssign + ivar + " = 0, " + lvar + " = " + svar + ".length";
          declareDown = "" + kvarAssign + ivar + " = " + svar + ".length - 1";
          compare = ivar + " < " + lvar;
          compareDown = ivar + " >= 0";
          if (this.step) {
            if (stepNum != null) {
              if (down) {
                compare = compareDown;
                declare = declareDown;
              }
            } else {
              compare = stepVar + " > 0 ? " + compare + " : " + compareDown;
              declare = "(" + stepVar + " > 0 ? (" + declare + ") : " + declareDown + ")";
            }
            increment = ivar + " += " + stepVar;
          } else {
            increment = "" + (kvar !== ivar ? "++" + ivar : ivar + "++");
          }
          forPartFragments = [this.makeCode(declare + "; " + compare + "; " + kvarAssign + increment)];
        }
      }
      if (this.returns) {
        resultPart = "" + this.tab + rvar + " = [];\n";
        returnResult = "\n" + this.tab + "return " + rvar + ";";
        body.makeReturn(rvar);
      }
      if (this.guard) {
        if (body.expressions.length > 1) {
          body.expressions.unshift(new If((new Parens(this.guard)).invert(), new StatementLiteral("continue")));
        } else {
          if (this.guard) {
            body = Block.wrap([new If(this.guard, body)]);
          }
        }
      }
      if (this.pattern) {
        body.expressions.unshift(new Assign(this.name, this.from ? new IdentifierLiteral(kvar) : new Literal(svar + "[" + kvar + "]")));
      }
      defPartFragments = [].concat(this.makeCode(defPart), this.pluckDirectCall(o, body));
      if (namePart) {
        varPart = "\n" + idt1 + namePart + ";";
      }
      if (this.object) {
        forPartFragments = [this.makeCode(kvar + " in " + svar)];
        if (this.own) {
          guardPart = "\n" + idt1 + "if (!" + (utility('hasProp', o)) + ".call(" + svar + ", " + kvar + ")) continue;";
        }
      } else if (this.from) {
        forPartFragments = [this.makeCode(kvar + " of " + svar)];
      }
      bodyFragments = body.compileToFragments(merge(o, {indent: idt1}), LEVEL_TOP);
      if (bodyFragments && bodyFragments.length > 0) {
        bodyFragments = [].concat(this.makeCode("\n"), bodyFragments, this.makeCode("\n"));
      }
      return [].concat(defPartFragments, this.makeCode("" + (resultPart || '') + this.tab + "for ("), forPartFragments, this.makeCode(") {" + guardPart + varPart), bodyFragments, this.makeCode(this.tab + "}" + (returnResult || '')));
    };
    For.prototype.pluckDirectCall = function(o, body) {
      var base,
          defs,
          expr,
          fn,
          idx,
          j,
          len1,
          ref,
          ref3,
          ref4,
          ref5,
          ref6,
          ref7,
          ref8,
          ref9,
          val;
      defs = [];
      ref3 = body.expressions;
      for (idx = j = 0, len1 = ref3.length; j < len1; idx = ++j) {
        expr = ref3[idx];
        expr = expr.unwrapAll();
        if (!(expr instanceof Call)) {
          continue;
        }
        val = (ref4 = expr.variable) != null ? ref4.unwrapAll() : void 0;
        if (!((val instanceof Code) || (val instanceof Value && ((ref5 = val.base) != null ? ref5.unwrapAll() : void 0) instanceof Code && val.properties.length === 1 && ((ref6 = (ref7 = val.properties[0].name) != null ? ref7.value : void 0) === 'call' || ref6 === 'apply')))) {
          continue;
        }
        fn = ((ref8 = val.base) != null ? ref8.unwrapAll() : void 0) || val;
        ref = new IdentifierLiteral(o.scope.freeVariable('fn'));
        base = new Value(ref);
        if (val.base) {
          ref9 = [base, val], val.base = ref9[0], base = ref9[1];
        }
        body.expressions[idx] = new Call(base, expr.args);
        defs = defs.concat(this.makeCode(this.tab), new Assign(ref, fn).compileToFragments(o, LEVEL_TOP), this.makeCode(';\n'));
      }
      return defs;
    };
    return For;
  })(While);
  exports.Switch = Switch = (function(superClass1) {
    extend1(Switch, superClass1);
    function Switch(subject, cases, otherwise) {
      this.subject = subject;
      this.cases = cases;
      this.otherwise = otherwise;
    }
    Switch.prototype.children = ['subject', 'cases', 'otherwise'];
    Switch.prototype.isStatement = YES;
    Switch.prototype.jumps = function(o) {
      var block,
          conds,
          j,
          jumpNode,
          len1,
          ref3,
          ref4,
          ref5;
      if (o == null) {
        o = {block: true};
      }
      ref3 = this.cases;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        ref4 = ref3[j], conds = ref4[0], block = ref4[1];
        if (jumpNode = block.jumps(o)) {
          return jumpNode;
        }
      }
      return (ref5 = this.otherwise) != null ? ref5.jumps(o) : void 0;
    };
    Switch.prototype.makeReturn = function(res) {
      var j,
          len1,
          pair,
          ref3,
          ref4;
      ref3 = this.cases;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        pair = ref3[j];
        pair[1].makeReturn(res);
      }
      if (res) {
        this.otherwise || (this.otherwise = new Block([new Literal('void 0')]));
      }
      if ((ref4 = this.otherwise) != null) {
        ref4.makeReturn(res);
      }
      return this;
    };
    Switch.prototype.compileNode = function(o) {
      var block,
          body,
          cond,
          conditions,
          expr,
          fragments,
          i,
          idt1,
          idt2,
          j,
          k,
          len1,
          len2,
          ref3,
          ref4,
          ref5;
      idt1 = o.indent + TAB;
      idt2 = o.indent = idt1 + TAB;
      fragments = [].concat(this.makeCode(this.tab + "switch ("), (this.subject ? this.subject.compileToFragments(o, LEVEL_PAREN) : this.makeCode("false")), this.makeCode(") {\n"));
      ref3 = this.cases;
      for (i = j = 0, len1 = ref3.length; j < len1; i = ++j) {
        ref4 = ref3[i], conditions = ref4[0], block = ref4[1];
        ref5 = flatten([conditions]);
        for (k = 0, len2 = ref5.length; k < len2; k++) {
          cond = ref5[k];
          if (!this.subject) {
            cond = cond.invert();
          }
          fragments = fragments.concat(this.makeCode(idt1 + "case "), cond.compileToFragments(o, LEVEL_PAREN), this.makeCode(":\n"));
        }
        if ((body = block.compileToFragments(o, LEVEL_TOP)).length > 0) {
          fragments = fragments.concat(body, this.makeCode('\n'));
        }
        if (i === this.cases.length - 1 && !this.otherwise) {
          break;
        }
        expr = this.lastNonComment(block.expressions);
        if (expr instanceof Return || (expr instanceof Literal && expr.jumps() && expr.value !== 'debugger')) {
          continue;
        }
        fragments.push(cond.makeCode(idt2 + 'break;\n'));
      }
      if (this.otherwise && this.otherwise.expressions.length) {
        fragments.push.apply(fragments, [this.makeCode(idt1 + "default:\n")].concat(slice.call(this.otherwise.compileToFragments(o, LEVEL_TOP)), [this.makeCode("\n")]));
      }
      fragments.push(this.makeCode(this.tab + '}'));
      return fragments;
    };
    return Switch;
  })(Base);
  exports.If = If = (function(superClass1) {
    extend1(If, superClass1);
    function If(condition, body1, options) {
      this.body = body1;
      if (options == null) {
        options = {};
      }
      this.condition = options.type === 'unless' ? condition.invert() : condition;
      this.elseBody = null;
      this.isChain = false;
      this.soak = options.soak;
    }
    If.prototype.children = ['condition', 'body', 'elseBody'];
    If.prototype.bodyNode = function() {
      var ref3;
      return (ref3 = this.body) != null ? ref3.unwrap() : void 0;
    };
    If.prototype.elseBodyNode = function() {
      var ref3;
      return (ref3 = this.elseBody) != null ? ref3.unwrap() : void 0;
    };
    If.prototype.addElse = function(elseBody) {
      if (this.isChain) {
        this.elseBodyNode().addElse(elseBody);
      } else {
        this.isChain = elseBody instanceof If;
        this.elseBody = this.ensureBlock(elseBody);
        this.elseBody.updateLocationDataIfMissing(elseBody.locationData);
      }
      return this;
    };
    If.prototype.isStatement = function(o) {
      var ref3;
      return (o != null ? o.level : void 0) === LEVEL_TOP || this.bodyNode().isStatement(o) || ((ref3 = this.elseBodyNode()) != null ? ref3.isStatement(o) : void 0);
    };
    If.prototype.jumps = function(o) {
      var ref3;
      return this.body.jumps(o) || ((ref3 = this.elseBody) != null ? ref3.jumps(o) : void 0);
    };
    If.prototype.compileNode = function(o) {
      if (this.isStatement(o)) {
        return this.compileStatement(o);
      } else {
        return this.compileExpression(o);
      }
    };
    If.prototype.makeReturn = function(res) {
      if (res) {
        this.elseBody || (this.elseBody = new Block([new Literal('void 0')]));
      }
      this.body && (this.body = new Block([this.body.makeReturn(res)]));
      this.elseBody && (this.elseBody = new Block([this.elseBody.makeReturn(res)]));
      return this;
    };
    If.prototype.ensureBlock = function(node) {
      if (node instanceof Block) {
        return node;
      } else {
        return new Block([node]);
      }
    };
    If.prototype.compileStatement = function(o) {
      var answer,
          body,
          child,
          cond,
          exeq,
          ifPart,
          indent;
      child = del(o, 'chainChild');
      exeq = del(o, 'isExistentialEquals');
      if (exeq) {
        return new If(this.condition.invert(), this.elseBodyNode(), {type: 'if'}).compileToFragments(o);
      }
      indent = o.indent + TAB;
      cond = this.condition.compileToFragments(o, LEVEL_PAREN);
      body = this.ensureBlock(this.body).compileToFragments(merge(o, {indent: indent}));
      ifPart = [].concat(this.makeCode("if ("), cond, this.makeCode(") {\n"), body, this.makeCode("\n" + this.tab + "}"));
      if (!child) {
        ifPart.unshift(this.makeCode(this.tab));
      }
      if (!this.elseBody) {
        return ifPart;
      }
      answer = ifPart.concat(this.makeCode(' else '));
      if (this.isChain) {
        o.chainChild = true;
        answer = answer.concat(this.elseBody.unwrap().compileToFragments(o, LEVEL_TOP));
      } else {
        answer = answer.concat(this.makeCode("{\n"), this.elseBody.compileToFragments(merge(o, {indent: indent}), LEVEL_TOP), this.makeCode("\n" + this.tab + "}"));
      }
      return answer;
    };
    If.prototype.compileExpression = function(o) {
      var alt,
          body,
          cond,
          fragments;
      cond = this.condition.compileToFragments(o, LEVEL_COND);
      body = this.bodyNode().compileToFragments(o, LEVEL_LIST);
      alt = this.elseBodyNode() ? this.elseBodyNode().compileToFragments(o, LEVEL_LIST) : [this.makeCode('void 0')];
      fragments = cond.concat(this.makeCode(" ? "), body, this.makeCode(" : "), alt);
      if (o.level >= LEVEL_COND) {
        return this.wrapInBraces(fragments);
      } else {
        return fragments;
      }
    };
    If.prototype.unfoldSoak = function() {
      return this.soak && this;
    };
    return If;
  })(Base);
  UTILITIES = {
    extend: function(o) {
      return "function(child, parent) { for (var key in parent) { if (" + (utility('hasProp', o)) + ".call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }";
    },
    bind: function() {
      return 'function(fn, me){ return function(){ return fn.apply(me, arguments); }; }';
    },
    indexOf: function() {
      return "[].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }";
    },
    modulo: function() {
      return "function(a, b) { return (+a % (b = +b) + b) % b; }";
    },
    hasProp: function() {
      return '{}.hasOwnProperty';
    },
    slice: function() {
      return '[].slice';
    }
  };
  LEVEL_TOP = 1;
  LEVEL_PAREN = 2;
  LEVEL_LIST = 3;
  LEVEL_COND = 4;
  LEVEL_OP = 5;
  LEVEL_ACCESS = 6;
  TAB = '  ';
  SIMPLENUM = /^[+-]?\d+$/;
  utility = function(name, o) {
    var ref,
        root;
    root = o.scope.root;
    if (name in root.utilities) {
      return root.utilities[name];
    } else {
      ref = root.freeVariable(name);
      root.assign(ref, UTILITIES[name](o));
      return root.utilities[name] = ref;
    }
  };
  multident = function(code, tab) {
    code = code.replace(/\n/g, '$&' + tab);
    return code.replace(/\s+$/, '');
  };
  isLiteralArguments = function(node) {
    return node instanceof IdentifierLiteral && node.value === 'arguments';
  };
  isLiteralThis = function(node) {
    return node instanceof ThisLiteral || (node instanceof Code && node.bound) || node instanceof SuperCall;
  };
  isComplexOrAssignable = function(node) {
    return node.isComplex() || (typeof node.isAssignable === "function" ? node.isAssignable() : void 0);
  };
  unfoldSoak = function(o, parent, name) {
    var ifn;
    if (!(ifn = parent[name].unfoldSoak(o))) {
      return;
    }
    parent[name] = ifn.body;
    ifn.body = new Value(parent);
    return ifn;
  };
}).call(this);
