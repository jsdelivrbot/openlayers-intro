/* */ 
(function(process) {
  "use strict";
  function Compressor(options, false_by_default) {
    if (!(this instanceof Compressor))
      return new Compressor(options, false_by_default);
    TreeTransformer.call(this, this.before, this.after);
    this.options = defaults(options, {
      angular: false,
      booleans: !false_by_default,
      cascade: !false_by_default,
      collapse_vars: !false_by_default,
      comparisons: !false_by_default,
      conditionals: !false_by_default,
      dead_code: !false_by_default,
      drop_console: false,
      drop_debugger: !false_by_default,
      evaluate: !false_by_default,
      expression: false,
      global_defs: {},
      hoist_funs: !false_by_default,
      hoist_vars: false,
      if_return: !false_by_default,
      join_vars: !false_by_default,
      keep_fargs: true,
      keep_fnames: false,
      keep_infinity: false,
      loops: !false_by_default,
      negate_iife: !false_by_default,
      passes: 1,
      properties: !false_by_default,
      pure_getters: false,
      pure_funcs: null,
      reduce_vars: !false_by_default,
      screw_ie8: true,
      sequences: !false_by_default,
      side_effects: !false_by_default,
      switches: !false_by_default,
      top_retain: null,
      toplevel: !!(options && options["top_retain"]),
      unsafe: false,
      unsafe_comps: false,
      unsafe_math: false,
      unsafe_proto: false,
      unused: !false_by_default,
      warnings: true
    }, true);
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
      this.pure_funcs = pure_funcs;
    } else {
      this.pure_funcs = pure_funcs ? function(node) {
        return pure_funcs.indexOf(node.expression.print_to_string()) < 0;
      } : return_true;
    }
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
      this.top_retain = function(def) {
        return top_retain.test(def.name);
      };
    } else if (typeof top_retain == "function") {
      this.top_retain = top_retain;
    } else if (top_retain) {
      if (typeof top_retain == "string") {
        top_retain = top_retain.split(/,/);
      }
      this.top_retain = function(def) {
        return top_retain.indexOf(def.name) >= 0;
      };
    }
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 200 : sequences | 0;
    this.warnings_produced = {};
  }
  ;
  Compressor.prototype = new TreeTransformer;
  merge(Compressor.prototype, {
    option: function(key) {
      return this.options[key];
    },
    compress: function(node) {
      if (this.option("expression")) {
        node = node.process_expression(true);
      }
      var passes = +this.options.passes || 1;
      for (var pass = 0; pass < passes && pass < 3; ++pass) {
        if (pass > 0 || this.option("reduce_vars"))
          node.reset_opt_flags(this, true);
        node = node.transform(this);
      }
      if (this.option("expression")) {
        node = node.process_expression(false);
      }
      return node;
    },
    info: function() {
      if (this.options.warnings == "verbose") {
        AST_Node.warn.apply(AST_Node, arguments);
      }
    },
    warn: function(text, props) {
      if (this.options.warnings) {
        var message = string_template(text, props);
        if (!(message in this.warnings_produced)) {
          this.warnings_produced[message] = true;
          AST_Node.warn.apply(AST_Node, arguments);
        }
      }
    },
    clear_warnings: function() {
      this.warnings_produced = {};
    },
    before: function(node, descend, in_list) {
      if (node._squeezed)
        return node;
      var was_scope = false;
      if (node instanceof AST_Scope) {
        node = node.hoist_declarations(this);
        was_scope = true;
      }
      descend(node, this);
      descend(node, this);
      var opt = node.optimize(this);
      if (was_scope && opt instanceof AST_Scope) {
        opt.drop_unused(this);
        descend(opt, this);
      }
      if (opt === node)
        opt._squeezed = true;
      return opt;
    }
  });
  (function() {
    function OPT(node, optimizer) {
      node.DEFMETHOD("optimize", function(compressor) {
        var self = this;
        if (self._optimized)
          return self;
        if (compressor.has_directive("use asm"))
          return self;
        var opt = optimizer(self, compressor);
        opt._optimized = true;
        return opt;
      });
    }
    ;
    OPT(AST_Node, function(self, compressor) {
      return self;
    });
    AST_Node.DEFMETHOD("equivalent_to", function(node) {
      return this.TYPE == node.TYPE && this.print_to_string() == node.print_to_string();
    });
    AST_Node.DEFMETHOD("process_expression", function(insert, compressor) {
      var self = this;
      var tt = new TreeTransformer(function(node) {
        if (insert && node instanceof AST_SimpleStatement) {
          return make_node(AST_Return, node, {value: node.body});
        }
        if (!insert && node instanceof AST_Return) {
          if (compressor) {
            var value = node.value && node.value.drop_side_effect_free(compressor, true);
            return value ? make_node(AST_SimpleStatement, node, {body: value}) : make_node(AST_EmptyStatement, node);
          }
          return make_node(AST_SimpleStatement, node, {body: node.value || make_node(AST_UnaryPrefix, node, {
              operator: "void",
              expression: make_node(AST_Number, node, {value: 0})
            })});
        }
        if (node instanceof AST_Lambda && node !== self) {
          return node;
        }
        if (node instanceof AST_Block) {
          var index = node.body.length - 1;
          if (index >= 0) {
            node.body[index] = node.body[index].transform(tt);
          }
        }
        if (node instanceof AST_If) {
          node.body = node.body.transform(tt);
          if (node.alternative) {
            node.alternative = node.alternative.transform(tt);
          }
        }
        if (node instanceof AST_With) {
          node.body = node.body.transform(tt);
        }
        return node;
      });
      return self.transform(tt);
    });
    AST_Node.DEFMETHOD("reset_opt_flags", function(compressor, rescan) {
      var reduce_vars = rescan && compressor.option("reduce_vars");
      var toplevel = compressor.option("toplevel");
      var ie8 = !compressor.option("screw_ie8");
      var safe_ids = [];
      push();
      var suppressor = new TreeWalker(function(node) {
        if (node instanceof AST_Symbol) {
          var d = node.definition();
          if (node instanceof AST_SymbolRef)
            d.references.push(node);
          d.fixed = false;
        }
      });
      var tw = new TreeWalker(function(node, descend) {
        if (!(node instanceof AST_Directive || node instanceof AST_Constant)) {
          node._squeezed = false;
          node._optimized = false;
        }
        if (reduce_vars) {
          if (node instanceof AST_Toplevel)
            node.globals.each(reset_def);
          if (node instanceof AST_Scope)
            node.variables.each(reset_def);
          if (node instanceof AST_SymbolRef) {
            var d = node.definition();
            d.references.push(node);
            if (d.fixed === undefined || !is_safe(d) || is_modified(node, 0, d.fixed instanceof AST_Lambda)) {
              d.fixed = false;
            }
          }
          if (ie8 && node instanceof AST_SymbolCatch) {
            node.definition().fixed = false;
          }
          if (node instanceof AST_VarDef) {
            var d = node.name.definition();
            if (d.fixed == null) {
              d.fixed = node.value;
              mark_as_safe(d);
            } else if (node.value) {
              d.fixed = false;
            }
          }
          if (node instanceof AST_Defun) {
            var d = node.name.definition();
            if (!toplevel && d.global || is_safe(d)) {
              d.fixed = false;
            } else {
              d.fixed = node;
              mark_as_safe(d);
            }
            var save_ids = safe_ids;
            safe_ids = [];
            push();
            descend();
            safe_ids = save_ids;
            return true;
          }
          var iife;
          if (node instanceof AST_Function && !node.name && (iife = tw.parent()) instanceof AST_Call && iife.expression === node) {
            node.argnames.forEach(function(arg, i) {
              var d = arg.definition();
              d.fixed = iife.args[i] || make_node(AST_Undefined, iife);
              mark_as_safe(d);
            });
          }
          if (node instanceof AST_If || node instanceof AST_DWLoop) {
            node.condition.walk(tw);
            push();
            node.body.walk(tw);
            pop();
            if (node.alternative) {
              push();
              node.alternative.walk(tw);
              pop();
            }
            return true;
          }
          if (node instanceof AST_LabeledStatement) {
            push();
            node.body.walk(tw);
            pop();
            return true;
          }
          if (node instanceof AST_For) {
            if (node.init)
              node.init.walk(tw);
            push();
            if (node.condition)
              node.condition.walk(tw);
            node.body.walk(tw);
            if (node.step)
              node.step.walk(tw);
            pop();
            return true;
          }
          if (node instanceof AST_ForIn) {
            node.init.walk(suppressor);
            node.object.walk(tw);
            push();
            node.body.walk(tw);
            pop();
            return true;
          }
          if (node instanceof AST_Catch || node instanceof AST_SwitchBranch) {
            push();
            descend();
            pop();
            return true;
          }
        }
      });
      this.walk(tw);
      function mark_as_safe(def) {
        safe_ids[safe_ids.length - 1][def.id] = true;
      }
      function is_safe(def) {
        for (var i = safe_ids.length,
            id = def.id; --i >= 0; ) {
          if (safe_ids[i][id]) {
            if (def.fixed == null) {
              var orig = def.orig[0];
              if (orig instanceof AST_SymbolFunarg || orig.name == "arguments")
                return false;
              def.fixed = make_node(AST_Undefined, orig);
            }
            return true;
          }
        }
      }
      function push() {
        safe_ids.push(Object.create(null));
      }
      function pop() {
        safe_ids.pop();
      }
      function reset_def(def) {
        if (toplevel || !def.global || def.orig[0] instanceof AST_SymbolConst) {
          def.fixed = undefined;
        } else {
          def.fixed = false;
        }
        def.references = [];
        def.should_replace = undefined;
      }
      function is_modified(node, level, func) {
        var parent = tw.parent(level);
        if (isLHS(node, parent) || !func && parent instanceof AST_Call && parent.expression === node) {
          return true;
        } else if (parent instanceof AST_PropAccess && parent.expression === node) {
          return !func && is_modified(parent, level + 1);
        }
      }
    });
    function find_variable(compressor, name) {
      var scope,
          i = 0;
      while (scope = compressor.parent(i++)) {
        if (scope instanceof AST_Scope)
          break;
        if (scope instanceof AST_Catch) {
          scope = scope.argname.definition().scope;
          break;
        }
      }
      return scope.find_variable(name);
    }
    function make_node(ctor, orig, props) {
      if (!props)
        props = {};
      if (orig) {
        if (!props.start)
          props.start = orig.start;
        if (!props.end)
          props.end = orig.end;
      }
      return new ctor(props);
    }
    ;
    function make_node_from_constant(val, orig) {
      switch (typeof val) {
        case "string":
          return make_node(AST_String, orig, {value: val});
        case "number":
          if (isNaN(val))
            return make_node(AST_NaN, orig);
          if (isFinite(val)) {
            return 1 / val < 0 ? make_node(AST_UnaryPrefix, orig, {
              operator: "-",
              expression: make_node(AST_Number, orig, {value: -val})
            }) : make_node(AST_Number, orig, {value: val});
          }
          return val < 0 ? make_node(AST_UnaryPrefix, orig, {
            operator: "-",
            expression: make_node(AST_Infinity, orig)
          }) : make_node(AST_Infinity, orig);
        case "boolean":
          return make_node(val ? AST_True : AST_False, orig);
        case "undefined":
          return make_node(AST_Undefined, orig);
        default:
          if (val === null) {
            return make_node(AST_Null, orig, {value: null});
          }
          if (val instanceof RegExp) {
            return make_node(AST_RegExp, orig, {value: val});
          }
          throw new Error(string_template("Can't handle constant of type: {type}", {type: typeof val}));
      }
    }
    ;
    function maintain_this_binding(parent, orig, val) {
      if (parent instanceof AST_Call && parent.expression === orig) {
        if (val instanceof AST_PropAccess || val instanceof AST_SymbolRef && val.name === "eval") {
          return make_node(AST_Seq, orig, {
            car: make_node(AST_Number, orig, {value: 0}),
            cdr: val
          });
        }
      }
      return val;
    }
    function as_statement_array(thing) {
      if (thing === null)
        return [];
      if (thing instanceof AST_BlockStatement)
        return thing.body;
      if (thing instanceof AST_EmptyStatement)
        return [];
      if (thing instanceof AST_Statement)
        return [thing];
      throw new Error("Can't convert thing to statement array");
    }
    ;
    function is_empty(thing) {
      if (thing === null)
        return true;
      if (thing instanceof AST_EmptyStatement)
        return true;
      if (thing instanceof AST_BlockStatement)
        return thing.body.length == 0;
      return false;
    }
    ;
    function loop_body(x) {
      if (x instanceof AST_Switch)
        return x;
      if (x instanceof AST_For || x instanceof AST_ForIn || x instanceof AST_DWLoop) {
        return (x.body instanceof AST_BlockStatement ? x.body : x);
      }
      return x;
    }
    ;
    function is_iife_call(node) {
      if (node instanceof AST_Call && !(node instanceof AST_New)) {
        return node.expression instanceof AST_Function || is_iife_call(node.expression);
      }
      return false;
    }
    function tighten_body(statements, compressor) {
      var CHANGED,
          max_iter = 10;
      do {
        CHANGED = false;
        if (compressor.option("angular")) {
          statements = process_for_angular(statements);
        }
        statements = eliminate_spurious_blocks(statements);
        if (compressor.option("dead_code")) {
          statements = eliminate_dead_code(statements, compressor);
        }
        if (compressor.option("if_return")) {
          statements = handle_if_return(statements, compressor);
        }
        if (compressor.sequences_limit > 0) {
          statements = sequencesize(statements, compressor);
        }
        if (compressor.option("join_vars")) {
          statements = join_consecutive_vars(statements, compressor);
        }
        if (compressor.option("collapse_vars")) {
          statements = collapse_single_use_vars(statements, compressor);
        }
      } while (CHANGED && max_iter-- > 0);
      return statements;
      function collapse_single_use_vars(statements, compressor) {
        var self = compressor.self();
        var var_defs_removed = false;
        var toplevel = compressor.option("toplevel");
        for (var stat_index = statements.length; --stat_index >= 0; ) {
          var stat = statements[stat_index];
          if (stat instanceof AST_Definitions)
            continue;
          [stat, stat.body, stat.alternative, stat.bcatch, stat.bfinally].forEach(function(node) {
            node && node.body && collapse_single_use_vars(node.body, compressor);
          });
          if (stat_index <= 0)
            break;
          var prev_stat_index = stat_index - 1;
          var prev_stat = statements[prev_stat_index];
          if (!(prev_stat instanceof AST_Definitions))
            continue;
          var var_defs = prev_stat.definitions;
          if (var_defs == null)
            continue;
          var var_names_seen = {};
          var side_effects_encountered = false;
          var lvalues_encountered = false;
          var lvalues = {};
          for (var var_defs_index = var_defs.length; --var_defs_index >= 0; ) {
            var var_decl = var_defs[var_defs_index];
            if (var_decl.value == null)
              break;
            var var_name = var_decl.name.name;
            if (!var_name || !var_name.length)
              break;
            if (var_name in var_names_seen)
              break;
            var_names_seen[var_name] = true;
            var def = self.find_variable && self.find_variable(var_name);
            if (!def || !def.references || def.references.length !== 1 || var_name == "arguments" || (!toplevel && def.global)) {
              side_effects_encountered = true;
              continue;
            }
            var ref = def.references[0];
            if (ref.scope.uses_eval || ref.scope.uses_with)
              break;
            if (var_decl.value.is_constant()) {
              var ctt = new TreeTransformer(function(node) {
                var parent = ctt.parent();
                if (parent instanceof AST_IterationStatement && (parent.condition === node || parent.init === node)) {
                  return node;
                }
                if (node === ref)
                  return replace_var(node, parent, true);
              });
              stat.transform(ctt);
              continue;
            }
            if (side_effects_encountered |= lvalues_encountered)
              continue;
            var value_has_side_effects = var_decl.value.has_side_effects(compressor);
            if (ref.scope !== self) {
              side_effects_encountered |= value_has_side_effects;
              continue;
            }
            var tw = new TreeWalker(function(node) {
              if (node instanceof AST_SymbolRef && is_lvalue(node, tw.parent())) {
                lvalues[node.name] = lvalues_encountered = true;
              }
            });
            var_decl.value.walk(tw);
            var unwind = false;
            var tt = new TreeTransformer(function preorder(node) {
              if (unwind)
                return node;
              var parent = tt.parent();
              if (node instanceof AST_Lambda || node instanceof AST_Try || node instanceof AST_With || node instanceof AST_Case || node instanceof AST_IterationStatement || (parent instanceof AST_If && node !== parent.condition) || (parent instanceof AST_Conditional && node !== parent.condition) || (node instanceof AST_SymbolRef && value_has_side_effects && !are_references_in_scope(node.definition(), self)) || (parent instanceof AST_Binary && (parent.operator == "&&" || parent.operator == "||") && node === parent.right) || (parent instanceof AST_Switch && node !== parent.expression)) {
                return side_effects_encountered = unwind = true, node;
              }
              function are_references_in_scope(def, scope) {
                if (def.orig.length === 1 && def.orig[0] instanceof AST_SymbolDefun)
                  return true;
                if (def.scope !== scope)
                  return false;
                var refs = def.references;
                for (var i = 0,
                    len = refs.length; i < len; i++) {
                  if (refs[i].scope !== scope)
                    return false;
                }
                return true;
              }
            }, function postorder(node) {
              if (unwind)
                return node;
              if (node === ref)
                return unwind = true, replace_var(node, tt.parent(), false);
              if (side_effects_encountered |= node.has_side_effects(compressor))
                return unwind = true, node;
              if (lvalues_encountered && node instanceof AST_SymbolRef && node.name in lvalues) {
                side_effects_encountered = true;
                return unwind = true, node;
              }
            });
            stat.transform(tt);
          }
        }
        if (var_defs_removed)
          for (var i = statements.length; --i >= 0; ) {
            if (statements.length > 1 && statements[i] instanceof AST_EmptyStatement)
              statements.splice(i, 1);
          }
        return statements;
        function is_lvalue(node, parent) {
          return node instanceof AST_SymbolRef && isLHS(node, parent);
        }
        function replace_var(node, parent, is_constant) {
          if (is_lvalue(node, parent))
            return node;
          var value = maintain_this_binding(parent, node, var_decl.value);
          var_decl.value = null;
          var_defs.splice(var_defs_index, 1);
          if (var_defs.length === 0) {
            statements[prev_stat_index] = make_node(AST_EmptyStatement, self);
            var_defs_removed = true;
          }
          stat.reset_opt_flags(compressor);
          compressor.info("Collapsing " + (is_constant ? "constant" : "variable") + " " + var_name + " [{file}:{line},{col}]", node.start);
          CHANGED = true;
          return value;
        }
      }
      function process_for_angular(statements) {
        function has_inject(comment) {
          return /@ngInject/.test(comment.value);
        }
        function make_arguments_names_list(func) {
          return func.argnames.map(function(sym) {
            return make_node(AST_String, sym, {value: sym.name});
          });
        }
        function make_array(orig, elements) {
          return make_node(AST_Array, orig, {elements: elements});
        }
        function make_injector(func, name) {
          return make_node(AST_SimpleStatement, func, {body: make_node(AST_Assign, func, {
              operator: "=",
              left: make_node(AST_Dot, name, {
                expression: make_node(AST_SymbolRef, name, name),
                property: "$inject"
              }),
              right: make_array(func, make_arguments_names_list(func))
            })});
        }
        function check_expression(body) {
          if (body && body.args) {
            body.args.forEach(function(argument, index, array) {
              var comments = argument.start.comments_before;
              if (argument instanceof AST_Lambda && comments.length && has_inject(comments[0])) {
                array[index] = make_array(argument, make_arguments_names_list(argument).concat(argument));
              }
            });
            if (body.expression && body.expression.expression) {
              check_expression(body.expression.expression);
            }
          }
        }
        return statements.reduce(function(a, stat) {
          a.push(stat);
          if (stat.body && stat.body.args) {
            check_expression(stat.body);
          } else {
            var token = stat.start;
            var comments = token.comments_before;
            if (comments && comments.length > 0) {
              var last = comments.pop();
              if (has_inject(last)) {
                if (stat instanceof AST_Defun) {
                  a.push(make_injector(stat, stat.name));
                } else if (stat instanceof AST_Definitions) {
                  stat.definitions.forEach(function(def) {
                    if (def.value && def.value instanceof AST_Lambda) {
                      a.push(make_injector(def.value, def.name));
                    }
                  });
                } else {
                  compressor.warn("Unknown statement marked with @ngInject [{file}:{line},{col}]", token);
                }
              }
            }
          }
          return a;
        }, []);
      }
      function eliminate_spurious_blocks(statements) {
        var seen_dirs = [];
        return statements.reduce(function(a, stat) {
          if (stat instanceof AST_BlockStatement) {
            CHANGED = true;
            a.push.apply(a, eliminate_spurious_blocks(stat.body));
          } else if (stat instanceof AST_EmptyStatement) {
            CHANGED = true;
          } else if (stat instanceof AST_Directive) {
            if (seen_dirs.indexOf(stat.value) < 0) {
              a.push(stat);
              seen_dirs.push(stat.value);
            } else {
              CHANGED = true;
            }
          } else {
            a.push(stat);
          }
          return a;
        }, []);
      }
      ;
      function handle_if_return(statements, compressor) {
        var self = compressor.self();
        var multiple_if_returns = has_multiple_if_returns(statements);
        var in_lambda = self instanceof AST_Lambda;
        var ret = [];
        loop: for (var i = statements.length; --i >= 0; ) {
          var stat = statements[i];
          switch (true) {
            case (in_lambda && stat instanceof AST_Return && !stat.value && ret.length == 0):
              CHANGED = true;
              continue loop;
            case stat instanceof AST_If:
              if (stat.body instanceof AST_Return) {
                if (((in_lambda && ret.length == 0) || (ret[0] instanceof AST_Return && !ret[0].value)) && !stat.body.value && !stat.alternative) {
                  CHANGED = true;
                  var cond = make_node(AST_SimpleStatement, stat.condition, {body: stat.condition});
                  ret.unshift(cond);
                  continue loop;
                }
                if (ret[0] instanceof AST_Return && stat.body.value && ret[0].value && !stat.alternative) {
                  CHANGED = true;
                  stat = stat.clone();
                  stat.alternative = ret[0];
                  ret[0] = stat.transform(compressor);
                  continue loop;
                }
                if (multiple_if_returns && (ret.length == 0 || ret[0] instanceof AST_Return) && stat.body.value && !stat.alternative && in_lambda) {
                  CHANGED = true;
                  stat = stat.clone();
                  stat.alternative = ret[0] || make_node(AST_Return, stat, {value: null});
                  ret[0] = stat.transform(compressor);
                  continue loop;
                }
                if (!stat.body.value && in_lambda) {
                  CHANGED = true;
                  stat = stat.clone();
                  stat.condition = stat.condition.negate(compressor);
                  var body = as_statement_array(stat.alternative).concat(ret);
                  var funs = extract_functions_from_statement_array(body);
                  stat.body = make_node(AST_BlockStatement, stat, {body: body});
                  stat.alternative = null;
                  ret = funs.concat([stat.transform(compressor)]);
                  continue loop;
                }
                if (compressor.option("sequences") && i > 0 && statements[i - 1] instanceof AST_If && statements[i - 1].body instanceof AST_Return && ret.length == 1 && in_lambda && ret[0] instanceof AST_SimpleStatement && !stat.alternative) {
                  CHANGED = true;
                  ret.push(make_node(AST_Return, ret[0], {value: null}).transform(compressor));
                  ret.unshift(stat);
                  continue loop;
                }
              }
              var ab = aborts(stat.body);
              var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab.label) : null;
              if (ab && ((ab instanceof AST_Return && !ab.value && in_lambda) || (ab instanceof AST_Continue && self === loop_body(lct)) || (ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct))) {
                if (ab.label) {
                  remove(ab.label.thedef.references, ab);
                }
                CHANGED = true;
                var body = as_statement_array(stat.body).slice(0, -1);
                stat = stat.clone();
                stat.condition = stat.condition.negate(compressor);
                stat.body = make_node(AST_BlockStatement, stat, {body: as_statement_array(stat.alternative).concat(ret)});
                stat.alternative = make_node(AST_BlockStatement, stat, {body: body});
                ret = [stat.transform(compressor)];
                continue loop;
              }
              var ab = aborts(stat.alternative);
              var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab.label) : null;
              if (ab && ((ab instanceof AST_Return && !ab.value && in_lambda) || (ab instanceof AST_Continue && self === loop_body(lct)) || (ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct))) {
                if (ab.label) {
                  remove(ab.label.thedef.references, ab);
                }
                CHANGED = true;
                stat = stat.clone();
                stat.body = make_node(AST_BlockStatement, stat.body, {body: as_statement_array(stat.body).concat(ret)});
                stat.alternative = make_node(AST_BlockStatement, stat.alternative, {body: as_statement_array(stat.alternative).slice(0, -1)});
                ret = [stat.transform(compressor)];
                continue loop;
              }
              ret.unshift(stat);
              break;
            default:
              ret.unshift(stat);
              break;
          }
        }
        return ret;
        function has_multiple_if_returns(statements) {
          var n = 0;
          for (var i = statements.length; --i >= 0; ) {
            var stat = statements[i];
            if (stat instanceof AST_If && stat.body instanceof AST_Return) {
              if (++n > 1)
                return true;
            }
          }
          return false;
        }
      }
      ;
      function eliminate_dead_code(statements, compressor) {
        var has_quit = false;
        var orig = statements.length;
        var self = compressor.self();
        statements = statements.reduce(function(a, stat) {
          if (has_quit) {
            extract_declarations_from_unreachable_code(compressor, stat, a);
          } else {
            if (stat instanceof AST_LoopControl) {
              var lct = compressor.loopcontrol_target(stat.label);
              if ((stat instanceof AST_Break && !(lct instanceof AST_IterationStatement) && loop_body(lct) === self) || (stat instanceof AST_Continue && loop_body(lct) === self)) {
                if (stat.label) {
                  remove(stat.label.thedef.references, stat);
                }
              } else {
                a.push(stat);
              }
            } else {
              a.push(stat);
            }
            if (aborts(stat))
              has_quit = true;
          }
          return a;
        }, []);
        CHANGED = statements.length != orig;
        return statements;
      }
      ;
      function sequencesize(statements, compressor) {
        if (statements.length < 2)
          return statements;
        var seq = [],
            ret = [];
        function push_seq() {
          seq = AST_Seq.from_array(seq);
          if (seq)
            ret.push(make_node(AST_SimpleStatement, seq, {body: seq}));
          seq = [];
        }
        ;
        statements.forEach(function(stat) {
          if (stat instanceof AST_SimpleStatement) {
            if (seqLength(seq) >= compressor.sequences_limit)
              push_seq();
            var body = stat.body;
            if (seq.length > 0)
              body = body.drop_side_effect_free(compressor);
            if (body)
              seq.push(body);
          } else {
            push_seq();
            ret.push(stat);
          }
        });
        push_seq();
        ret = sequencesize_2(ret, compressor);
        CHANGED = ret.length != statements.length;
        return ret;
      }
      ;
      function seqLength(a) {
        for (var len = 0,
            i = 0; i < a.length; ++i) {
          var stat = a[i];
          if (stat instanceof AST_Seq) {
            len += stat.len();
          } else {
            len++;
          }
        }
        return len;
      }
      ;
      function sequencesize_2(statements, compressor) {
        function cons_seq(right) {
          ret.pop();
          var left = prev.body;
          if (left instanceof AST_Seq) {
            left.add(right);
          } else {
            left = AST_Seq.cons(left, right);
          }
          return left.transform(compressor);
        }
        ;
        var ret = [],
            prev = null;
        statements.forEach(function(stat) {
          if (prev) {
            if (stat instanceof AST_For) {
              var opera = {};
              try {
                prev.body.walk(new TreeWalker(function(node) {
                  if (node instanceof AST_Binary && node.operator == "in")
                    throw opera;
                }));
                if (stat.init && !(stat.init instanceof AST_Definitions)) {
                  stat.init = cons_seq(stat.init);
                } else if (!stat.init) {
                  stat.init = prev.body.drop_side_effect_free(compressor);
                  ret.pop();
                }
              } catch (ex) {
                if (ex !== opera)
                  throw ex;
              }
            } else if (stat instanceof AST_If) {
              stat.condition = cons_seq(stat.condition);
            } else if (stat instanceof AST_With) {
              stat.expression = cons_seq(stat.expression);
            } else if (stat instanceof AST_Exit && stat.value) {
              stat.value = cons_seq(stat.value);
            } else if (stat instanceof AST_Exit) {
              stat.value = cons_seq(make_node(AST_Undefined, stat).transform(compressor));
            } else if (stat instanceof AST_Switch) {
              stat.expression = cons_seq(stat.expression);
            }
          }
          ret.push(stat);
          prev = stat instanceof AST_SimpleStatement ? stat : null;
        });
        return ret;
      }
      ;
      function join_consecutive_vars(statements, compressor) {
        var prev = null;
        return statements.reduce(function(a, stat) {
          if (stat instanceof AST_Definitions && prev && prev.TYPE == stat.TYPE) {
            prev.definitions = prev.definitions.concat(stat.definitions);
            CHANGED = true;
          } else if (stat instanceof AST_For && prev instanceof AST_Var && (!stat.init || stat.init.TYPE == prev.TYPE)) {
            CHANGED = true;
            a.pop();
            if (stat.init) {
              stat.init.definitions = prev.definitions.concat(stat.init.definitions);
            } else {
              stat.init = prev;
            }
            a.push(stat);
            prev = stat;
          } else {
            prev = stat;
            a.push(stat);
          }
          return a;
        }, []);
      }
      ;
    }
    ;
    function extract_functions_from_statement_array(statements) {
      var funs = [];
      for (var i = statements.length - 1; i >= 0; --i) {
        var stat = statements[i];
        if (stat instanceof AST_Defun) {
          statements.splice(i, 1);
          funs.unshift(stat);
        }
      }
      return funs;
    }
    function extract_declarations_from_unreachable_code(compressor, stat, target) {
      if (!(stat instanceof AST_Defun)) {
        compressor.warn("Dropping unreachable code [{file}:{line},{col}]", stat.start);
      }
      stat.walk(new TreeWalker(function(node) {
        if (node instanceof AST_Definitions) {
          compressor.warn("Declarations in unreachable code! [{file}:{line},{col}]", node.start);
          node.remove_initializers();
          target.push(node);
          return true;
        }
        if (node instanceof AST_Defun) {
          target.push(node);
          return true;
        }
        if (node instanceof AST_Scope) {
          return true;
        }
      }));
    }
    ;
    function is_undefined(node, compressor) {
      return node.is_undefined || node instanceof AST_Undefined || node instanceof AST_UnaryPrefix && node.operator == "void" && !node.expression.has_side_effects(compressor);
    }
    (function(def) {
      var unary_bool = ["!", "delete"];
      var binary_bool = ["in", "instanceof", "==", "!=", "===", "!==", "<", "<=", ">=", ">"];
      def(AST_Node, return_false);
      def(AST_UnaryPrefix, function() {
        return member(this.operator, unary_bool);
      });
      def(AST_Binary, function() {
        return member(this.operator, binary_bool) || ((this.operator == "&&" || this.operator == "||") && this.left.is_boolean() && this.right.is_boolean());
      });
      def(AST_Conditional, function() {
        return this.consequent.is_boolean() && this.alternative.is_boolean();
      });
      def(AST_Assign, function() {
        return this.operator == "=" && this.right.is_boolean();
      });
      def(AST_Seq, function() {
        return this.cdr.is_boolean();
      });
      def(AST_True, return_true);
      def(AST_False, return_true);
    })(function(node, func) {
      node.DEFMETHOD("is_boolean", func);
    });
    (function(def) {
      def(AST_Node, return_false);
      def(AST_Number, return_true);
      var unary = makePredicate("+ - ~ ++ --");
      def(AST_Unary, function() {
        return unary(this.operator);
      });
      var binary = makePredicate("- * / % & | ^ << >> >>>");
      def(AST_Binary, function(compressor) {
        return binary(this.operator) || this.operator == "+" && this.left.is_number(compressor) && this.right.is_number(compressor);
      });
      def(AST_Assign, function(compressor) {
        return binary(this.operator.slice(0, -1)) || this.operator == "=" && this.right.is_number(compressor);
      });
      def(AST_Seq, function(compressor) {
        return this.cdr.is_number(compressor);
      });
      def(AST_Conditional, function(compressor) {
        return this.consequent.is_number(compressor) && this.alternative.is_number(compressor);
      });
    })(function(node, func) {
      node.DEFMETHOD("is_number", func);
    });
    (function(def) {
      def(AST_Node, return_false);
      def(AST_String, return_true);
      def(AST_UnaryPrefix, function() {
        return this.operator == "typeof";
      });
      def(AST_Binary, function(compressor) {
        return this.operator == "+" && (this.left.is_string(compressor) || this.right.is_string(compressor));
      });
      def(AST_Assign, function(compressor) {
        return (this.operator == "=" || this.operator == "+=") && this.right.is_string(compressor);
      });
      def(AST_Seq, function(compressor) {
        return this.cdr.is_string(compressor);
      });
      def(AST_Conditional, function(compressor) {
        return this.consequent.is_string(compressor) && this.alternative.is_string(compressor);
      });
    })(function(node, func) {
      node.DEFMETHOD("is_string", func);
    });
    var unary_side_effects = makePredicate("delete ++ --");
    function isLHS(node, parent) {
      return parent instanceof AST_Unary && unary_side_effects(parent.operator) || parent instanceof AST_Assign && parent.left === node;
    }
    (function(def) {
      AST_Node.DEFMETHOD("resolve_defines", function(compressor) {
        if (!compressor.option("global_defs"))
          return;
        var def = this._find_defs(compressor, "");
        if (def) {
          var node,
              parent = this,
              level = 0;
          do {
            node = parent;
            parent = compressor.parent(level++);
          } while (parent instanceof AST_PropAccess && parent.expression === node);
          if (isLHS(node, parent)) {
            compressor.warn('global_defs ' + this.print_to_string() + ' redefined [{file}:{line},{col}]', this.start);
          } else {
            return def;
          }
        }
      });
      function to_node(value, orig) {
        if (value instanceof AST_Node)
          return make_node(value.CTOR, orig, value);
        if (Array.isArray(value))
          return make_node(AST_Array, orig, {elements: value.map(function(value) {
              return to_node(value, orig);
            })});
        if (value && typeof value == "object") {
          var props = [];
          for (var key in value) {
            props.push(make_node(AST_ObjectKeyVal, orig, {
              key: key,
              value: to_node(value[key], orig)
            }));
          }
          return make_node(AST_Object, orig, {properties: props});
        }
        return make_node_from_constant(value, orig);
      }
      def(AST_Node, noop);
      def(AST_Dot, function(compressor, suffix) {
        return this.expression._find_defs(compressor, suffix + "." + this.property);
      });
      def(AST_SymbolRef, function(compressor, suffix) {
        if (!this.global())
          return;
        var name;
        var defines = compressor.option("global_defs");
        if (defines && HOP(defines, (name = this.name + suffix))) {
          var node = to_node(defines[name], this);
          var top = compressor.find_parent(AST_Toplevel);
          node.walk(new TreeWalker(function(node) {
            if (node instanceof AST_SymbolRef) {
              node.scope = top;
              node.thedef = top.def_global(node);
            }
          }));
          return node;
        }
      });
    })(function(node, func) {
      node.DEFMETHOD("_find_defs", func);
    });
    function best_of_expression(ast1, ast2) {
      return ast1.print_to_string().length > ast2.print_to_string().length ? ast2 : ast1;
    }
    function best_of_statement(ast1, ast2) {
      return best_of_expression(make_node(AST_SimpleStatement, ast1, {body: ast1}), make_node(AST_SimpleStatement, ast2, {body: ast2})).body;
    }
    function best_of(compressor, ast1, ast2) {
      return (first_in_statement(compressor) ? best_of_statement : best_of_expression)(ast1, ast2);
    }
    (function(def) {
      AST_Node.DEFMETHOD("evaluate", function(compressor) {
        if (!compressor.option("evaluate"))
          return this;
        try {
          var val = this._eval(compressor);
          return !val || val instanceof RegExp || typeof val != "object" ? val : this;
        } catch (ex) {
          if (ex !== def)
            throw ex;
          return this;
        }
      });
      var unaryPrefix = makePredicate("! ~ - + void");
      AST_Node.DEFMETHOD("is_constant", function() {
        if (this instanceof AST_Constant) {
          return !(this instanceof AST_RegExp);
        } else {
          return this instanceof AST_UnaryPrefix && this.expression instanceof AST_Constant && unaryPrefix(this.operator);
        }
      });
      AST_Node.DEFMETHOD("constant_value", function(compressor) {
        if (this instanceof AST_Constant && !(this instanceof AST_RegExp)) {
          return this.value;
        }
        if (this instanceof AST_UnaryPrefix && this.expression instanceof AST_Constant)
          switch (this.operator) {
            case "!":
              return !this.expression.value;
            case "~":
              return ~this.expression.value;
            case "-":
              return -this.expression.value;
            case "+":
              return +this.expression.value;
            default:
              throw new Error(string_template("Cannot evaluate unary expression {value}", {value: this.print_to_string()}));
          }
        var result = this.evaluate(compressor);
        if (result !== this) {
          return result;
        }
        throw new Error(string_template("Cannot evaluate constant [{file}:{line},{col}]", this.start));
      });
      def(AST_Statement, function() {
        throw new Error(string_template("Cannot evaluate a statement [{file}:{line},{col}]", this.start));
      });
      def(AST_Lambda, function() {
        throw def;
      });
      function ev(node, compressor) {
        if (!compressor)
          throw new Error("Compressor must be passed");
        return node._eval(compressor);
      }
      ;
      def(AST_Node, function() {
        throw def;
      });
      def(AST_Constant, function() {
        return this.getValue();
      });
      def(AST_Array, function(compressor) {
        if (compressor.option("unsafe")) {
          return this.elements.map(function(element) {
            return ev(element, compressor);
          });
        }
        throw def;
      });
      def(AST_Object, function(compressor) {
        if (compressor.option("unsafe")) {
          var val = {};
          for (var i = 0,
              len = this.properties.length; i < len; i++) {
            var prop = this.properties[i];
            var key = prop.key;
            if (key instanceof AST_Symbol) {
              key = key.name;
            } else if (key instanceof AST_Node) {
              key = ev(key, compressor);
            }
            if (typeof Object.prototype[key] === 'function') {
              throw def;
            }
            val[key] = ev(prop.value, compressor);
          }
          return val;
        }
        throw def;
      });
      def(AST_UnaryPrefix, function(compressor) {
        var e = this.expression;
        switch (this.operator) {
          case "!":
            return !ev(e, compressor);
          case "typeof":
            if (e instanceof AST_Function)
              return typeof function() {};
            e = ev(e, compressor);
            if (e instanceof RegExp)
              throw def;
            return typeof e;
          case "void":
            return void ev(e, compressor);
          case "~":
            return ~ev(e, compressor);
          case "-":
            return -ev(e, compressor);
          case "+":
            return +ev(e, compressor);
        }
        throw def;
      });
      def(AST_Binary, function(c) {
        var left = this.left,
            right = this.right,
            result;
        switch (this.operator) {
          case "&&":
            result = ev(left, c) && ev(right, c);
            break;
          case "||":
            result = ev(left, c) || ev(right, c);
            break;
          case "|":
            result = ev(left, c) | ev(right, c);
            break;
          case "&":
            result = ev(left, c) & ev(right, c);
            break;
          case "^":
            result = ev(left, c) ^ ev(right, c);
            break;
          case "+":
            result = ev(left, c) + ev(right, c);
            break;
          case "*":
            result = ev(left, c) * ev(right, c);
            break;
          case "/":
            result = ev(left, c) / ev(right, c);
            break;
          case "%":
            result = ev(left, c) % ev(right, c);
            break;
          case "-":
            result = ev(left, c) - ev(right, c);
            break;
          case "<<":
            result = ev(left, c) << ev(right, c);
            break;
          case ">>":
            result = ev(left, c) >> ev(right, c);
            break;
          case ">>>":
            result = ev(left, c) >>> ev(right, c);
            break;
          case "==":
            result = ev(left, c) == ev(right, c);
            break;
          case "===":
            result = ev(left, c) === ev(right, c);
            break;
          case "!=":
            result = ev(left, c) != ev(right, c);
            break;
          case "!==":
            result = ev(left, c) !== ev(right, c);
            break;
          case "<":
            result = ev(left, c) < ev(right, c);
            break;
          case "<=":
            result = ev(left, c) <= ev(right, c);
            break;
          case ">":
            result = ev(left, c) > ev(right, c);
            break;
          case ">=":
            result = ev(left, c) >= ev(right, c);
            break;
          default:
            throw def;
        }
        if (isNaN(result) && c.find_parent(AST_With)) {
          throw def;
        }
        return result;
      });
      def(AST_Conditional, function(compressor) {
        return ev(this.condition, compressor) ? ev(this.consequent, compressor) : ev(this.alternative, compressor);
      });
      def(AST_SymbolRef, function(compressor) {
        if (this._evaluating)
          throw def;
        this._evaluating = true;
        try {
          var d = this.definition();
          if (compressor.option("reduce_vars") && d.fixed) {
            if (compressor.option("unsafe")) {
              if (!HOP(d.fixed, "_evaluated")) {
                d.fixed._evaluated = ev(d.fixed, compressor);
              }
              return d.fixed._evaluated;
            }
            return ev(d.fixed, compressor);
          }
        } finally {
          this._evaluating = false;
        }
        throw def;
      });
      def(AST_PropAccess, function(compressor) {
        if (compressor.option("unsafe")) {
          var key = this.property;
          if (key instanceof AST_Node) {
            key = ev(key, compressor);
          }
          var val = ev(this.expression, compressor);
          if (val && HOP(val, key)) {
            return val[key];
          }
        }
        throw def;
      });
    })(function(node, func) {
      node.DEFMETHOD("_eval", func);
    });
    (function(def) {
      function basic_negation(exp) {
        return make_node(AST_UnaryPrefix, exp, {
          operator: "!",
          expression: exp
        });
      }
      function best(orig, alt, first_in_statement) {
        var negated = basic_negation(orig);
        if (first_in_statement) {
          var stat = make_node(AST_SimpleStatement, alt, {body: alt});
          return best_of_expression(negated, stat) === stat ? alt : negated;
        }
        return best_of_expression(negated, alt);
      }
      def(AST_Node, function() {
        return basic_negation(this);
      });
      def(AST_Statement, function() {
        throw new Error("Cannot negate a statement");
      });
      def(AST_Function, function() {
        return basic_negation(this);
      });
      def(AST_UnaryPrefix, function() {
        if (this.operator == "!")
          return this.expression;
        return basic_negation(this);
      });
      def(AST_Seq, function(compressor) {
        var self = this.clone();
        self.cdr = self.cdr.negate(compressor);
        return self;
      });
      def(AST_Conditional, function(compressor, first_in_statement) {
        var self = this.clone();
        self.consequent = self.consequent.negate(compressor);
        self.alternative = self.alternative.negate(compressor);
        return best(this, self, first_in_statement);
      });
      def(AST_Binary, function(compressor, first_in_statement) {
        var self = this.clone(),
            op = this.operator;
        if (compressor.option("unsafe_comps")) {
          switch (op) {
            case "<=":
              self.operator = ">";
              return self;
            case "<":
              self.operator = ">=";
              return self;
            case ">=":
              self.operator = "<";
              return self;
            case ">":
              self.operator = "<=";
              return self;
          }
        }
        switch (op) {
          case "==":
            self.operator = "!=";
            return self;
          case "!=":
            self.operator = "==";
            return self;
          case "===":
            self.operator = "!==";
            return self;
          case "!==":
            self.operator = "===";
            return self;
          case "&&":
            self.operator = "||";
            self.left = self.left.negate(compressor, first_in_statement);
            self.right = self.right.negate(compressor);
            return best(this, self, first_in_statement);
          case "||":
            self.operator = "&&";
            self.left = self.left.negate(compressor, first_in_statement);
            self.right = self.right.negate(compressor);
            return best(this, self, first_in_statement);
        }
        return basic_negation(this);
      });
    })(function(node, func) {
      node.DEFMETHOD("negate", function(compressor, first_in_statement) {
        return func.call(this, compressor, first_in_statement);
      });
    });
    AST_Call.DEFMETHOD("has_pure_annotation", function(compressor) {
      if (!compressor.option("side_effects"))
        return false;
      if (this.pure !== undefined)
        return this.pure;
      var pure = false;
      var comments,
          last_comment;
      if (this.start && (comments = this.start.comments_before) && comments.length && /[@#]__PURE__/.test((last_comment = comments[comments.length - 1]).value)) {
        pure = last_comment;
      }
      return this.pure = pure;
    });
    (function(def) {
      def(AST_Node, return_true);
      def(AST_EmptyStatement, return_false);
      def(AST_Constant, return_false);
      def(AST_This, return_false);
      def(AST_Call, function(compressor) {
        if (!this.has_pure_annotation(compressor) && compressor.pure_funcs(this))
          return true;
        for (var i = this.args.length; --i >= 0; ) {
          if (this.args[i].has_side_effects(compressor))
            return true;
        }
        return false;
      });
      function any(list, compressor) {
        for (var i = list.length; --i >= 0; )
          if (list[i].has_side_effects(compressor))
            return true;
        return false;
      }
      def(AST_Block, function(compressor) {
        return any(this.body, compressor);
      });
      def(AST_Switch, function(compressor) {
        return this.expression.has_side_effects(compressor) || any(this.body, compressor);
      });
      def(AST_Case, function(compressor) {
        return this.expression.has_side_effects(compressor) || any(this.body, compressor);
      });
      def(AST_Try, function(compressor) {
        return any(this.body, compressor) || this.bcatch && this.bcatch.has_side_effects(compressor) || this.bfinally && this.bfinally.has_side_effects(compressor);
      });
      def(AST_If, function(compressor) {
        return this.condition.has_side_effects(compressor) || this.body && this.body.has_side_effects(compressor) || this.alternative && this.alternative.has_side_effects(compressor);
      });
      def(AST_LabeledStatement, function(compressor) {
        return this.body.has_side_effects(compressor);
      });
      def(AST_SimpleStatement, function(compressor) {
        return this.body.has_side_effects(compressor);
      });
      def(AST_Defun, return_true);
      def(AST_Function, return_false);
      def(AST_Binary, function(compressor) {
        return this.left.has_side_effects(compressor) || this.right.has_side_effects(compressor);
      });
      def(AST_Assign, return_true);
      def(AST_Conditional, function(compressor) {
        return this.condition.has_side_effects(compressor) || this.consequent.has_side_effects(compressor) || this.alternative.has_side_effects(compressor);
      });
      def(AST_Unary, function(compressor) {
        return unary_side_effects(this.operator) || this.expression.has_side_effects(compressor);
      });
      def(AST_SymbolRef, function(compressor) {
        return this.global() && this.undeclared();
      });
      def(AST_Object, function(compressor) {
        return any(this.properties, compressor);
      });
      def(AST_ObjectProperty, function(compressor) {
        return this.value.has_side_effects(compressor);
      });
      def(AST_Array, function(compressor) {
        return any(this.elements, compressor);
      });
      def(AST_Dot, function(compressor) {
        if (!compressor.option("pure_getters"))
          return true;
        return this.expression.has_side_effects(compressor);
      });
      def(AST_Sub, function(compressor) {
        if (!compressor.option("pure_getters"))
          return true;
        return this.expression.has_side_effects(compressor) || this.property.has_side_effects(compressor);
      });
      def(AST_PropAccess, function(compressor) {
        return !compressor.option("pure_getters");
      });
      def(AST_Seq, function(compressor) {
        return this.car.has_side_effects(compressor) || this.cdr.has_side_effects(compressor);
      });
    })(function(node, func) {
      node.DEFMETHOD("has_side_effects", func);
    });
    function aborts(thing) {
      return thing && thing.aborts();
    }
    ;
    (function(def) {
      def(AST_Statement, return_null);
      def(AST_Jump, return_this);
      function block_aborts() {
        var n = this.body.length;
        return n > 0 && aborts(this.body[n - 1]);
      }
      ;
      def(AST_BlockStatement, block_aborts);
      def(AST_SwitchBranch, block_aborts);
      def(AST_If, function() {
        return this.alternative && aborts(this.body) && aborts(this.alternative) && this;
      });
    })(function(node, func) {
      node.DEFMETHOD("aborts", func);
    });
    OPT(AST_Directive, function(self, compressor) {
      if (compressor.has_directive(self.value) !== self) {
        return make_node(AST_EmptyStatement, self);
      }
      return self;
    });
    OPT(AST_Debugger, function(self, compressor) {
      if (compressor.option("drop_debugger"))
        return make_node(AST_EmptyStatement, self);
      return self;
    });
    OPT(AST_LabeledStatement, function(self, compressor) {
      if (self.body instanceof AST_Break && compressor.loopcontrol_target(self.body.label) === self.body) {
        return make_node(AST_EmptyStatement, self);
      }
      return self.label.references.length == 0 ? self.body : self;
    });
    OPT(AST_Block, function(self, compressor) {
      self.body = tighten_body(self.body, compressor);
      return self;
    });
    OPT(AST_BlockStatement, function(self, compressor) {
      self.body = tighten_body(self.body, compressor);
      switch (self.body.length) {
        case 1:
          return self.body[0];
        case 0:
          return make_node(AST_EmptyStatement, self);
      }
      return self;
    });
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
      var self = this;
      if (compressor.has_directive("use asm"))
        return self;
      var toplevel = compressor.option("toplevel");
      if (compressor.option("unused") && (!(self instanceof AST_Toplevel) || toplevel) && !self.uses_eval && !self.uses_with) {
        var assign_as_unused = !/keep_assign/.test(compressor.option("unused"));
        var drop_funcs = /funcs/.test(toplevel);
        var drop_vars = /vars/.test(toplevel);
        if (!(self instanceof AST_Toplevel) || toplevel == true) {
          drop_funcs = drop_vars = true;
        }
        var in_use = [];
        var in_use_ids = Object.create(null);
        if (self instanceof AST_Toplevel && compressor.top_retain) {
          self.variables.each(function(def) {
            if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
              in_use_ids[def.id] = true;
              in_use.push(def);
            }
          });
        }
        var initializations = new Dictionary();
        var scope = this;
        var tw = new TreeWalker(function(node, descend) {
          if (node !== self) {
            if (node instanceof AST_Defun) {
              if (!drop_funcs && scope === self) {
                var node_def = node.name.definition();
                if (!(node_def.id in in_use_ids)) {
                  in_use_ids[node_def.id] = true;
                  in_use.push(node_def);
                }
              }
              initializations.add(node.name.name, node);
              return true;
            }
            if (node instanceof AST_Definitions && scope === self) {
              node.definitions.forEach(function(def) {
                if (!drop_vars) {
                  var node_def = def.name.definition();
                  if (!(node_def.id in in_use_ids)) {
                    in_use_ids[node_def.id] = true;
                    in_use.push(node_def);
                  }
                }
                if (def.value) {
                  initializations.add(def.name.name, def.value);
                  if (def.value.has_side_effects(compressor)) {
                    def.value.walk(tw);
                  }
                }
              });
              return true;
            }
            if (assign_as_unused && node instanceof AST_Assign && node.operator == "=" && node.left instanceof AST_SymbolRef && scope === self) {
              node.right.walk(tw);
              return true;
            }
            if (node instanceof AST_SymbolRef) {
              var node_def = node.definition();
              if (!(node_def.id in in_use_ids)) {
                in_use_ids[node_def.id] = true;
                in_use.push(node_def);
              }
              return true;
            }
            if (node instanceof AST_Scope) {
              var save_scope = scope;
              scope = node;
              descend();
              scope = save_scope;
              return true;
            }
          }
        });
        self.walk(tw);
        for (var i = 0; i < in_use.length; ++i) {
          in_use[i].orig.forEach(function(decl) {
            var init = initializations.get(decl.name);
            if (init)
              init.forEach(function(init) {
                var tw = new TreeWalker(function(node) {
                  if (node instanceof AST_SymbolRef) {
                    var node_def = node.definition();
                    if (!(node_def.id in in_use_ids)) {
                      in_use_ids[node_def.id] = true;
                      in_use.push(node_def);
                    }
                  }
                });
                init.walk(tw);
              });
          });
        }
        var tt = new TreeTransformer(function before(node, descend, in_list) {
          if (node instanceof AST_Function && node.name && !compressor.option("keep_fnames")) {
            var def = node.name.definition();
            if (!(def.id in in_use_ids) || def.orig.length > 1)
              node.name = null;
          }
          if (node instanceof AST_Lambda && !(node instanceof AST_Accessor)) {
            var trim = !compressor.option("keep_fargs");
            for (var a = node.argnames,
                i = a.length; --i >= 0; ) {
              var sym = a[i];
              if (!(sym.definition().id in in_use_ids)) {
                sym.__unused = true;
                if (trim) {
                  a.pop();
                  compressor[sym.unreferenced() ? "warn" : "info"]("Dropping unused function argument {name} [{file}:{line},{col}]", {
                    name: sym.name,
                    file: sym.start.file,
                    line: sym.start.line,
                    col: sym.start.col
                  });
                }
              } else {
                trim = false;
              }
            }
          }
          if (drop_funcs && node instanceof AST_Defun && node !== self) {
            if (!(node.name.definition().id in in_use_ids)) {
              compressor[node.name.unreferenced() ? "warn" : "info"]("Dropping unused function {name} [{file}:{line},{col}]", {
                name: node.name.name,
                file: node.name.start.file,
                line: node.name.start.line,
                col: node.name.start.col
              });
              return make_node(AST_EmptyStatement, node);
            }
            return node;
          }
          if (drop_vars && node instanceof AST_Definitions && !(tt.parent() instanceof AST_ForIn)) {
            var def = node.definitions.filter(function(def) {
              if (def.value)
                def.value = def.value.transform(tt);
              var sym = def.name.definition();
              if (sym.id in in_use_ids)
                return true;
              if (sym.orig[0] instanceof AST_SymbolCatch) {
                def.value = def.value && def.value.drop_side_effect_free(compressor);
                return true;
              }
              var w = {
                name: def.name.name,
                file: def.name.start.file,
                line: def.name.start.line,
                col: def.name.start.col
              };
              if (def.value && (def._unused_side_effects = def.value.drop_side_effect_free(compressor))) {
                compressor.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]", w);
                return true;
              }
              compressor[def.name.unreferenced() ? "warn" : "info"]("Dropping unused variable {name} [{file}:{line},{col}]", w);
              return false;
            });
            def = mergeSort(def, function(a, b) {
              if (!a.value && b.value)
                return -1;
              if (!b.value && a.value)
                return 1;
              return 0;
            });
            var side_effects = [];
            for (var i = 0; i < def.length; ) {
              var x = def[i];
              if (x._unused_side_effects) {
                side_effects.push(x._unused_side_effects);
                def.splice(i, 1);
              } else {
                if (side_effects.length > 0) {
                  side_effects.push(x.value);
                  x.value = AST_Seq.from_array(side_effects);
                  side_effects = [];
                }
                ++i;
              }
            }
            if (side_effects.length > 0) {
              side_effects = make_node(AST_BlockStatement, node, {body: [make_node(AST_SimpleStatement, node, {body: AST_Seq.from_array(side_effects)})]});
            } else {
              side_effects = null;
            }
            if (def.length == 0 && !side_effects) {
              return make_node(AST_EmptyStatement, node);
            }
            if (def.length == 0) {
              return in_list ? MAP.splice(side_effects.body) : side_effects;
            }
            node.definitions = def;
            if (side_effects) {
              side_effects.body.unshift(node);
              return in_list ? MAP.splice(side_effects.body) : side_effects;
            }
            return node;
          }
          if (drop_vars && assign_as_unused && node instanceof AST_Assign && node.operator == "=" && node.left instanceof AST_SymbolRef) {
            var def = node.left.definition();
            if (!(def.id in in_use_ids) && self.variables.get(def.name) === def) {
              return maintain_this_binding(tt.parent(), node, node.right.transform(tt));
            }
          }
          if (node instanceof AST_For) {
            descend(node, this);
            if (node.init instanceof AST_BlockStatement) {
              var body = node.init.body.slice(0, -1);
              node.init = node.init.body.slice(-1)[0].body;
              body.push(node);
              return in_list ? MAP.splice(body) : make_node(AST_BlockStatement, node, {body: body});
            } else if (is_empty(node.init)) {
              node.init = null;
              return node;
            }
          }
          if (node instanceof AST_Scope && node !== self)
            return node;
        });
        self.transform(tt);
      }
    });
    AST_Scope.DEFMETHOD("hoist_declarations", function(compressor) {
      var self = this;
      if (compressor.has_directive("use asm"))
        return self;
      var hoist_funs = compressor.option("hoist_funs");
      var hoist_vars = compressor.option("hoist_vars");
      if (hoist_funs || hoist_vars) {
        var dirs = [];
        var hoisted = [];
        var vars = new Dictionary(),
            vars_found = 0,
            var_decl = 0;
        self.walk(new TreeWalker(function(node) {
          if (node instanceof AST_Scope && node !== self)
            return true;
          if (node instanceof AST_Var) {
            ++var_decl;
            return true;
          }
        }));
        hoist_vars = hoist_vars && var_decl > 1;
        var tt = new TreeTransformer(function before(node) {
          if (node !== self) {
            if (node instanceof AST_Directive) {
              dirs.push(node);
              return make_node(AST_EmptyStatement, node);
            }
            if (node instanceof AST_Defun && hoist_funs) {
              hoisted.push(node);
              return make_node(AST_EmptyStatement, node);
            }
            if (node instanceof AST_Var && hoist_vars) {
              node.definitions.forEach(function(def) {
                vars.set(def.name.name, def);
                ++vars_found;
              });
              var seq = node.to_assignments(compressor);
              var p = tt.parent();
              if (p instanceof AST_ForIn && p.init === node) {
                if (seq == null) {
                  var def = node.definitions[0].name;
                  return make_node(AST_SymbolRef, def, def);
                }
                return seq;
              }
              if (p instanceof AST_For && p.init === node) {
                return seq;
              }
              if (!seq)
                return make_node(AST_EmptyStatement, node);
              return make_node(AST_SimpleStatement, node, {body: seq});
            }
            if (node instanceof AST_Scope)
              return node;
          }
        });
        self = self.transform(tt);
        if (vars_found > 0) {
          var defs = [];
          vars.each(function(def, name) {
            if (self instanceof AST_Lambda && find_if(function(x) {
              return x.name == def.name.name;
            }, self.argnames)) {
              vars.del(name);
            } else {
              def = def.clone();
              def.value = null;
              defs.push(def);
              vars.set(name, def);
            }
          });
          if (defs.length > 0) {
            for (var i = 0; i < self.body.length; ) {
              if (self.body[i] instanceof AST_SimpleStatement) {
                var expr = self.body[i].body,
                    sym,
                    assign;
                if (expr instanceof AST_Assign && expr.operator == "=" && (sym = expr.left) instanceof AST_Symbol && vars.has(sym.name)) {
                  var def = vars.get(sym.name);
                  if (def.value)
                    break;
                  def.value = expr.right;
                  remove(defs, def);
                  defs.push(def);
                  self.body.splice(i, 1);
                  continue;
                }
                if (expr instanceof AST_Seq && (assign = expr.car) instanceof AST_Assign && assign.operator == "=" && (sym = assign.left) instanceof AST_Symbol && vars.has(sym.name)) {
                  var def = vars.get(sym.name);
                  if (def.value)
                    break;
                  def.value = assign.right;
                  remove(defs, def);
                  defs.push(def);
                  self.body[i].body = expr.cdr;
                  continue;
                }
              }
              if (self.body[i] instanceof AST_EmptyStatement) {
                self.body.splice(i, 1);
                continue;
              }
              if (self.body[i] instanceof AST_BlockStatement) {
                var tmp = [i, 1].concat(self.body[i].body);
                self.body.splice.apply(self.body, tmp);
                continue;
              }
              break;
            }
            defs = make_node(AST_Var, self, {definitions: defs});
            hoisted.push(defs);
          }
          ;
        }
        self.body = dirs.concat(hoisted, self.body);
      }
      return self;
    });
    (function(def) {
      function trim(nodes, compressor, first_in_statement) {
        var ret = [],
            changed = false;
        for (var i = 0,
            len = nodes.length; i < len; i++) {
          var node = nodes[i].drop_side_effect_free(compressor, first_in_statement);
          changed |= node !== nodes[i];
          if (node) {
            ret.push(node);
            first_in_statement = false;
          }
        }
        return changed ? ret.length ? ret : null : nodes;
      }
      def(AST_Node, return_this);
      def(AST_Constant, return_null);
      def(AST_This, return_null);
      def(AST_Call, function(compressor, first_in_statement) {
        if (!this.has_pure_annotation(compressor) && compressor.pure_funcs(this)) {
          if (this.expression instanceof AST_Function && (!this.expression.name || !this.expression.name.definition().references.length)) {
            var node = this.clone();
            node.expression = node.expression.process_expression(false, compressor);
            return node;
          }
          return this;
        }
        if (this.pure) {
          compressor.warn("Dropping __PURE__ call [{file}:{line},{col}]", this.start);
          this.pure.value = this.pure.value.replace(/[@#]__PURE__/g, ' ');
        }
        var args = trim(this.args, compressor, first_in_statement);
        return args && AST_Seq.from_array(args);
      });
      def(AST_Function, return_null);
      def(AST_Binary, function(compressor, first_in_statement) {
        var right = this.right.drop_side_effect_free(compressor);
        if (!right)
          return this.left.drop_side_effect_free(compressor, first_in_statement);
        switch (this.operator) {
          case "&&":
          case "||":
            if (right === this.right)
              return this;
            var node = this.clone();
            node.right = right;
            return node;
          default:
            var left = this.left.drop_side_effect_free(compressor, first_in_statement);
            if (!left)
              return this.right.drop_side_effect_free(compressor, first_in_statement);
            return make_node(AST_Seq, this, {
              car: left,
              cdr: right
            });
        }
      });
      def(AST_Assign, return_this);
      def(AST_Conditional, function(compressor) {
        var consequent = this.consequent.drop_side_effect_free(compressor);
        var alternative = this.alternative.drop_side_effect_free(compressor);
        if (consequent === this.consequent && alternative === this.alternative)
          return this;
        if (!consequent)
          return alternative ? make_node(AST_Binary, this, {
            operator: "||",
            left: this.condition,
            right: alternative
          }) : this.condition.drop_side_effect_free(compressor);
        if (!alternative)
          return make_node(AST_Binary, this, {
            operator: "&&",
            left: this.condition,
            right: consequent
          });
        var node = this.clone();
        node.consequent = consequent;
        node.alternative = alternative;
        return node;
      });
      def(AST_Unary, function(compressor, first_in_statement) {
        if (unary_side_effects(this.operator))
          return this;
        if (this.operator == "typeof" && this.expression instanceof AST_SymbolRef)
          return null;
        var expression = this.expression.drop_side_effect_free(compressor, first_in_statement);
        if (first_in_statement && this instanceof AST_UnaryPrefix && is_iife_call(expression)) {
          if (expression === this.expression && this.operator.length === 1)
            return this;
          return make_node(AST_UnaryPrefix, this, {
            operator: this.operator.length === 1 ? this.operator : "!",
            expression: expression
          });
        }
        return expression;
      });
      def(AST_SymbolRef, function() {
        return this.undeclared() ? this : null;
      });
      def(AST_Object, function(compressor, first_in_statement) {
        var values = trim(this.properties, compressor, first_in_statement);
        return values && AST_Seq.from_array(values);
      });
      def(AST_ObjectProperty, function(compressor, first_in_statement) {
        return this.value.drop_side_effect_free(compressor, first_in_statement);
      });
      def(AST_Array, function(compressor, first_in_statement) {
        var values = trim(this.elements, compressor, first_in_statement);
        return values && AST_Seq.from_array(values);
      });
      def(AST_Dot, function(compressor, first_in_statement) {
        if (!compressor.option("pure_getters"))
          return this;
        return this.expression.drop_side_effect_free(compressor, first_in_statement);
      });
      def(AST_Sub, function(compressor, first_in_statement) {
        if (!compressor.option("pure_getters"))
          return this;
        var expression = this.expression.drop_side_effect_free(compressor, first_in_statement);
        if (!expression)
          return this.property.drop_side_effect_free(compressor, first_in_statement);
        var property = this.property.drop_side_effect_free(compressor);
        if (!property)
          return expression;
        return make_node(AST_Seq, this, {
          car: expression,
          cdr: property
        });
      });
      def(AST_Seq, function(compressor) {
        var cdr = this.cdr.drop_side_effect_free(compressor);
        if (cdr === this.cdr)
          return this;
        if (!cdr)
          return this.car;
        return make_node(AST_Seq, this, {
          car: this.car,
          cdr: cdr
        });
      });
    })(function(node, func) {
      node.DEFMETHOD("drop_side_effect_free", func);
    });
    OPT(AST_SimpleStatement, function(self, compressor) {
      if (compressor.option("side_effects")) {
        var body = self.body;
        var node = body.drop_side_effect_free(compressor, true);
        if (!node) {
          compressor.warn("Dropping side-effect-free statement [{file}:{line},{col}]", self.start);
          return make_node(AST_EmptyStatement, self);
        }
        if (node !== body) {
          return make_node(AST_SimpleStatement, self, {body: node});
        }
      }
      return self;
    });
    OPT(AST_DWLoop, function(self, compressor) {
      if (!compressor.option("loops"))
        return self;
      var cond = self.condition.evaluate(compressor);
      if (cond !== self.condition) {
        if (cond) {
          return make_node(AST_For, self, {body: self.body});
        } else if (compressor.option("dead_code") && self instanceof AST_While) {
          var a = [];
          extract_declarations_from_unreachable_code(compressor, self.body, a);
          return make_node(AST_BlockStatement, self, {body: a});
        } else {
          cond = make_node_from_constant(cond, self.condition).transform(compressor);
          self.condition = best_of_expression(cond, self.condition);
        }
      }
      if (self instanceof AST_While) {
        return make_node(AST_For, self, self).optimize(compressor);
      }
      return self;
    });
    function if_break_in_loop(self, compressor) {
      function drop_it(rest) {
        rest = as_statement_array(rest);
        if (self.body instanceof AST_BlockStatement) {
          self.body = self.body.clone();
          self.body.body = rest.concat(self.body.body.slice(1));
          self.body = self.body.transform(compressor);
        } else {
          self.body = make_node(AST_BlockStatement, self.body, {body: rest}).transform(compressor);
        }
        if_break_in_loop(self, compressor);
      }
      var first = self.body instanceof AST_BlockStatement ? self.body.body[0] : self.body;
      if (first instanceof AST_If) {
        if (first.body instanceof AST_Break && compressor.loopcontrol_target(first.body.label) === compressor.self()) {
          if (self.condition) {
            self.condition = make_node(AST_Binary, self.condition, {
              left: self.condition,
              operator: "&&",
              right: first.condition.negate(compressor)
            });
          } else {
            self.condition = first.condition.negate(compressor);
          }
          drop_it(first.alternative);
        } else if (first.alternative instanceof AST_Break && compressor.loopcontrol_target(first.alternative.label) === compressor.self()) {
          if (self.condition) {
            self.condition = make_node(AST_Binary, self.condition, {
              left: self.condition,
              operator: "&&",
              right: first.condition
            });
          } else {
            self.condition = first.condition;
          }
          drop_it(first.body);
        }
      }
    }
    ;
    OPT(AST_For, function(self, compressor) {
      if (!compressor.option("loops"))
        return self;
      if (self.condition) {
        var cond = self.condition.evaluate(compressor);
        if (compressor.option("dead_code") && !cond) {
          var a = [];
          if (self.init instanceof AST_Statement) {
            a.push(self.init);
          } else if (self.init) {
            a.push(make_node(AST_SimpleStatement, self.init, {body: self.init}));
          }
          extract_declarations_from_unreachable_code(compressor, self.body, a);
          return make_node(AST_BlockStatement, self, {body: a});
        }
        if (cond !== self.condition) {
          cond = make_node_from_constant(cond, self.condition).transform(compressor);
          self.condition = best_of_expression(cond, self.condition);
        }
      }
      if_break_in_loop(self, compressor);
      return self;
    });
    OPT(AST_If, function(self, compressor) {
      if (is_empty(self.alternative))
        self.alternative = null;
      if (!compressor.option("conditionals"))
        return self;
      var cond = self.condition.evaluate(compressor);
      if (cond !== self.condition) {
        if (cond) {
          compressor.warn("Condition always true [{file}:{line},{col}]", self.condition.start);
          if (compressor.option("dead_code")) {
            var a = [];
            if (self.alternative) {
              extract_declarations_from_unreachable_code(compressor, self.alternative, a);
            }
            a.push(self.body);
            return make_node(AST_BlockStatement, self, {body: a}).optimize(compressor);
          }
        } else {
          compressor.warn("Condition always false [{file}:{line},{col}]", self.condition.start);
          if (compressor.option("dead_code")) {
            var a = [];
            extract_declarations_from_unreachable_code(compressor, self.body, a);
            if (self.alternative)
              a.push(self.alternative);
            return make_node(AST_BlockStatement, self, {body: a}).optimize(compressor);
          }
        }
        cond = make_node_from_constant(cond, self.condition).transform(compressor);
        self.condition = best_of_expression(cond, self.condition);
      }
      var negated = self.condition.negate(compressor);
      var self_condition_length = self.condition.print_to_string().length;
      var negated_length = negated.print_to_string().length;
      var negated_is_best = negated_length < self_condition_length;
      if (self.alternative && negated_is_best) {
        negated_is_best = false;
        self.condition = negated;
        var tmp = self.body;
        self.body = self.alternative || make_node(AST_EmptyStatement, self);
        self.alternative = tmp;
      }
      if (is_empty(self.body) && is_empty(self.alternative)) {
        return make_node(AST_SimpleStatement, self.condition, {body: self.condition.clone()}).optimize(compressor);
      }
      if (self.body instanceof AST_SimpleStatement && self.alternative instanceof AST_SimpleStatement) {
        return make_node(AST_SimpleStatement, self, {body: make_node(AST_Conditional, self, {
            condition: self.condition,
            consequent: self.body.body,
            alternative: self.alternative.body
          })}).optimize(compressor);
      }
      if (is_empty(self.alternative) && self.body instanceof AST_SimpleStatement) {
        if (self_condition_length === negated_length && !negated_is_best && self.condition instanceof AST_Binary && self.condition.operator == "||") {
          negated_is_best = true;
        }
        if (negated_is_best)
          return make_node(AST_SimpleStatement, self, {body: make_node(AST_Binary, self, {
              operator: "||",
              left: negated,
              right: self.body.body
            })}).optimize(compressor);
        return make_node(AST_SimpleStatement, self, {body: make_node(AST_Binary, self, {
            operator: "&&",
            left: self.condition,
            right: self.body.body
          })}).optimize(compressor);
      }
      if (self.body instanceof AST_EmptyStatement && self.alternative instanceof AST_SimpleStatement) {
        return make_node(AST_SimpleStatement, self, {body: make_node(AST_Binary, self, {
            operator: "||",
            left: self.condition,
            right: self.alternative.body
          })}).optimize(compressor);
      }
      if (self.body instanceof AST_Exit && self.alternative instanceof AST_Exit && self.body.TYPE == self.alternative.TYPE) {
        return make_node(self.body.CTOR, self, {value: make_node(AST_Conditional, self, {
            condition: self.condition,
            consequent: self.body.value || make_node(AST_Undefined, self.body),
            alternative: self.alternative.value || make_node(AST_Undefined, self.alternative)
          }).transform(compressor)}).optimize(compressor);
      }
      if (self.body instanceof AST_If && !self.body.alternative && !self.alternative) {
        self = make_node(AST_If, self, {
          condition: make_node(AST_Binary, self.condition, {
            operator: "&&",
            left: self.condition,
            right: self.body.condition
          }),
          body: self.body.body,
          alternative: null
        });
      }
      if (aborts(self.body)) {
        if (self.alternative) {
          var alt = self.alternative;
          self.alternative = null;
          return make_node(AST_BlockStatement, self, {body: [self, alt]}).optimize(compressor);
        }
      }
      if (aborts(self.alternative)) {
        var body = self.body;
        self.body = self.alternative;
        self.condition = negated_is_best ? negated : self.condition.negate(compressor);
        self.alternative = null;
        return make_node(AST_BlockStatement, self, {body: [self, body]}).optimize(compressor);
      }
      return self;
    });
    OPT(AST_Switch, function(self, compressor) {
      if (!compressor.option("switches"))
        return self;
      var branch;
      var value = self.expression.evaluate(compressor);
      if (value !== self.expression) {
        var expression = make_node_from_constant(value, self.expression).transform(compressor);
        self.expression = best_of_expression(expression, self.expression);
      }
      if (!compressor.option("dead_code"))
        return self;
      var decl = [];
      var body = [];
      var default_branch;
      var exact_match;
      for (var i = 0,
          len = self.body.length; i < len && !exact_match; i++) {
        branch = self.body[i];
        if (branch instanceof AST_Default) {
          if (!default_branch) {
            default_branch = branch;
          } else {
            eliminate_branch(branch, body[body.length - 1]);
          }
        } else if (value !== self.expression) {
          var exp = branch.expression.evaluate(compressor);
          if (exp === value) {
            exact_match = branch;
            if (default_branch) {
              var default_index = body.indexOf(default_branch);
              body.splice(default_index, 1);
              eliminate_branch(default_branch, body[default_index - 1]);
              default_branch = null;
            }
          } else if (exp !== branch.expression) {
            eliminate_branch(branch, body[body.length - 1]);
            continue;
          }
        }
        if (aborts(branch)) {
          var prev = body[body.length - 1];
          if (aborts(prev) && prev.body.length == branch.body.length && make_node(AST_BlockStatement, prev, prev).equivalent_to(make_node(AST_BlockStatement, branch, branch))) {
            prev.body = [];
          }
        }
        body.push(branch);
      }
      while (i < len)
        eliminate_branch(self.body[i++], body[body.length - 1]);
      if (body.length > 0) {
        body[0].body = decl.concat(body[0].body);
      }
      self.body = body;
      while (branch = body[body.length - 1]) {
        var stat = branch.body[branch.body.length - 1];
        if (stat instanceof AST_Break && compressor.loopcontrol_target(stat.label) === self)
          branch.body.pop();
        if (branch.body.length || branch instanceof AST_Case && (default_branch || branch.expression.has_side_effects(compressor)))
          break;
        if (body.pop() === default_branch)
          default_branch = null;
      }
      if (body.length == 0) {
        return make_node(AST_BlockStatement, self, {body: decl.concat(make_node(AST_SimpleStatement, self.expression, {body: self.expression}))}).optimize(compressor);
      }
      if (body.length == 1 && (body[0] === exact_match || body[0] === default_branch)) {
        var has_break = false;
        var tw = new TreeWalker(function(node) {
          if (has_break || node instanceof AST_Lambda || node instanceof AST_SimpleStatement)
            return true;
          if (node instanceof AST_Break && tw.loopcontrol_target(node.label) === self)
            has_break = true;
        });
        self.walk(tw);
        if (!has_break) {
          body = body[0].body.slice();
          body.unshift(make_node(AST_SimpleStatement, self.expression, {body: self.expression}));
          return make_node(AST_BlockStatement, self, {body: body}).optimize(compressor);
        }
      }
      return self;
      function eliminate_branch(branch, prev) {
        if (prev && !aborts(prev)) {
          prev.body = prev.body.concat(branch.body);
        } else {
          extract_declarations_from_unreachable_code(compressor, branch, decl);
        }
      }
    });
    OPT(AST_Try, function(self, compressor) {
      self.body = tighten_body(self.body, compressor);
      if (self.bcatch && self.bfinally && all(self.bfinally.body, is_empty))
        self.bfinally = null;
      if (all(self.body, is_empty)) {
        var body = [];
        if (self.bcatch)
          extract_declarations_from_unreachable_code(compressor, self.bcatch, body);
        if (self.bfinally)
          body = body.concat(self.bfinally.body);
        return body.length > 0 ? make_node(AST_BlockStatement, self, {body: body}).optimize(compressor) : make_node(AST_EmptyStatement, self);
      }
      return self;
    });
    AST_Definitions.DEFMETHOD("remove_initializers", function() {
      this.definitions.forEach(function(def) {
        def.value = null;
      });
    });
    AST_Definitions.DEFMETHOD("to_assignments", function(compressor) {
      var reduce_vars = compressor.option("reduce_vars");
      var assignments = this.definitions.reduce(function(a, def) {
        if (def.value) {
          var name = make_node(AST_SymbolRef, def.name, def.name);
          a.push(make_node(AST_Assign, def, {
            operator: "=",
            left: name,
            right: def.value
          }));
          if (reduce_vars)
            name.definition().fixed = false;
        }
        return a;
      }, []);
      if (assignments.length == 0)
        return null;
      return AST_Seq.from_array(assignments);
    });
    OPT(AST_Definitions, function(self, compressor) {
      if (self.definitions.length == 0)
        return make_node(AST_EmptyStatement, self);
      return self;
    });
    OPT(AST_Call, function(self, compressor) {
      var exp = self.expression;
      if (compressor.option("reduce_vars") && exp instanceof AST_SymbolRef) {
        var def = exp.definition();
        if (def.fixed instanceof AST_Defun) {
          def.fixed = make_node(AST_Function, def.fixed, def.fixed).clone(true);
        }
        if (def.fixed instanceof AST_Function) {
          exp = def.fixed;
          if (compressor.option("unused") && def.references.length == 1 && !(def.scope.uses_arguments && def.orig[0] instanceof AST_SymbolFunarg) && !def.scope.uses_eval && compressor.find_parent(AST_Scope) === def.scope) {
            self.expression = exp;
          }
        }
      }
      if (compressor.option("unused") && exp instanceof AST_Function && !exp.uses_arguments && !exp.uses_eval) {
        var pos = 0,
            last = 0;
        for (var i = 0,
            len = self.args.length; i < len; i++) {
          var trim = i >= exp.argnames.length;
          if (trim || exp.argnames[i].__unused) {
            var node = self.args[i].drop_side_effect_free(compressor);
            if (node) {
              self.args[pos++] = node;
            } else if (!trim) {
              self.args[pos++] = make_node(AST_Number, self.args[i], {value: 0});
              continue;
            }
          } else {
            self.args[pos++] = self.args[i];
          }
          last = pos;
        }
        self.args.length = last;
      }
      if (compressor.option("unsafe")) {
        if (exp instanceof AST_SymbolRef && exp.undeclared()) {
          switch (exp.name) {
            case "Array":
              if (self.args.length != 1) {
                return make_node(AST_Array, self, {elements: self.args}).optimize(compressor);
              }
              break;
            case "Object":
              if (self.args.length == 0) {
                return make_node(AST_Object, self, {properties: []});
              }
              break;
            case "String":
              if (self.args.length == 0)
                return make_node(AST_String, self, {value: ""});
              if (self.args.length <= 1)
                return make_node(AST_Binary, self, {
                  left: self.args[0],
                  operator: "+",
                  right: make_node(AST_String, self, {value: ""})
                }).optimize(compressor);
              break;
            case "Number":
              if (self.args.length == 0)
                return make_node(AST_Number, self, {value: 0});
              if (self.args.length == 1)
                return make_node(AST_UnaryPrefix, self, {
                  expression: self.args[0],
                  operator: "+"
                }).optimize(compressor);
            case "Boolean":
              if (self.args.length == 0)
                return make_node(AST_False, self);
              if (self.args.length == 1)
                return make_node(AST_UnaryPrefix, self, {
                  expression: make_node(AST_UnaryPrefix, self, {
                    expression: self.args[0],
                    operator: "!"
                  }),
                  operator: "!"
                }).optimize(compressor);
              break;
            case "Function":
              if (self.args.length == 0)
                return make_node(AST_Function, self, {
                  argnames: [],
                  body: []
                });
              if (all(self.args, function(x) {
                return x instanceof AST_String;
              })) {
                try {
                  var code = "(function(" + self.args.slice(0, -1).map(function(arg) {
                    return arg.value;
                  }).join(",") + "){" + self.args[self.args.length - 1].value + "})()";
                  var ast = parse(code);
                  ast.figure_out_scope({screw_ie8: compressor.option("screw_ie8")});
                  var comp = new Compressor(compressor.options);
                  ast = ast.transform(comp);
                  ast.figure_out_scope({screw_ie8: compressor.option("screw_ie8")});
                  ast.mangle_names();
                  var fun;
                  try {
                    ast.walk(new TreeWalker(function(node) {
                      if (node instanceof AST_Lambda) {
                        fun = node;
                        throw ast;
                      }
                    }));
                  } catch (ex) {
                    if (ex !== ast)
                      throw ex;
                  }
                  ;
                  if (!fun)
                    return self;
                  var args = fun.argnames.map(function(arg, i) {
                    return make_node(AST_String, self.args[i], {value: arg.print_to_string()});
                  });
                  var code = OutputStream();
                  AST_BlockStatement.prototype._codegen.call(fun, fun, code);
                  code = code.toString().replace(/^\{|\}$/g, "");
                  args.push(make_node(AST_String, self.args[self.args.length - 1], {value: code}));
                  self.args = args;
                  return self;
                } catch (ex) {
                  if (ex instanceof JS_Parse_Error) {
                    compressor.warn("Error parsing code passed to new Function [{file}:{line},{col}]", self.args[self.args.length - 1].start);
                    compressor.warn(ex.toString());
                  } else {
                    console.log(ex);
                    throw ex;
                  }
                }
              }
              break;
          }
        } else if (exp instanceof AST_Dot && exp.property == "toString" && self.args.length == 0) {
          return make_node(AST_Binary, self, {
            left: make_node(AST_String, self, {value: ""}),
            operator: "+",
            right: exp.expression
          }).optimize(compressor);
        } else if (exp instanceof AST_Dot && exp.expression instanceof AST_Array && exp.property == "join")
          EXIT: {
            var separator;
            if (self.args.length > 0) {
              separator = self.args[0].evaluate(compressor);
              if (separator === self.args[0])
                break EXIT;
            }
            var elements = [];
            var consts = [];
            exp.expression.elements.forEach(function(el) {
              var value = el.evaluate(compressor);
              if (value !== el) {
                consts.push(value);
              } else {
                if (consts.length > 0) {
                  elements.push(make_node(AST_String, self, {value: consts.join(separator)}));
                  consts.length = 0;
                }
                elements.push(el);
              }
            });
            if (consts.length > 0) {
              elements.push(make_node(AST_String, self, {value: consts.join(separator)}));
            }
            if (elements.length == 0)
              return make_node(AST_String, self, {value: ""});
            if (elements.length == 1) {
              if (elements[0].is_string(compressor)) {
                return elements[0];
              }
              return make_node(AST_Binary, elements[0], {
                operator: "+",
                left: make_node(AST_String, self, {value: ""}),
                right: elements[0]
              });
            }
            if (separator == "") {
              var first;
              if (elements[0].is_string(compressor) || elements[1].is_string(compressor)) {
                first = elements.shift();
              } else {
                first = make_node(AST_String, self, {value: ""});
              }
              return elements.reduce(function(prev, el) {
                return make_node(AST_Binary, el, {
                  operator: "+",
                  left: prev,
                  right: el
                });
              }, first).optimize(compressor);
            }
            var node = self.clone();
            node.expression = node.expression.clone();
            node.expression.expression = node.expression.expression.clone();
            node.expression.expression.elements = elements;
            return best_of(compressor, self, node);
          }
        else if (exp instanceof AST_Dot && exp.expression.is_string(compressor) && exp.property == "charAt") {
          var arg = self.args[0];
          var index = arg ? arg.evaluate(compressor) : 0;
          if (index !== arg) {
            return make_node(AST_Sub, exp, {
              expression: exp.expression,
              property: make_node_from_constant(index | 0, arg || exp)
            }).optimize(compressor);
          }
        }
      }
      if (exp instanceof AST_Function) {
        if (exp.body[0] instanceof AST_Return) {
          var value = exp.body[0].value;
          if (!value || value.is_constant()) {
            var args = self.args.concat(value || make_node(AST_Undefined, self));
            return AST_Seq.from_array(args).transform(compressor);
          }
        }
        if (compressor.option("side_effects") && all(exp.body, is_empty)) {
          var args = self.args.concat(make_node(AST_Undefined, self));
          return AST_Seq.from_array(args).transform(compressor);
        }
      }
      if (compressor.option("drop_console")) {
        if (exp instanceof AST_PropAccess) {
          var name = exp.expression;
          while (name.expression) {
            name = name.expression;
          }
          if (name instanceof AST_SymbolRef && name.name == "console" && name.undeclared()) {
            return make_node(AST_Undefined, self).optimize(compressor);
          }
        }
      }
      if (compressor.option("negate_iife") && compressor.parent() instanceof AST_SimpleStatement && is_iife_call(self)) {
        return self.negate(compressor, true);
      }
      return self;
    });
    OPT(AST_New, function(self, compressor) {
      if (compressor.option("unsafe")) {
        var exp = self.expression;
        if (exp instanceof AST_SymbolRef && exp.undeclared()) {
          switch (exp.name) {
            case "Object":
            case "RegExp":
            case "Function":
            case "Error":
            case "Array":
              return make_node(AST_Call, self, self).transform(compressor);
          }
        }
      }
      return self;
    });
    OPT(AST_Seq, function(self, compressor) {
      if (!compressor.option("side_effects"))
        return self;
      self.car = self.car.drop_side_effect_free(compressor, first_in_statement(compressor));
      if (!self.car)
        return maintain_this_binding(compressor.parent(), self, self.cdr);
      if (compressor.option("cascade")) {
        var left;
        if (self.car instanceof AST_Assign && !self.car.left.has_side_effects(compressor)) {
          left = self.car.left;
        } else if (self.car instanceof AST_Unary && (self.car.operator == "++" || self.car.operator == "--")) {
          left = self.car.expression;
        }
        if (left && !(left instanceof AST_SymbolRef && left.definition().orig[0] instanceof AST_SymbolLambda)) {
          var parent,
              field;
          var cdr = self.cdr;
          while (true) {
            if (cdr.equivalent_to(left)) {
              var car = self.car instanceof AST_UnaryPostfix ? make_node(AST_UnaryPrefix, self.car, {
                operator: self.car.operator,
                expression: left
              }) : self.car;
              if (parent) {
                parent[field] = car;
                return self.cdr;
              }
              return car;
            }
            if (cdr instanceof AST_Binary && !(cdr instanceof AST_Assign)) {
              if (cdr.left.is_constant()) {
                if (cdr.operator == "||" || cdr.operator == "&&")
                  break;
                field = "right";
              } else {
                field = "left";
              }
            } else if (cdr instanceof AST_Call || cdr instanceof AST_Unary && !unary_side_effects(cdr.operator)) {
              field = "expression";
            } else
              break;
            parent = cdr;
            cdr = cdr[field];
          }
        }
      }
      if (is_undefined(self.cdr, compressor)) {
        return make_node(AST_UnaryPrefix, self, {
          operator: "void",
          expression: self.car
        });
      }
      return self;
    });
    AST_Unary.DEFMETHOD("lift_sequences", function(compressor) {
      if (compressor.option("sequences")) {
        if (this.expression instanceof AST_Seq) {
          var seq = this.expression;
          var x = seq.to_array();
          this.expression = x.pop();
          x.push(this);
          seq = AST_Seq.from_array(x).transform(compressor);
          return seq;
        }
      }
      return this;
    });
    OPT(AST_UnaryPostfix, function(self, compressor) {
      return self.lift_sequences(compressor);
    });
    OPT(AST_UnaryPrefix, function(self, compressor) {
      var seq = self.lift_sequences(compressor);
      if (seq !== self) {
        return seq;
      }
      var e = self.expression;
      if (compressor.option("side_effects") && self.operator == "void") {
        e = e.drop_side_effect_free(compressor);
        if (e) {
          self.expression = e;
          return self;
        } else {
          return make_node(AST_Undefined, self).optimize(compressor);
        }
      }
      if (compressor.option("booleans") && compressor.in_boolean_context()) {
        switch (self.operator) {
          case "!":
            if (e instanceof AST_UnaryPrefix && e.operator == "!") {
              return e.expression;
            }
            if (e instanceof AST_Binary) {
              self = best_of(compressor, self, e.negate(compressor, first_in_statement(compressor)));
            }
            break;
          case "typeof":
            compressor.warn("Boolean expression always true [{file}:{line},{col}]", self.start);
            return (e instanceof AST_SymbolRef ? make_node(AST_True, self) : make_node(AST_Seq, self, {
              car: e,
              cdr: make_node(AST_True, self)
            })).optimize(compressor);
        }
      }
      if (self.operator == "-" && e instanceof AST_Infinity) {
        e = e.transform(compressor);
      }
      if (e instanceof AST_Binary && (self.operator == "+" || self.operator == "-") && (e.operator == "*" || e.operator == "/" || e.operator == "%")) {
        self.expression = e.left;
        e.left = self;
        return e.optimize(compressor);
      }
      if (self.operator != "-" || !(e instanceof AST_Number || e instanceof AST_Infinity)) {
        var ev = self.evaluate(compressor);
        if (ev !== self) {
          ev = make_node_from_constant(ev, self).optimize(compressor);
          return best_of(compressor, ev, self);
        }
      }
      return self;
    });
    AST_Binary.DEFMETHOD("lift_sequences", function(compressor) {
      if (compressor.option("sequences")) {
        if (this.left instanceof AST_Seq) {
          var seq = this.left;
          var x = seq.to_array();
          this.left = x.pop();
          x.push(this);
          return AST_Seq.from_array(x).optimize(compressor);
        }
        if (this.right instanceof AST_Seq && !this.left.has_side_effects(compressor)) {
          var assign = this.operator == "=" && this.left instanceof AST_SymbolRef;
          var root = this.right;
          var cursor,
              seq = root;
          while (assign || !seq.car.has_side_effects(compressor)) {
            cursor = seq;
            if (seq.cdr instanceof AST_Seq) {
              seq = seq.cdr;
            } else
              break;
          }
          if (cursor) {
            this.right = cursor.cdr;
            cursor.cdr = this;
            return root.optimize(compressor);
          }
        }
      }
      return this;
    });
    var commutativeOperators = makePredicate("== === != !== * & | ^");
    OPT(AST_Binary, function(self, compressor) {
      function reversible() {
        return self.left.is_constant() || self.right.is_constant() || !self.left.has_side_effects(compressor) && !self.right.has_side_effects(compressor);
      }
      function reverse(op) {
        if (reversible()) {
          if (op)
            self.operator = op;
          var tmp = self.left;
          self.left = self.right;
          self.right = tmp;
        }
      }
      if (commutativeOperators(self.operator)) {
        if (self.right.is_constant() && !self.left.is_constant()) {
          if (!(self.left instanceof AST_Binary && PRECEDENCE[self.left.operator] >= PRECEDENCE[self.operator])) {
            reverse();
          }
        }
      }
      self = self.lift_sequences(compressor);
      if (compressor.option("comparisons"))
        switch (self.operator) {
          case "===":
          case "!==":
            if ((self.left.is_string(compressor) && self.right.is_string(compressor)) || (self.left.is_number(compressor) && self.right.is_number(compressor)) || (self.left.is_boolean() && self.right.is_boolean())) {
              self.operator = self.operator.substr(0, 2);
            }
          case "==":
          case "!=":
            if (self.left instanceof AST_String && self.left.value == "undefined" && self.right instanceof AST_UnaryPrefix && self.right.operator == "typeof") {
              var expr = self.right.expression;
              if (expr instanceof AST_SymbolRef ? !expr.undeclared() : !(expr instanceof AST_PropAccess) || compressor.option("screw_ie8")) {
                self.right = expr;
                self.left = make_node(AST_Undefined, self.left).optimize(compressor);
                if (self.operator.length == 2)
                  self.operator += "=";
              }
            }
            break;
        }
      if (compressor.option("booleans") && self.operator == "+" && compressor.in_boolean_context()) {
        var ll = self.left.evaluate(compressor);
        var rr = self.right.evaluate(compressor);
        if (ll && typeof ll == "string") {
          compressor.warn("+ in boolean context always true [{file}:{line},{col}]", self.start);
          return make_node(AST_Seq, self, {
            car: self.right,
            cdr: make_node(AST_True, self)
          }).optimize(compressor);
        }
        if (rr && typeof rr == "string") {
          compressor.warn("+ in boolean context always true [{file}:{line},{col}]", self.start);
          return make_node(AST_Seq, self, {
            car: self.left,
            cdr: make_node(AST_True, self)
          }).optimize(compressor);
        }
      }
      if (compressor.option("comparisons") && self.is_boolean()) {
        if (!(compressor.parent() instanceof AST_Binary) || compressor.parent() instanceof AST_Assign) {
          var negated = make_node(AST_UnaryPrefix, self, {
            operator: "!",
            expression: self.negate(compressor, first_in_statement(compressor))
          });
          self = best_of(compressor, self, negated);
        }
        if (compressor.option("unsafe_comps")) {
          switch (self.operator) {
            case "<":
              reverse(">");
              break;
            case "<=":
              reverse(">=");
              break;
          }
        }
      }
      if (self.operator == "+") {
        if (self.right instanceof AST_String && self.right.getValue() == "" && self.left.is_string(compressor)) {
          return self.left;
        }
        if (self.left instanceof AST_String && self.left.getValue() == "" && self.right.is_string(compressor)) {
          return self.right;
        }
        if (self.left instanceof AST_Binary && self.left.operator == "+" && self.left.left instanceof AST_String && self.left.left.getValue() == "" && self.right.is_string(compressor)) {
          self.left = self.left.right;
          return self.transform(compressor);
        }
      }
      if (compressor.option("evaluate")) {
        switch (self.operator) {
          case "&&":
            var ll = self.left.evaluate(compressor);
            if (!ll) {
              compressor.warn("Condition left of && always false [{file}:{line},{col}]", self.start);
              return maintain_this_binding(compressor.parent(), self, self.left).optimize(compressor);
            } else if (ll !== self.left) {
              compressor.warn("Condition left of && always true [{file}:{line},{col}]", self.start);
              return maintain_this_binding(compressor.parent(), self, self.right).optimize(compressor);
            }
            if (compressor.option("booleans") && compressor.in_boolean_context()) {
              var rr = self.right.evaluate(compressor);
              if (!rr) {
                compressor.warn("Boolean && always false [{file}:{line},{col}]", self.start);
                return make_node(AST_Seq, self, {
                  car: self.left,
                  cdr: make_node(AST_False, self)
                }).optimize(compressor);
              } else if (rr !== self.right) {
                compressor.warn("Dropping side-effect-free && in boolean context [{file}:{line},{col}]", self.start);
                return self.left.optimize(compressor);
              }
            }
            break;
          case "||":
            var ll = self.left.evaluate(compressor);
            if (!ll) {
              compressor.warn("Condition left of || always false [{file}:{line},{col}]", self.start);
              return maintain_this_binding(compressor.parent(), self, self.right).optimize(compressor);
            } else if (ll !== self.left) {
              compressor.warn("Condition left of || always true [{file}:{line},{col}]", self.start);
              return maintain_this_binding(compressor.parent(), self, self.left).optimize(compressor);
            }
            if (compressor.option("booleans") && compressor.in_boolean_context()) {
              var rr = self.right.evaluate(compressor);
              if (!rr) {
                compressor.warn("Dropping side-effect-free || in boolean context [{file}:{line},{col}]", self.start);
                return self.left.optimize(compressor);
              } else if (rr !== self.right) {
                compressor.warn("Boolean || always true [{file}:{line},{col}]", self.start);
                return make_node(AST_Seq, self, {
                  car: self.left,
                  cdr: make_node(AST_True, self)
                }).optimize(compressor);
              }
            }
            break;
        }
        var associative = true;
        switch (self.operator) {
          case "+":
            if (self.left instanceof AST_Constant && self.right instanceof AST_Binary && self.right.operator == "+" && self.right.left instanceof AST_Constant && self.right.is_string(compressor)) {
              self = make_node(AST_Binary, self, {
                operator: "+",
                left: make_node(AST_String, self.left, {
                  value: "" + self.left.getValue() + self.right.left.getValue(),
                  start: self.left.start,
                  end: self.right.left.end
                }),
                right: self.right.right
              });
            }
            if (self.right instanceof AST_Constant && self.left instanceof AST_Binary && self.left.operator == "+" && self.left.right instanceof AST_Constant && self.left.is_string(compressor)) {
              self = make_node(AST_Binary, self, {
                operator: "+",
                left: self.left.left,
                right: make_node(AST_String, self.right, {
                  value: "" + self.left.right.getValue() + self.right.getValue(),
                  start: self.left.right.start,
                  end: self.right.end
                })
              });
            }
            if (self.left instanceof AST_Binary && self.left.operator == "+" && self.left.is_string(compressor) && self.left.right instanceof AST_Constant && self.right instanceof AST_Binary && self.right.operator == "+" && self.right.left instanceof AST_Constant && self.right.is_string(compressor)) {
              self = make_node(AST_Binary, self, {
                operator: "+",
                left: make_node(AST_Binary, self.left, {
                  operator: "+",
                  left: self.left.left,
                  right: make_node(AST_String, self.left.right, {
                    value: "" + self.left.right.getValue() + self.right.left.getValue(),
                    start: self.left.right.start,
                    end: self.right.left.end
                  })
                }),
                right: self.right.right
              });
            }
            if (self.right instanceof AST_UnaryPrefix && self.right.operator == "-" && self.left.is_number(compressor)) {
              self = make_node(AST_Binary, self, {
                operator: "-",
                left: self.left,
                right: self.right.expression
              });
              break;
            }
            if (self.left instanceof AST_UnaryPrefix && self.left.operator == "-" && reversible() && self.right.is_number(compressor)) {
              self = make_node(AST_Binary, self, {
                operator: "-",
                left: self.right,
                right: self.left.expression
              });
              break;
            }
          case "*":
            associative = compressor.option("unsafe_math");
          case "&":
          case "|":
          case "^":
            if (self.left.is_number(compressor) && self.right.is_number(compressor) && reversible() && !(self.left instanceof AST_Binary && self.left.operator != self.operator && PRECEDENCE[self.left.operator] >= PRECEDENCE[self.operator])) {
              var reversed = make_node(AST_Binary, self, {
                operator: self.operator,
                left: self.right,
                right: self.left
              });
              if (self.right instanceof AST_Constant && !(self.left instanceof AST_Constant)) {
                self = best_of(compressor, reversed, self);
              } else {
                self = best_of(compressor, self, reversed);
              }
            }
            if (associative && self.is_number(compressor)) {
              if (self.right instanceof AST_Binary && self.right.operator == self.operator) {
                self = make_node(AST_Binary, self, {
                  operator: self.operator,
                  left: make_node(AST_Binary, self.left, {
                    operator: self.operator,
                    left: self.left,
                    right: self.right.left,
                    start: self.left.start,
                    end: self.right.left.end
                  }),
                  right: self.right.right
                });
              }
              if (self.right instanceof AST_Constant && self.left instanceof AST_Binary && self.left.operator == self.operator) {
                if (self.left.left instanceof AST_Constant) {
                  self = make_node(AST_Binary, self, {
                    operator: self.operator,
                    left: make_node(AST_Binary, self.left, {
                      operator: self.operator,
                      left: self.left.left,
                      right: self.right,
                      start: self.left.left.start,
                      end: self.right.end
                    }),
                    right: self.left.right
                  });
                } else if (self.left.right instanceof AST_Constant) {
                  self = make_node(AST_Binary, self, {
                    operator: self.operator,
                    left: make_node(AST_Binary, self.left, {
                      operator: self.operator,
                      left: self.left.right,
                      right: self.right,
                      start: self.left.right.start,
                      end: self.right.end
                    }),
                    right: self.left.left
                  });
                }
              }
              if (self.left instanceof AST_Binary && self.left.operator == self.operator && self.left.right instanceof AST_Constant && self.right instanceof AST_Binary && self.right.operator == self.operator && self.right.left instanceof AST_Constant) {
                self = make_node(AST_Binary, self, {
                  operator: self.operator,
                  left: make_node(AST_Binary, self.left, {
                    operator: self.operator,
                    left: make_node(AST_Binary, self.left.left, {
                      operator: self.operator,
                      left: self.left.right,
                      right: self.right.left,
                      start: self.left.right.start,
                      end: self.right.left.end
                    }),
                    right: self.left.left
                  }),
                  right: self.right.right
                });
              }
            }
        }
      }
      if (self.right instanceof AST_Binary && self.right.operator == self.operator && (self.operator == "&&" || self.operator == "||" || (self.operator == "+" && (self.right.left.is_string(compressor) || (self.left.is_string(compressor) && self.right.right.is_string(compressor)))))) {
        self.left = make_node(AST_Binary, self.left, {
          operator: self.operator,
          left: self.left,
          right: self.right.left
        });
        self.right = self.right.right;
        return self.transform(compressor);
      }
      var ev = self.evaluate(compressor);
      if (ev !== self) {
        ev = make_node_from_constant(ev, self).optimize(compressor);
        return best_of(compressor, ev, self);
      }
      return self;
    });
    OPT(AST_SymbolRef, function(self, compressor) {
      var def = self.resolve_defines(compressor);
      if (def) {
        return def;
      }
      if (compressor.option("screw_ie8") && self.undeclared() && !isLHS(self, compressor.parent()) && (!self.scope.uses_with || !compressor.find_parent(AST_With))) {
        switch (self.name) {
          case "undefined":
            return make_node(AST_Undefined, self).optimize(compressor);
          case "NaN":
            return make_node(AST_NaN, self).optimize(compressor);
          case "Infinity":
            return make_node(AST_Infinity, self).optimize(compressor);
        }
      }
      if (compressor.option("evaluate") && compressor.option("reduce_vars")) {
        var d = self.definition();
        if (d.fixed) {
          if (d.should_replace === undefined) {
            var init = d.fixed.evaluate(compressor);
            if (init !== d.fixed) {
              init = make_node_from_constant(init, d.fixed).optimize(compressor);
              init = best_of_expression(init, d.fixed);
              var value = init.print_to_string().length;
              var name = d.name.length;
              var freq = d.references.length;
              var overhead = d.global || !freq ? 0 : (name + 2 + value) / freq;
              d.should_replace = value <= name + overhead ? init : false;
            } else {
              d.should_replace = false;
            }
          }
          if (d.should_replace) {
            return d.should_replace.clone(true);
          }
        }
      }
      return self;
    });
    OPT(AST_Undefined, function(self, compressor) {
      if (compressor.option("unsafe")) {
        var undef = find_variable(compressor, "undefined");
        if (undef) {
          var ref = make_node(AST_SymbolRef, self, {
            name: "undefined",
            scope: undef.scope,
            thedef: undef
          });
          ref.is_undefined = true;
          return ref;
        }
      }
      return make_node(AST_UnaryPrefix, self, {
        operator: "void",
        expression: make_node(AST_Number, self, {value: 0})
      });
    });
    OPT(AST_Infinity, function(self, compressor) {
      var retain = compressor.option("keep_infinity") && !find_variable(compressor, "Infinity");
      return retain ? self : make_node(AST_Binary, self, {
        operator: "/",
        left: make_node(AST_Number, self, {value: 1}),
        right: make_node(AST_Number, self, {value: 0})
      });
    });
    OPT(AST_NaN, function(self, compressor) {
      return find_variable(compressor, "NaN") ? make_node(AST_Binary, self, {
        operator: "/",
        left: make_node(AST_Number, self, {value: 0}),
        right: make_node(AST_Number, self, {value: 0})
      }) : self;
    });
    var ASSIGN_OPS = ['+', '-', '/', '*', '%', '>>', '<<', '>>>', '|', '^', '&'];
    var ASSIGN_OPS_COMMUTATIVE = ['*', '|', '^', '&'];
    OPT(AST_Assign, function(self, compressor) {
      self = self.lift_sequences(compressor);
      if (self.operator == "=" && self.left instanceof AST_SymbolRef && self.right instanceof AST_Binary) {
        if (self.right.left instanceof AST_SymbolRef && self.right.left.name == self.left.name && member(self.right.operator, ASSIGN_OPS)) {
          self.operator = self.right.operator + "=";
          self.right = self.right.right;
        } else if (self.right.right instanceof AST_SymbolRef && self.right.right.name == self.left.name && member(self.right.operator, ASSIGN_OPS_COMMUTATIVE) && !self.right.left.has_side_effects(compressor)) {
          self.operator = self.right.operator + "=";
          self.right = self.right.left;
        }
      }
      return self;
    });
    OPT(AST_Conditional, function(self, compressor) {
      if (!compressor.option("conditionals"))
        return self;
      if (self.condition instanceof AST_Seq) {
        var car = self.condition.car;
        self.condition = self.condition.cdr;
        return AST_Seq.cons(car, self);
      }
      var cond = self.condition.evaluate(compressor);
      if (cond !== self.condition) {
        if (cond) {
          compressor.warn("Condition always true [{file}:{line},{col}]", self.start);
          return maintain_this_binding(compressor.parent(), self, self.consequent);
        } else {
          compressor.warn("Condition always false [{file}:{line},{col}]", self.start);
          return maintain_this_binding(compressor.parent(), self, self.alternative);
        }
      }
      var negated = cond.negate(compressor, first_in_statement(compressor));
      if (best_of(compressor, cond, negated) === negated) {
        self = make_node(AST_Conditional, self, {
          condition: negated,
          consequent: self.alternative,
          alternative: self.consequent
        });
      }
      var condition = self.condition;
      var consequent = self.consequent;
      var alternative = self.alternative;
      if (condition instanceof AST_SymbolRef && consequent instanceof AST_SymbolRef && condition.definition() === consequent.definition()) {
        return make_node(AST_Binary, self, {
          operator: "||",
          left: condition,
          right: alternative
        });
      }
      if (consequent instanceof AST_Assign && alternative instanceof AST_Assign && consequent.operator == alternative.operator && consequent.left.equivalent_to(alternative.left) && (!self.condition.has_side_effects(compressor) || consequent.operator == "=" && !consequent.left.has_side_effects(compressor))) {
        return make_node(AST_Assign, self, {
          operator: consequent.operator,
          left: consequent.left,
          right: make_node(AST_Conditional, self, {
            condition: self.condition,
            consequent: consequent.right,
            alternative: alternative.right
          })
        });
      }
      if (consequent instanceof AST_Call && alternative.TYPE === consequent.TYPE && consequent.args.length == 1 && alternative.args.length == 1 && consequent.expression.equivalent_to(alternative.expression) && !consequent.expression.has_side_effects(compressor)) {
        consequent.args[0] = make_node(AST_Conditional, self, {
          condition: self.condition,
          consequent: consequent.args[0],
          alternative: alternative.args[0]
        });
        return consequent;
      }
      if (consequent instanceof AST_Conditional && consequent.alternative.equivalent_to(alternative)) {
        return make_node(AST_Conditional, self, {
          condition: make_node(AST_Binary, self, {
            left: self.condition,
            operator: "&&",
            right: consequent.condition
          }),
          consequent: consequent.consequent,
          alternative: alternative
        });
      }
      if (consequent.equivalent_to(alternative)) {
        return make_node(AST_Seq, self, {
          car: self.condition,
          cdr: consequent
        }).optimize(compressor);
      }
      if (is_true(self.consequent)) {
        if (is_false(self.alternative)) {
          return booleanize(self.condition);
        }
        return make_node(AST_Binary, self, {
          operator: "||",
          left: booleanize(self.condition),
          right: self.alternative
        });
      }
      if (is_false(self.consequent)) {
        if (is_true(self.alternative)) {
          return booleanize(self.condition.negate(compressor));
        }
        return make_node(AST_Binary, self, {
          operator: "&&",
          left: booleanize(self.condition.negate(compressor)),
          right: self.alternative
        });
      }
      if (is_true(self.alternative)) {
        return make_node(AST_Binary, self, {
          operator: "||",
          left: booleanize(self.condition.negate(compressor)),
          right: self.consequent
        });
      }
      if (is_false(self.alternative)) {
        return make_node(AST_Binary, self, {
          operator: "&&",
          left: booleanize(self.condition),
          right: self.consequent
        });
      }
      return self;
      function booleanize(node) {
        if (node.is_boolean())
          return node;
        return make_node(AST_UnaryPrefix, node, {
          operator: "!",
          expression: node.negate(compressor)
        });
      }
      function is_true(node) {
        return node instanceof AST_True || (node instanceof AST_UnaryPrefix && node.operator == "!" && node.expression instanceof AST_Constant && !node.expression.value);
      }
      function is_false(node) {
        return node instanceof AST_False || (node instanceof AST_UnaryPrefix && node.operator == "!" && node.expression instanceof AST_Constant && !!node.expression.value);
      }
    });
    OPT(AST_Boolean, function(self, compressor) {
      if (compressor.option("booleans")) {
        var p = compressor.parent();
        if (p instanceof AST_Binary && (p.operator == "==" || p.operator == "!=")) {
          compressor.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]", {
            operator: p.operator,
            value: self.value,
            file: p.start.file,
            line: p.start.line,
            col: p.start.col
          });
          return make_node(AST_Number, self, {value: +self.value});
        }
        return make_node(AST_UnaryPrefix, self, {
          operator: "!",
          expression: make_node(AST_Number, self, {value: 1 - self.value})
        });
      }
      return self;
    });
    OPT(AST_Sub, function(self, compressor) {
      var prop = self.property;
      if (prop instanceof AST_String && compressor.option("properties")) {
        prop = prop.getValue();
        if (RESERVED_WORDS(prop) ? compressor.option("screw_ie8") : is_identifier_string(prop)) {
          return make_node(AST_Dot, self, {
            expression: self.expression,
            property: prop
          }).optimize(compressor);
        }
        var v = parseFloat(prop);
        if (!isNaN(v) && v.toString() == prop) {
          self.property = make_node(AST_Number, self.property, {value: v});
        }
      }
      var ev = self.evaluate(compressor);
      if (ev !== self) {
        ev = make_node_from_constant(ev, self).optimize(compressor);
        return best_of(compressor, ev, self);
      }
      return self;
    });
    OPT(AST_Dot, function(self, compressor) {
      var def = self.resolve_defines(compressor);
      if (def) {
        return def;
      }
      var prop = self.property;
      if (RESERVED_WORDS(prop) && !compressor.option("screw_ie8")) {
        return make_node(AST_Sub, self, {
          expression: self.expression,
          property: make_node(AST_String, self, {value: prop})
        }).optimize(compressor);
      }
      if (compressor.option("unsafe_proto") && self.expression instanceof AST_Dot && self.expression.property == "prototype") {
        var exp = self.expression.expression;
        if (exp instanceof AST_SymbolRef && exp.undeclared())
          switch (exp.name) {
            case "Array":
              self.expression = make_node(AST_Array, self.expression, {elements: []});
              break;
            case "Object":
              self.expression = make_node(AST_Object, self.expression, {properties: []});
              break;
            case "String":
              self.expression = make_node(AST_String, self.expression, {value: ""});
              break;
          }
      }
      var ev = self.evaluate(compressor);
      if (ev !== self) {
        ev = make_node_from_constant(ev, self).optimize(compressor);
        return best_of(compressor, ev, self);
      }
      return self;
    });
    function literals_in_boolean_context(self, compressor) {
      if (compressor.option("booleans") && compressor.in_boolean_context()) {
        return best_of(compressor, self, make_node(AST_Seq, self, {
          car: self,
          cdr: make_node(AST_True, self)
        }).optimize(compressor));
      }
      return self;
    }
    ;
    OPT(AST_Array, literals_in_boolean_context);
    OPT(AST_Object, literals_in_boolean_context);
    OPT(AST_RegExp, literals_in_boolean_context);
    OPT(AST_Return, function(self, compressor) {
      if (self.value && is_undefined(self.value, compressor)) {
        self.value = null;
      }
      return self;
    });
    OPT(AST_VarDef, function(self, compressor) {
      var defines = compressor.option("global_defs");
      if (defines && HOP(defines, self.name.name)) {
        compressor.warn('global_defs ' + self.name.name + ' redefined [{file}:{line},{col}]', self.start);
      }
      return self;
    });
  })();
})(require('process'));
