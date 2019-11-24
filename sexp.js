var SExp = function () {
  var Token = {
    LEFT: 0,
    RIGHT: 1,
    SYMBOL: function (str) {
      this.value = str;
      this.isContiguous = true;
      this.isSymbol = true;
      this.toString = function () { return this.value; };
      return this;
    }
  };

  function tokenize(str) {
    var tokens = [];
    var s;
    for (s in str) {
      var cur = str[s]
      if (cur == "(") {
        tokens.push(Token.LEFT);
        continue;
      }
      if (cur == ")") {
        tokens.push(Token.RIGHT);
        continue;
      }
      if (tokens.length > 0) {
        if (cur == " " || cur == "\n" || cur == "\t") {
          if (tokens[tokens.length - 1].isSymbol) {
            tokens[tokens.length - 1].isContiguous = false;
          }
          continue;
        }
        if (tokens[tokens.length - 1].isContiguous) {
          tokens[tokens.length - 1].value += cur;
          continue;
        }
      }
      tokens.push(new Token.SYMBOL(cur));
    }
    return tokens;
  }

  function parse(tokens) {
    if (tokens.length < 1) return null;

    if (tokens[0].isSymbol) {
      if (tokens.length > 1) {
        return null;
      }
      return tokens[0].value;
    }

    if (tokens[0] === Token.LEFT) {
      var i = 1;
      var expr = [];

      while (true) {
        if (i >= tokens.length) return null;

        if (tokens[i].isSymbol) {
          expr.push(tokens[i].value);
          i++;
          continue;
        }

        if (tokens[i] === Token.RIGHT) {
          break;
        }

        if (tokens[i] === Token.LEFT) {
          var numLeft = 1;
          var end = i + 1;
          while (numLeft > 0) {
            if (tokens[end] === Token.LEFT) {
              numLeft++;
            }
            if (tokens[end] === Token.RIGHT) {
              numLeft--;
            }
            end++;
          }
          expr.push(parse(tokens.slice(i, end)));
          i = end;
        }
      }

      if (i == (tokens.length - 1)) {
        return expr;
      }
      return null;
    }
  }

  return {
    parse: function (str) {
      return parse(tokenize(str));
    }
  };
}();
