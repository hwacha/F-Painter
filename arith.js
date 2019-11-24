function app(variable) {
  return function (ident, value) {
    if (variable == ident) {
      return value;
    }
    return app(variable);
  };
}

function eval(sexp) {
  if (sexp == null) return null;
  if (typeof sexp == "string") {
    var i = parseInt(sexp);
    
    if (i || i === 0) {
      return i;
    }

    var f = parseFloat(sexp);

    if (f || f === 0.0) {
      return f;
    }
    if (sexp == "pi") {
      return Math.PI;
    }
    if (sexp == "e") {
      return Math.E;
    }
    return app(sexp);
  }
  if (Array.isArray(sexp)) {
    // empty expression
    if (sexp.length == 0) {
      return {};
    }
    // zero argument operations
    if (sexp.length == 1) {
      return null;
    }
    // one argument operations
    if (sexp.length == 2) {
      function wrap(op, arg) {
        if (typeof arg == "number") {
          return op(arg);
        }
        function apply(arg) {
          return function (ident, value) {
            var v = arg(ident, value);
            if (typeof v == "number") {
              return op(v);
            }
            return apply(v);
          };
        }
        return apply(arg);
      }
      if (sexp[0] === "abs") {
        return wrap(Math.abs, eval(sexp[1]));
      }
      if (sexp[0] === "fl") {
        return wrap(Math.floor, eval(sexp[1]));
      }

      if (sexp[0] === "sin") {
        return wrap(Math.sin, eval(sexp[1]));
      }
      if (sexp[0] === "cos") {
        return wrap(Math.cos, eval(sexp[1]));
      }
      if (sexp[0] === "tan") {
        return wrap(Math.tan, eval(sexp[1]));
      }
    }
    // two argument operations
    if (sexp.length == 3) {
      function wrap (op, a, b) {
        if (typeof a == "number" && typeof b == "number") {
          return op(a, b);
        }
        function apply(a, b) {
          return function (ident, value) {
            var one = a;
            var two = b;
            if (typeof one != "number") {
              one = one(ident, value);
            }
            if (typeof two != "number") {
              two = two(ident, value);
            }
            if (typeof one == "number" && typeof two == "number") {
              return op(one, two);
            }
            return apply(one, two);
          };
        }
        return apply(a, b);
      }
      if (sexp[1] === "+") {
        return wrap(function (a, b) {return a + b;},
                    eval(sexp[0]), eval(sexp[2]));
      }
      if (sexp[1] === "-") {
        return wrap(function (a, b) {return a - b;},
                    eval(sexp[0]), eval(sexp[2]));
      }
      if (sexp[1] === "*") {
        return wrap(function (a, b) {return a * b;},
                    eval(sexp[0]), eval(sexp[2]));
      }
      if (sexp[1] === "/") {
        return wrap(function (a, b) {return a / b;},
                    eval(sexp[0]), eval(sexp[2]));
      }
      if (sexp[1] === "^") {
        return wrap(Math.pow, eval(sexp[0]), eval(sexp[2]));
      }

      if (sexp[1] === "mod") {
        return wrap(function (a, b) {return a % b;},
                    eval(sexp[0]), eval(sexp[2]));
      }

      // two-place relations
      if (sexp[1] === "=") {
        return wrap(function (a, b) {
          if (a == b) { return 1 }
          else { return 0 }
        }, eval(sexp[0]), eval(sexp[2]));
      }

      if (sexp[1] === ">") {
        return wrap(function (a, b) {
          if (a > b) { return 1 }
          else { return 0 }
        }, eval(sexp[0]), eval(sexp[2]));
      }

      if (sexp[1] === "<") {
        return wrap(function (a, b) {
          if (a < b) { return 1 }
          else { return 0 }
        }, eval(sexp[0]), eval(sexp[2]));
      }
    }
    return null;
  }
}

function bind(expression, ident, value) {
  if (typeof expression == "number") {
    return expression;
  }
  return expression(ident, value);
}
